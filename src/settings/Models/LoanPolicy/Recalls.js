import { Period } from '../common';

class Recalls {
  constructor(recall = {}) {
    this.recallReturnInterval = new Period(recall.recallReturnInterval);
    this.minimumGuaranteedLoanPeriod = new Period(recall.minimumGuaranteedLoanPeriod);
  }
}

export default Recalls;
