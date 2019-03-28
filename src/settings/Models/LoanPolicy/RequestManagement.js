import { Period } from '../common';

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

export default class RequestManagement {
  constructor({ recalls, holds } = {}) {
    this.recalls = new Recalls(recalls);
    this.holds = new Holds(holds);
  }
}
