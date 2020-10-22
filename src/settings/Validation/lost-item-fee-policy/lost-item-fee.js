export default function (l) {
  return {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'itemAgedLostOverdue.duration': {
      rules: ['chargeAmountItemSystemSelected', 'hasPatronBilledAfterAgedToLostValue', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasInterval('itemAgedLostOverdue.intervalId') || l.hasValue('patronBilledAfterAgedLost.duration') || l.hasPassedValue('chargeAmountItemSystem', true) || l.hasValue('itemAgedLostOverdue.duration'),
    },
    'itemAgedLostOverdue.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('itemAgedLostOverdue.duration'),
    },
    'patronBilledAfterAgedLost.duration': {
      rules: ['hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasInterval('patronBilledAfterAgedLost.intervalId') || l.hasValue('patronBilledAfterAgedLost.duration'),
    },
    'patronBilledAfterAgedLost.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('patronBilledAfterAgedLost.duration'),
    },
    'chargeAmountItem.amount': {
      rules: ['hasPositiveItemsAgedToLostAfterOverdueAmount'],
      shouldValidate: l.hasPassedValue('chargeAmountItem.chargeType', 'anotherCost') && l.hasPositiveValue('itemAgedLostOverdue.duration'),
    },
    'lostItemProcessingFee': {
      rules: ['hasPositiveLostItemProcessingFeeValue', 'hasNoChargeLostItemProcessingFee'],
      shouldValidate: l.hasPassedValue('chargeAmountItemPatron', true) || l.hasPassedValue('chargeAmountItemSystem', true) || l.hasValue('lostItemProcessingFee') || l.hasPositiveValue('lostItemProcessingFee'),
    },
    'returnedLostItemProcessingFee': {
      rules: ['hasLostItemProcessingFeeValue'],
      shouldValidate: l.hasPassedValue('returnedLostItemProcessingFee', true),
    },
    'chargeAmountItemPatron': {
      rules: ['hasLostItemProcessingFeeValue'],
      shouldValidate: l.hasPassedValue('chargeAmountItemPatron', true),
    },
    'chargeAmountItemSystem': {
      rules: ['hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue', 'hasInvalidLostItemPolicyFee'],
      shouldValidate: (l.hasPassedValue('chargeAmountItemSystem', true) && !l.hasPositiveValue('lostItemProcessingFee') && !l.hasPositiveValue('itemAgedLostOverdue.duration')) || (l.hasPassedValue('chargeAmountItemSystem', true) && !l.hasPositiveValue('lostItemProcessingFee') && l.hasPositiveValue('itemAgedLostOverdue.duration')) /* || (l.hasPassedValue('chargeAmountItem.chargeType', 'anotherCost') && l.hasPositiveValue('itemAgedLostOverdue.duration'))*/,
    },
    'lostItemChargeFeeFine.duration': {
      rules: ['isNotEmptyLostItem', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.isRquiredLostItemCharge() || l.hasInterval('lostItemChargeFeeFine.intervalId')
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
      rules: ['hasReplacementAllowedAndPositiveLostItemPolicyFee', 'hasReplacementAllowedAndNegativeLostItemPolicyFee'],
      shouldValidate: l.hasPassedValue('replacedLostItemProcessingFee', true),
    },
    'feesFinesShallRefunded.duration': {
      rules: ['hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasInterval('feesFinesShallRefunded.intervalId') || l.hasValue('feesFinesShallRefunded.duration'),
    },
    'feesFinesShallRefunded.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('feesFinesShallRefunded.duration'),
    },
  };
}
