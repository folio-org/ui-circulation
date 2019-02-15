import {
  get,
  isNumber,
} from 'lodash';

import RenewalsPolicy from './RenewalsPolicy';
import RequestManagement from './RequestManagement';
import LoansPolicy from './LoansPolicy';
import { Metadata } from '../common';
import { defaultLoanPolicy } from './utils';
import {
  intervalIdsMap,
  loanProfileMap,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
} from '../../../constants';

export default class LoanPolicy {
  static defaultLoanPolicy() {
    return defaultLoanPolicy;
  }

  constructor(policy = {}) {
    this.id = policy.id;
    this.name = policy.name;
    this.description = policy.description;
    this.loanable = policy.loanable || false;
    this.renewable = policy.renewable || false;
    this.loansPolicy = new LoansPolicy(policy.loansPolicy);
    this.renewalsPolicy = new RenewalsPolicy(policy.renewalsPolicy);
    this.requestManagement = new RequestManagement(policy.requestManagement);
    this.metadata = new Metadata(policy.metadata);
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

    return this.isLoanable() && isProfileRolling && isShortTermPeriod;
  }

  isOpeningTimeOffsetActive() {
    const isShortTermMode = this.isShortTermLoan();
    const dueDateManagementId = get(this, 'loansPolicy.closedLibraryDueDateManagementId');

    return isShortTermMode && dueDateManagementId === BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS;
  }

  isLoanable() {
    return this.loanable;
  }

  isRenewable() {
    return this.renewable;
  }

  isDifferentPeriod() {
    return this.isRenewable() && this.renewalsPolicy.differentPeriod;
  }

  isUnlimitedRenewals() {
    return this.renewalsPolicy.unlimited;
  }

  isProfileFixed() {
    return this.isLoanable() && this.loansPolicy.profileId === loanProfileMap.FIXED;
  }

  isProfileRolling() {
    return this.isLoanable() && this.loansPolicy.profileId === loanProfileMap.ROLLING;
  }

  isNumberOfRenewalsAllowedActive() {
    return this.isRenewable() && !this.renewalsPolicy.unlimited;
  }

  isAlternateFixedDueDateScheduleIdRequired() {
    return this.isProfileFixed() && this.renewable && this.renewalsPolicy.differentPeriod;
  }

  isRenewalsPolicyPeriodRequired() {
    return this.isProfileRolling() && this.renewable && this.renewalsPolicy.differentPeriod;
  }

  shouldInitLoansPolicy() {
    const invalidState = !this.loansPolicy.defaultsSelected && !this.loansPolicy.additionalFieldsSelected;

    return !this.isLoanable() && invalidState;
  }

  shouldInitRenewalsPolicy() {
    const invalidState = !this.renewalsPolicy.defaultsSelected && !this.renewalsPolicy.additionalFieldsSelected;

    return !this.isRenewable() && invalidState;
  }

  shouldInitRequestManagement() {
    return !this.requestManagement.defaultsSelected && !this.requestManagement.additionalFieldsSelected;
  }
}
