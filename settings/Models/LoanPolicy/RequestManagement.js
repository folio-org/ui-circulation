import { Period } from '../common';

class Recalls {
  constructor(recall = {}) {
    this.recallReturnInterval = new Period(recall.recallReturnInterval);
    this.minLoanPeriod = new Period(recall.minLoanPeriod);
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
}
