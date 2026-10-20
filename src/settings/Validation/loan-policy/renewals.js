const renewals = (loanPolicy) => {
  return {
    'renewalsPolicy.alternateFixedDueDateScheduleId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isAlternateFixedDueDateScheduleIdRequired(),
    },
    'renewalsPolicy.period.duration': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isRenewalsPolicyPeriodRequired(),
    },
    'renewalsPolicy.period.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isRenewalsPolicyPeriodRequired(),
    },
    'renewalsPolicy.numberAllowed': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isLoanable() && loanPolicy.isNumberOfRenewalsAllowedActive(),
    },
    'renewalsPolicy.renewFromId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isRenewable() && loanPolicy.isProfileRolling(),
    },
    'renewalsPolicy.daysBefore': {
      rules: ['isNotEmpty', 'isIntegerBetween1And100'],
      shouldValidate: loanPolicy.isDaysBeforeSelected(),
    },
    'renewalsPolicy.automaticRenewalRetryPeriodInDays': {
      rules: ['isIntegerBetween0And100OrBlank'],
      shouldValidate: loanPolicy.isAutomaticRenewals(),
    },
  };
};

export default renewals;
