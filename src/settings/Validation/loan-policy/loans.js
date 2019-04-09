export default function (loanPolicy) {
  return {
    'loansPolicy.profileId': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'loansPolicy.closedLibraryDueDateManagementId': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'loansPolicy.period.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.isProfileRolling(),
    },
    'loansPolicy.period.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isProfileRolling(),
    },
    'loansPolicy.gracePeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.hasValue('loansPolicy.gracePeriod.duration')
    },
    'loansPolicy.fixedDueDateScheduleId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isProfileFixed(),
    },
    'loansPolicy.openingTimeOffset.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.isOpeningTimeOffsetActive(),
    },
    'loansPolicy.openingTimeOffset.intervalId': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isOpeningTimeOffsetActive(),
    },
  };
}
