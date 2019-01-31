import { Period } from '../common';
import {
  defaultLoanPolicy,
  helpers,
} from './utils';

class Recalls {
  constructor(recall = {}) {
    this.recallReturnInterval = new Period(recall.recallReturnInterval);
    this.minimumGuaranteedLoanPeriod = new Period(recall.minimumGuaranteedLoanPeriod);
  }
}

class Holds {
  constructor(hold = {}) {
    this.alternateCheckoutLoanPeriod = new Period(hold.alternateCheckoutLoanPeriod);
    this.renewItemsWithRequest = hold.renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(hold.alternateRenewalLoanPeriod);
  }
}

class Pages {
  constructor(page = {}) {
    this.alternateCheckoutLoanPeriod = new Period(page.alternateCheckoutLoanPeriod);
    this.renewItemsWithRequest = page.renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(page.alternateRenewalLoanPeriod);
  }
}

export default class RequestManagement {
  constructor({ recalls, holds, pages } = {}) {
    this.recalls = new Recalls(recalls);
    this.holds = new Holds(holds);
    this.pages = new Pages(pages);
  }

  get defaultsSelected() {
    return helpers.isDefaultsSelected(this, defaultLoanPolicy.requestManagement);
  }

  get additionalFieldsSelected() {
    return helpers.additionalFieldsSelected(this, defaultLoanPolicy.requestManagement);
  }
}
