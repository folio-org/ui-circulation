import { Period } from '../common';

class Holds {
  constructor(hold = {}) {
    this.alternateCheckoutLoanPeriod = new Period(hold.alternateCheckoutLoanPeriod);
    this.renewItemsWithRequest = hold.renewItemsWithRequest;
    this.alternateRenewalLoanPeriod = new Period(hold.alternateRenewalLoanPeriod);
  }
}

export default Holds;
