export default function (loanPolicy) {
  return {
    'renewalsPolicy.alternateFixedDueDateScheduleId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isAlternateFixedDueDateScheduleIdRequired(),
    },
    'renewalsPolicy.period.duration': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isRenewalsPolicyPeriodRequired(),
    },
    'renewalsPolicy.numberAllowed': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isNumberOfRenewalsAllowedActive(),
    },
    'renewalsPolicy.renewFromId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isRenewable() && loanPolicy.isProfileRolling(),
    },
  };
}
