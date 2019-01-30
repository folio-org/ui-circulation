import utils from './utils';
import defaultLoanPolicy from './defaults';
import { Period } from '../common';

export default class RenewalsPolicy {
  constructor(policy = {}) {
    this.unlimited = policy.unlimited || false;
    this.numberAllowed = policy.numberAllowed;
    this.period = new Period(policy.period);
    this.renewFromId = policy.renewFromId;
    this.differentPeriod = policy.differentPeriod || false;
    this.alternateFixedDueDateScheduleId = policy.alternateFixedDueDateScheduleId;
  }

  get defaultsSelected() {
    return utils.isDefaultsSelected(this, defaultLoanPolicy.renewalsPolicy);
  }

  get additionalFieldsSelected() {
    return /* !this.defaultsSelected && */ utils.additionalFieldsSelected(this, defaultLoanPolicy.renewalsPolicy);
  }
}
