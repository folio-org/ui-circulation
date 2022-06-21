import helpers from './utils';
import { Period } from '../common';
import {
  shortTermLoansOptions,
  longTermLoansOptions,
} from '../../../constants';

export default class LoansPolicy {
  constructor(policy = {}) {
    this.profileId = policy.profileId;
    this.closedLibraryDueDateManagementId = policy.closedLibraryDueDateManagementId;
    this.fixedDueDateScheduleId = policy.fixedDueDateScheduleId;
    this.period = new Period(policy.period);
    this.gracePeriod = new Period(policy.gracePeriod);
    this.openingTimeOffset = new Period(policy.openingTimeOffset);
  }

  // set correct closedLibraryDueDateManagementId
  setDueDateManagementId(isShortTermLoan) {
    const selectedId = this.closedLibraryDueDateManagementId;
    const isValidShortTermLoanValue = helpers.isValidItemSelected(shortTermLoansOptions, selectedId);
    const isValidLongTermLoanValue = helpers.isValidItemSelected(longTermLoansOptions, selectedId);

    if (isShortTermLoan && !isValidShortTermLoanValue) {
      this.closedLibraryDueDateManagementId = '';
    }

    if (!isShortTermLoan && !isValidLongTermLoanValue) {
      this.closedLibraryDueDateManagementId = '';
    }
  }
}
