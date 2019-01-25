import {
  get,
  isNumber,
  isEmpty,
} from 'lodash';

import {
  Metadata,
  Period,
} from './common';

import {
  intervalIdsMap,
  loanProfileMap,
  renewFromIds,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  END_OF_THE_NEXT_OPEN_DAY,
} from '../../constants';

class LoansPolicy {
  constructor(policy = {}) {
    this.profileId = policy.profileId;
    this.closedLibraryDueDateManagementId = policy.closedLibraryDueDateManagementId;
    this.fixedDueDateScheduleId = policy.fixedDueDateScheduleId;
    this.period = new Period(policy.period);
    this.gracePeriod = new Period(policy.gracePeriod);
    this.openingTimeOffset = new Period(policy.openingTimeOffset);
  }
}

class RenewalsPolicy {
  constructor(policy = {}) {
    this.unlimited = policy.unlimited;
    this.numberAllowed = policy.numberAllowed;
    this.period = new Period(policy.period);
    this.reniewFromId = policy.reniewFromId;
    this.differentPeriod = policy.differentPeriod;
    this.alternateFixedDueDateScheduleId = policy.alternateFixedDueDateScheduleId;
  }
}

class Recalls {
  constructor({
    recallReturnInterval,
    minLoanPeriod,
    alternateGracePeriod,
  } = {}) {
    this.recallReturnInterval = new Period(recallReturnInterval);
    this.minLoanPeriod = new Period(minLoanPeriod);
    this.alternateGracePeriod = new Period(alternateGracePeriod);
  }
}

class Holds {
  constructor({
    alternateCheckoutLoanPeriod,
    renewItemsWithRequest,
    alternateRenewalLoanPeriod,
  } = {}) {
    this.alternateCheckoutLoanPeriod = new Period(alternateCheckoutLoanPeriod);
    this.renewItemsWithRequest = renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(alternateRenewalLoanPeriod);
  }
}

class Pages {
  constructor({
    alternateCheckoutLoanPeriod,
    renewItemsWithRequest,
    alternateRenewalLoanPeriod,
  } = {}) {
    this.alternateCheckoutLoanPeriod = new Period(alternateCheckoutLoanPeriod);
    this.renewItemsWithRequest = renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(alternateRenewalLoanPeriod);
  }
}

class RequestManagement {
  constructor({
    recalls,
    holds,
    pages,
  } = {}) {
    this.recalls = new Recalls(recalls);
    this.holds = new Holds(holds);
    this.pages = new Pages(pages);
  }
}

export default class LoanPolicy {
  static defaultLoanPolicy() {
    return {
      loanable: true,
      loansPolicy: {
        profileId: loanProfileMap.ROLLING,
        closedLibraryDueDateManagementId: END_OF_THE_NEXT_OPEN_DAY,
        period: { intervalId: intervalIdsMap.DAYS },
        openingTimeOffset: { intervalId: intervalIdsMap.HOURS },
        gracePeriod: { intervalId: intervalIdsMap.HOURS }
      },
      renewable: true,
      renewalsPolicy: {
        unlimited: false,
        renewFromId: renewFromIds.SYSTEM_DATE,
        differentPeriod: false,
        period: { intervalId: intervalIdsMap.DAYS }
      },
      requestManagement: {
        recalls: {
          recallReturnInterval: { intervalId: intervalIdsMap.DAYS },
          minLoanPeriod: { intervalId: intervalIdsMap.DAYS },
        },
        holds: {
          alternateCheckoutLoanPeriod: { intervalId: intervalIdsMap.DAYS },
          alternateRenewalLoanPeriod: { intervalId: intervalIdsMap.DAYS },
        },
        pages: {
          alternateCheckoutLoanPeriod: { intervalId: intervalIdsMap.DAYS },
          alternateRenewalLoanPeriod: { intervalId: intervalIdsMap.DAYS },
        },
      },
    };
  }

  static isPeriodValid(period = {}) {
    return isNumber(period.duration) && !isEmpty(period.intervalId);
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.description = policy.description;
    this.loanable = policy.loanable || false;
    this.renewable = policy.renewable || false;
    this.loansPolicy = new LoansPolicy(policy.loansPolicy);
    this.renewalsPolicy = new RenewalsPolicy(policy.renewalsPolicy);
    this.metadata = new Metadata(policy.metadata);
    this.requestManagement = new RequestManagement(policy.requestManagement);
  }

  hasValue(pathToValue) {
    const value = get(this, pathToValue);

    return isNumber(value);
  }

  isShortTermLoan() {
    const profileId = get(this, 'loansPolicy.profileId');
    const intervalId = get(this, 'loansPolicy.period.intervalId');

    const isProfileRolling = profileId === loanProfileMap.ROLLING;
    const isShortTermPeriod = intervalId === intervalIdsMap.MINUTES || intervalId === intervalIdsMap.HOURS;

    return this.loanable && isProfileRolling && isShortTermPeriod;
  }

  isOpeningTimeOffsetActive() {
    const isShortTermMode = this.isShortTermLoan();
    const dueDateManagementId = get(this, 'loansPolicy.closedLibraryDueDateManagementId');
    return isShortTermMode && dueDateManagementId === BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS;
  }

  isProfileFixed() {
    return this.loanable && this.loansPolicy.profileId === loanProfileMap.FIXED;
  }

  isProfileRolling() {
    return this.loanable && this.loansPolicy.profileId === loanProfileMap.ROLLING;
  }

  isNumberOfRenewalsAllowedActive() {
    return this.renewable && !this.renewalsPolicy.unlimited;
  }

  isAlternateFixedDueDateScheduleIdRequired() {
    return this.isProfileFixed() && this.renewable && this.renewalsPolicy.differentPeriod;
  }

  isRenewalsPolicyPeriodRequired() {
    return this.isProfileRolling() && this.renewable && this.renewalsPolicy.differentPeriod;
  }
}
