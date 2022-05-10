export default function (finePolicy) {
  return {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'overdueFine.quantity': {
      rules: ['isFloatGreaterThanOrEqualToZero', 'hasOverdueFineInterval'],
      shouldValidate: finePolicy.isIntervalSelected('overdueFine.intervalId') || finePolicy.hasNonZeroValue('overdueFine.quantity'),
    },
    'overdueFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueFine(),
    },
    'overdueRecallFine.quantity': {
      rules: ['isFloatGreaterThanOrEqualToZero', 'hasOverdueRecallFineInterval'],
      shouldValidate: finePolicy.isIntervalSelected('overdueRecallFine.intervalId') || finePolicy.hasNonZeroValue('overdueRecallFine.quantity'),
    },
    'overdueRecallFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueRecallFine(),
    },
    'maxOverdueFine': {
      rules: ['isFloatGreaterThanOrEqualToZero', 'isGreaterThanOverdueFine', 'isMaximumOverdueFineValid'],
      shouldValidate: finePolicy.isOverdueFine() || finePolicy.hasNonZeroValue('maxOverdueFine'),
    },
    'maxOverdueRecallFine': {
      rules: ['isFloatGreaterThanOrEqualToZero', 'isGreaterThanOverdueRecallFine', 'isMaximumOverdueRecallFineValid'],
      shouldValidate: finePolicy.isOverdueRecallFine() || finePolicy.hasNonZeroValue('maxOverdueRecallFine'),
    },
  };
}
