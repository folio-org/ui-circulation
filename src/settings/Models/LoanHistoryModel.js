export default class LoanHistory {
  static defaultLoanHistory() {
    return {};
  }

  constructor(data = {}) {
    const {
      closingType,
      loan = {},
      feeFine = {},
      loanExceptions = [],
    } = data;

    this.closingType = closingType;
    this.loan = {
      duration: loan.duration,
      intervalId: loan.intervalId,
    };
    this.feeFine = {
      duration: feeFine.duration,
      intervalId: feeFine.intervalId,
    };
    this.loanExceptions = loanExceptions;
  }
}
