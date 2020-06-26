export default function (l) {
  return {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'itemAgedLostOverdue.duration': {
      rules: ['chargeAmountItemSystemSelected', 'hasPatronBilledAfterAgedToLostValue', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('patronBilledAfterAgedLost.duration') || l.hasPassedValue('chargeAmountItemSystem', 'true') || l.hasValue('itemAgedLostOverdue.duration'),
    },
    'itemAgedLostOverdue.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('itemAgedLostOverdue.duration'),
    },
    'patronBilledAfterAgedLost.duration': {
      rules: ['hasItemsAgedToLostAfterOverdueValue', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('itemAgedLostOverdue.duration') || l.hasValue('patronBilledAfterAgedLost.duration'),
    },
    'patronBilledAfterAgedLost.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('patronBilledAfterAgedLost.duration'),
    },
    'chargeAmountItem.amount': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('chargeAmountItem.amount'),
    },
    'lostItemProcessingFee': {
      rules: ['hasPositiveLostItemProcessingFeeValue'],
      shouldValidate: l.hasPassedValue('chargeAmountItemPatron', 'true') || l.hasPassedValue('chargeAmountItemSystem', 'true') || l.hasValue('lostItemProcessingFee'),
    },
    'returnedLostItemProcessingFee': {
      rules: ['hasLostItemProcessingFeeValue'],
      shouldValidate: l.hasPassedValue('returnedLostItemProcessingFee', 'true'),
    },
    'chargeAmountItemPatron': {
      rules: ['hasNoChargeLostItemProcessingFee'],
      shouldValidate: l.hasPositiveValue('lostItemProcessingFee'),
    },
    'chargeAmountItemSystem': {
      rules: ['hasNoChargeLostItemProcessingFee'],
      shouldValidate: l.hasPositiveValue('lostItemProcessingFee'),
    },
    'lostItemChargeFeeFine.duration': {
      rules: ['isNotEmptyLostItem', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.isRquiredLostItemCharge(),
    },
    'lostItemChargeFeeFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('lostItemChargeFeeFine.duration'),
    },
    'replacementProcessingFee': {
      rules: ['hasPositiveReplacementProcessingFee', 'isStringGreaterThanOrEqualToZero'],
      shouldValidate: l.hasPositiveValue('replacementProcessingFee') || l.hasValue('replacementProcessingFee'),
    },
    'replacedLostItemProcessingFee': {
      rules: ['hasReplacedLostItemProcessingFee'],
      shouldValidate: l.hasPassedValue('replacedLostItemProcessingFee', 'true'),
    },
    'feesFinesShallRefunded.duration': {
      rules: ['isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasValue('feesFinesShallRefunded.duration'),
    },
    'feesFinesShallRefunded.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('feesFinesShallRefunded.duration'),
    },
  };
}
