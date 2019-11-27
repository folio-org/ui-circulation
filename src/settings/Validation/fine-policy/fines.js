export default function (finePolicy) {
  return {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'overdueFine.quantity': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: finePolicy.hasValue('overdueFine.quantity'),
    },
    'overdueFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueFine(),
    },
    'overdueRecallFine.quantity': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: finePolicy.hasValue('overdueRecallFine.quantity'),
    },
    'overdueRecallFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: finePolicy.isOverdueRecallFine(),
    },
    'maxOverdueFine': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: finePolicy.isRequiredMaxValue(),
    },
    'maxOverdueRecallFine': {
      rules: ['isIntegerGreaterThanZero'],
      shouldValidate: finePolicy.isRequiredMaxRecallOverdueFine(),
    },
  };
}
