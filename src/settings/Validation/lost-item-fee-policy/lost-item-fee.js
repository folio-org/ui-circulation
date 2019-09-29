export default function (l) {
  return {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'itemAgedLostOverdue.duration': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('itemAgedLostOverdue.duration'),
    },
    'itemAgedLostOverdue.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasDuration('itemAgedLostOverdue.duration'),
    },
    'patronBilledAfterAgedLost.duration': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('patronBilledAfterAgedLost.duration'),
    },
    'patronBilledAfterAgedLost.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasDuration('patronBilledAfterAgedLost.duration'),
    },
    'chargeAmountItem.amount': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('chargeAmountItem.amount'),
    },
    'lostItemProcessingFee': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('lostItemProcessingFee'),
    },
    'lostItemChargeFeeFine.duration': {
      rules: ['isNotEmpty', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.isRquiredLostItemCharge(),
    },
    'lostItemChargeFeeFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasDuration('lostItemChargeFeeFine.duration'),
    },
    'replacementProcessingFee': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('replacementProcessingFee'),
    },
    'feesFinesShallRefunded.duration': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('feesFinesShallRefunded.duration'),
    },
    'feesFinesShallRefunded.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasDuration('feesFinesShallRefunded.duration'),
    },
  };
}
