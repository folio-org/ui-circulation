import {
  closedLoansRules,
  closingTypesMap,
} from '../../constants';

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
      treatEnabled = false,
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
    this.treatEnabled = treatEnabled;
  }

  isClosingTypeIntervalSelected(item) {
    return this.closingType[item] === closingTypesMap.INTERVAL;
  }

  isAnyClosingTypeSelected(item) {
    const isSelected = !this.closingType[item];

    if (item === closedLoansRules.DEFAULT) {
      return isSelected;
    }

    return this.treatEnabled && isSelected;
  }
}
