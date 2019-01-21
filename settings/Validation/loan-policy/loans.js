import checkPeriod from '../utils';

export default function (loanPolicy) {
  const gracePeriod = checkPeriod(loanPolicy, 'loansPolicy.gracePeriod');

  return {
    'loansPolicy.period.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanOne'],
      shouldValidate: loanPolicy.isProfileRolling(),
    },
    'loansPolicy.period.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isProfileRolling(),
    },
    'loansPolicy.gracePeriod.duration': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: gracePeriod.duration || gracePeriod.intervalId,
    },
    'loansPolicy.gracePeriod.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: gracePeriod.duration,
    },
    'loansPolicy.fixedDueDateScheduleId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isProfileFixed(),
    },
    'loansPolicy.openingTimeOffset.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanOne'],
      shouldValidate: loanPolicy.isOpeningTimeOffsetActive(),
    },
    'loansPolicy.openingTimeOffset.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: loanPolicy.isOpeningTimeOffsetActive(),
    },
  };
}
