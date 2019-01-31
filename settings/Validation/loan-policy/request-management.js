const recalls = (loanPolicy) => {
  return {
    'requestManagement.recalls.recallReturnInterval.duration': {
      rules: ['isPositiveNumber'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.recallReturnInterval.duration'),
    },
    'requestManagement.recalls.minLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.recalls.minLoanPeriod.duration'),
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

const pages = (loanPolicy) => {
  return {
    'requestManagement.pages.alternateCheckoutLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.pages.alternateCheckoutLoanPeriod.duration'),
    },
    'requestManagement.pages.alternateRenewalLoanPeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('requestManagement.pages.alternateRenewalLoanPeriod.duration'),
    },
  };
};

export default function (loanPolicy) {
  return {
    ...recalls(loanPolicy),
    ...holds(loanPolicy),
    ...pages(loanPolicy),
  };
}
