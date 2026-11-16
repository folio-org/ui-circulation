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
      userSpecific = {},
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
    this.userSpecific = {
      duration: userSpecific.duration,
      intervalId: userSpecific.intervalId,
    };
    this.loanExceptions = loanExceptions;
    this.treatEnabled = treatEnabled;
  }

  isClosingTypeIntervalSelected(item) {
    const isIntervalSelected = this.closingType[item] === closingTypesMap.INTERVAL;

    // The fee/fine settings are disabled and not saved unless "treat differently" is enabled
    if (item === closedLoansRules.WITH_FEES_FINES) {
      return this.treatEnabled && isIntervalSelected;
    }

    return isIntervalSelected;
  }

  isAnyClosingTypeSelected(item) {
    const isSelected = !this.closingType[item];

    if (item === closedLoansRules.DEFAULT) {
      return isSelected;
    }

    return this.treatEnabled && isSelected;
  }
}
