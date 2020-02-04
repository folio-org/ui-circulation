const recalls = (loanPolicy) => {
  return {
    'requestManagement.recalls.recallReturnInterval.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.recallReturnInterval.duration')
        || loanPolicy.isIntervalSelected('requestManagement.recalls.recallReturnInterval.intervalId'),
    },
    'requestManagement.recalls.recallReturnInterval.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.recallReturnInterval.duration'),
    },
    'requestManagement.recalls.minimumGuaranteedLoanPeriod.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.minimumGuaranteedLoanPeriod.duration')
        || loanPolicy.isIntervalSelected('requestManagement.recalls.minimumGuaranteedLoanPeriod.intervalId'),
    },
    'requestManagement.recalls.minimumGuaranteedLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.minimumGuaranteedLoanPeriod.duration'),
    },
  };
};

const holds = (loanPolicy) => {
  return {
    'requestManagement.holds.alternateCheckoutLoanPeriod.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.holds.alternateCheckoutLoanPeriod.duration')
        || loanPolicy.isIntervalSelected('requestManagement.holds.alternateCheckoutLoanPeriod.intervalId'),
    },
    'requestManagement.holds.alternateCheckoutLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.hasValue('requestManagement.holds.alternateCheckoutLoanPeriod.duration'),
    },
    'requestManagement.holds.alternateRenewalLoanPeriod.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.holds.alternateRenewalLoanPeriod.duration')
        || loanPolicy.isIntervalSelected('requestManagement.holds.alternateRenewalLoanPeriod.intervalId'),
    },
    'requestManagement.holds.alternateRenewalLoanPeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.hasValue('requestManagement.holds.alternateRenewalLoanPeriod.duration'),
    },
  };
};

export default function (loanPolicy) {
  return {
    ...recalls(loanPolicy),
    ...holds(loanPolicy),
  };
}
