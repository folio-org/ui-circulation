import buildPeriodValidationConfig from './utils';

export default function (loanPolicy) {
  return {
    'loansPolicy.profileId': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isLoanable(),
    },
    'loansPolicy.closedLibraryDueDateManagementId': {
      rules: ['isNotEmpty'],
      shouldValidate: loanPolicy.isLoanable(),
    },
    'loansPolicy.period.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
      shouldValidate: loanPolicy.isProfileRolling(),
    },
    'loansPolicy.period.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isProfileRolling(),
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
    'loansPolicy.itemLimit': {
      rules: ['isItemLimitIsInInterval'],
      shouldValidate: true,
    },
    ...buildPeriodValidationConfig(loanPolicy, 'loansPolicy.gracePeriod')
  };
}
