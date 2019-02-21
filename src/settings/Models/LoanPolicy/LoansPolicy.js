import { Period } from '../common';
import {
  defaultLoanPolicy,
  helpers,
} from './utils';
import {
  intervalIdsMap,
  shortTermLoansOptions,
  longTermLoansOptions,
  CURRENT_DUE_DATE_TIME,
  CURRENT_DUE_DATE,
} from '../../../constants';

export default class LoansPolicy {
  constructor(policy = {}) {
    this.profileId = policy.profileId;
    this.closedLibraryDueDateManagementId = policy.closedLibraryDueDateManagementId;
    this.fixedDueDateScheduleId = policy.fixedDueDateScheduleId;
    this.period = new Period(policy.period);
    this.gracePeriod = new Period(policy.gracePeriod || { intervalId: intervalIdsMap.HOURS });
    this.openingTimeOffset = new Period(policy.openingTimeOffset || { intervalId: intervalIdsMap.HOURS });
  }

  get defaultsSelected() {
    return helpers.isDefaultsSelected(this, defaultLoanPolicy.loansPolicy);
  }

  get additionalFieldsSelected() {
    return helpers.additionalFieldsSelected(this, defaultLoanPolicy.loansPolicy);
  }

  // set correct closedLibraryDueDateManagementId
  setDueDateManagementId(isShortTermLoan) {
    const selectedId = this.closedLibraryDueDateManagementId;
    const isValidShortTermLoanValue = helpers.isValidItemSelected(shortTermLoansOptions, selectedId);
    const isValidLongTermLoanValue = helpers.isValidItemSelected(longTermLoansOptions, selectedId);

    if (isShortTermLoan && !isValidShortTermLoanValue) {
      this.closedLibraryDueDateManagementId = CURRENT_DUE_DATE_TIME;
    }

    if (!isShortTermLoan && !isValidLongTermLoanValue) {
      this.closedLibraryDueDateManagementId = CURRENT_DUE_DATE;
    }
  }
}
