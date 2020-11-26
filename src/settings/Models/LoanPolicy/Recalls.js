import { Period } from '../common';

class Recalls {
  constructor(recall = {}) {
    this.recallReturnInterval = new Period(recall.recallReturnInterval);
    this.allowRecallsToExtendOverdueLoans = recall.allowRecallsToExtendOverdueLoans;
    this.minimumGuaranteedLoanPeriod = new Period(recall.minimumGuaranteedLoanPeriod);
    this.alternateRecallReturnInterval = new Period(recall.alternateRecallReturnInterval);
  }
}

export default Recalls;
