import { Period } from '../common';
import {
  defaultLoanPolicy,
  helpers,
} from './utils';
import {
  intervalIdsMap,
} from '../../../constants';

class Recalls {
  constructor(recall = {}) {
    this.recallReturnInterval = new Period(recall.recallReturnInterval || { intervalId: intervalIdsMap.DAYS });
    this.minimumGuaranteedLoanPeriod = new Period(recall.minimumGuaranteedLoanPeriod || { intervalId: intervalIdsMap.DAYS });
  }
}

class Holds {
  constructor(hold = {}) {
    this.alternateCheckoutLoanPeriod = new Period(hold.alternateCheckoutLoanPeriod || { intervalId: intervalIdsMap.DAYS });
    this.renewItemsWithRequest = hold.renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(hold.alternateRenewalLoanPeriod || { intervalId: intervalIdsMap.DAYS });
  }
}

export default class RequestManagement {
  constructor({ recalls, holds } = {}) {
    this.recalls = new Recalls(recalls);
    this.holds = new Holds(holds);
  }

  get defaultsSelected() {
    return helpers.isDefaultsSelected(this, defaultLoanPolicy.requestManagement);
  }

  get additionalFieldsSelected() {
    return helpers.additionalFieldsSelected(this, defaultLoanPolicy.requestManagement);
  }
}
