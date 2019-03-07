const recalls = (loanPolicy) => {
  return {
    'requestManagement.recalls.recallReturnInterval.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.recallReturnInterval.duration'),
    },
    'requestManagement.recalls.minimumGuaranteedLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.minimumGuaranteedLoanPeriod.duration'),
    },
  };
};

const holds = (loanPolicy) => {
  return {
    'requestManagement.holds.alternateCheckoutLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.holds.alternateCheckoutLoanPeriod.duration'),
    },
    'requestManagement.holds.alternateRenewalLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
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
