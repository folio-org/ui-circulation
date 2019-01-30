import { Period } from '../common';
import {
  defaultLoanPolicy,
  helpers,
} from './utils';

export default class LoansPolicy {
  constructor(policy = {}) {
    this.profileId = policy.profileId;
    this.closedLibraryDueDateManagementId = policy.closedLibraryDueDateManagementId;
    this.fixedDueDateScheduleId = policy.fixedDueDateScheduleId;
    this.period = new Period(policy.period);
    this.gracePeriod = new Period(policy.gracePeriod);
    this.openingTimeOffset = new Period(policy.openingTimeOffset);
  }

  get defaultsSelected() {
    return helpers.isDefaultsSelected(this, defaultLoanPolicy.loansPolicy);
  }

  get additionalFieldsSelected() {
    return helpers.additionalFieldsSelected(this, defaultLoanPolicy.loansPolicy);
  }
}
