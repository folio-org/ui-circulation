export default function (finePolicy) {
  return {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'overdueFine.quantity': {
      rules: ['hasOverdueFineInterval'],
      shouldValidate: finePolicy.isIntervalSelected('overdueFine.intervalId'),
    },
    'overdueFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueFine(),
    },
    'overdueRecallFine.quantity': {
      rules: ['hasOverdueRecallFineInterval'],
      shouldValidate: finePolicy.isIntervalSelected('overdueRecallFine.intervalId'),
    },
    'overdueRecallFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueRecallFine(),
    },
    'maxOverdueFine': {
      rules: ['isFloatGreaterThanOrEqualToZero', 'isGreaterThanOverdueFine', 'isMaximumOverdueFineValid'],
      shouldValidate: finePolicy.isOverdueFine() || finePolicy.hasValue('maxOverdueFine'),
    },
    'maxOverdueRecallFine': {
      rules: ['isFloatGreaterThanOrEqualToZero', 'isGreaterThanOverdueRecallFine', 'isMaximumOverdueRecallFineValid'],
      shouldValidate: finePolicy.isOverdueRecallFine() || finePolicy.hasValue('maxOverdueRecallFine'),
    },
  };
}
