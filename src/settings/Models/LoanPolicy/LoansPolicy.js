import { some } from 'lodash';
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
    if (isShortTermLoan && !this.isValidShortTermLoanValue(selectedId)) {
      this.closedLibraryDueDateManagementId = CURRENT_DUE_DATE_TIME;
    }

    if (!isShortTermLoan && !this.isValidLongTermLoanValue(selectedId)) {
      this.closedLibraryDueDateManagementId = CURRENT_DUE_DATE;
    }
  }

  isValidShortTermLoanValue(selectedId) {
    return this.isValidItemSelected(shortTermLoansOptions, selectedId);
  }

  isValidLongTermLoanValue(selectedId) {
    return this.isValidItemSelected(longTermLoansOptions, selectedId);
  }

  isValidItemSelected(options, selectedId) {
    return some(options, ({ id }) => id === selectedId);
  }
}
