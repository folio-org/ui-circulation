export default function (finePolicy) {
  return {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'overdueFine.quantity': {
      rules: ['hasFine', 'hasOverdueFineInterval'],
      shouldValidate: (!finePolicy.isOverdueFine() && !finePolicy.isOverdueRecallFine())
        || finePolicy.isIntervalSelected('overdueFine.intervalId'),
    },
    'overdueFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueFine(),
    },
    'overdueRecallFine.quantity': {
      rules: ['hasFine', 'hasOverdueRecallFineInterval'],
      shouldValidate: (!finePolicy.isOverdueFine() && !finePolicy.isOverdueRecallFine())
        || finePolicy.isIntervalSelected('overdueRecallFine.intervalId'),
    },
    'overdueRecallFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueRecallFine(),
    },
    'maxOverdueFine': {
      rules: ['isStringGreaterThanOrEqualToZero', 'isMaximumOverdueFineValid', 'isGreaterThanOverdueFine'],
      shouldValidate: finePolicy.hasValue('maxOverdueFine'), // finePolicy.isOverdueFine(),
    },
    'maxOverdueRecallFine': {
      rules: ['isStringGreaterThanOrEqualToZero', 'isMaximumOverdueRecallFineValid', 'isGreaterThanOverdueRecallFine'],
      shouldValidate: finePolicy.hasValue('maxOverdueRecallFine'), // finePolicy.isOverdueRecallFine(),
    },
  };
}
