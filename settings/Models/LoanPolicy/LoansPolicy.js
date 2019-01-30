import { Period } from '../common';
import { intervalIdsMap } from '../../../constants';
import {
  defaultLoanPolicy,
  helpers,
} from './utils';

export default class LoansPolicy {
  constructor(policy = {}) {
    this.profileId = policy.profileId;
    this.closedLibraryDueDateManagementId = policy.closedLibraryDueDateManagementId;
    this.fixedDueDateScheduleId = policy.fixedDueDateScheduleId;
    this.period = new Period(policy.period || { intervalId: intervalIdsMap.DAYS });
    this.gracePeriod = new Period(policy.gracePeriod || { intervalId: intervalIdsMap.HOURS });
    this.openingTimeOffset = new Period(policy.openingTimeOffset || { intervalId: intervalIdsMap.HOURS });
  }

  get defaultsSelected() {
    return helpers.isDefaultsSelected(this, defaultLoanPolicy.loansPolicy);
  }

  get additionalFieldsSelected() {
    return helpers.additionalFieldsSelected(this, defaultLoanPolicy.loansPolicy);
  }
}
