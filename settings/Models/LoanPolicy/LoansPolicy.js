import utils from './utils';
import defaultLoanPolicy from './defaults';
import { Period } from '../common';

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
    return utils.isDefaultsSelected(this, defaultLoanPolicy.loansPolicy);
  }

  get additionalFieldsSelected() {
    return /* !this.defaultsSelected && */ utils.additionalFieldsSelected(this, defaultLoanPolicy.loansPolicy);
  }
}
