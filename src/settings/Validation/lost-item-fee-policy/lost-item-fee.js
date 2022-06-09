/*
  Validation in ui-circulation is complex. Using the example of adding new fields (e.g., new <Period> components)
to the lost item fee policy form, adding new validation rules requires the following steps:
  1. In the model class (src/Models/LostItemFeePolicy), add the new fields to the constructor
  2. In src/settings/LostItemFeePolicy/utils/normalize.js, add the new fields to the 'periodsList' array
  3. In this file, set up your desired validation rules. The exported validation object's keys are the field
    names for which validation is (or can be) performed. The sub-object for each key has two key/value pairs:
      a. rules: this is an array of rules that the field should follow. Each rule name corresponds to a key in
        the validators object (src/Validation/engine/validators.js). Rules are checked in order, so the first
        rule in the array will be validated first, and so on.
      b. shouldValidate: the conditions under which field validation should be performed (e.g., a different form
        field has a value)
  4. If you are creating a new rule, add it to the validators.js file. Each rule object in validators provides
    a validation message for the user (e.g., 'Please provide a value') and a reference to a validation handler in
    src/Validation/engine/handlers.js.
  5. In the handlers.js file, create a new handler function with the same name as the 'validate' key in your validators
    rule object. E.g., if you have the following object in validators:
      hasPatronBilledAfterRecalledAgedToLostValue : {
         validate: hasPatronBilledAfterRecalledAgedToLostValue,
         message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasPatronBilledAfterRecalledAgedToLostValue" />
       },
    then you must have a function named hasPatronBilledAfterRecalledAgedToLostValue in the handlers file.

  If you follow all these steps, then your new validation rules should start working for the form. Piece of cake!
 */

import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

const lostItemFee = (l) => {
  return {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    'itemAgedLostOverdue.duration': {
      rules: ['chargeAmountItemSystemSelected', 'hasPatronBilledAfterAgedToLostValue', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasInterval('itemAgedLostOverdue.intervalId')
        || l.hasValue('patronBilledAfterAgedLost.duration')
        || l.hasValue('itemAgedLostOverdue.duration')
        || (l.hasPassedValue('chargeAmountItemSystem', true) && !l.hasValue('recalledItemAgedLostOverdue.duration')),
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

    // 'Recalled items aged to lost after overdue':
    // Duration field: If there is an interval selected, there must be a duration value
    'recalledItemAgedLostOverdue.duration': {
      rules: ['chargeAmountItemSystemSelected', 'hasPatronBilledAfterRecalledAgedToLostValue', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasInterval('recalledItemAgedLostOverdue.intervalId')
        || l.hasValue('patronBilledAfterRecalledItemAgedLost.duration')
        || l.hasValue('recalledItemAgedLostOverdue.duration')
        || (l.hasPassedValue('chargeAmountItemSystem', true) && !l.hasValue('itemAgedLostOverdue.duration')),
    },
    // Interval field: If there is a duration value, an interval must be selected
    'recalledItemAgedLostOverdue.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('recalledItemAgedLostOverdue.duration'),
    },

    // 'Patron billed for recall after aged to lost':
    // Duration field: If there is an interval selected, there must be a duration value
    'patronBilledAfterRecalledItemAgedLost.duration': {
      rules: ['hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.hasInterval('patronBilledAfterRecalledItemAgedLost.intervalId'),
    },
    // Interval field: If there is a duration value, an interval must be selected
    'patronBilledAfterRecalledItemAgedLost.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('patronBilledAfterRecalledItemAgedLost.duration'),
    },

    'chargeAmountItem.amount': {
      rules: ['hasPositiveItemsAgedToLostAfterOverdueAmount'],
      shouldValidate: l.hasPassedValue('chargeAmountItem.chargeType', 'anotherCost') && (l.hasPositiveValue('itemAgedLostOverdue.duration') ||
      l.hasPositiveValue('recalledItemAgedLostOverdue.duration') ||
      l.hasPositiveValue('patronBilledAfterRecalledItemAgedLost.duration')),
    },
    'lostItemProcessingFee': {
      rules: ['isFloatGreaterThanOrEqualToZero', 'hasNoChargeLostItemProcessingFee'],
      shouldValidate: l.hasPassedValue('chargeAmountItemPatron', true) || l.hasPassedValue('chargeAmountItemSystem', true) || l.hasNonZeroValue('lostItemProcessingFee'),
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
      shouldValidate: (l.hasPassedValue('chargeAmountItemSystem', true) && !l.hasPositiveValue('lostItemProcessingFee') && !l.hasPositiveValue('itemAgedLostOverdue.duration')) || (l.hasPassedValue('chargeAmountItemSystem', true) && !l.hasPositiveValue('lostItemProcessingFee') && l.hasPositiveValue('itemAgedLostOverdue.duration')),
    },
    'lostItemChargeFeeFine.duration': {
      rules: ['isNotEmptyLostItem', 'hasAmount', 'isIntegerGreaterThanOrEqualToZero'],
      shouldValidate: l.isRquiredLostItemCharge() || l.hasInterval('lostItemChargeFeeFine.intervalId'),
    },
    'lostItemChargeFeeFine.intervalId': {
      rules: ['isNotEmptySelect'],
      shouldValidate: l.hasValue('lostItemChargeFeeFine.duration'),
    },
    'replacementProcessingFee': {
      rules: ['hasPositiveReplacementProcessingFee', 'isFloatGreaterThanOrEqualToZero'],
      shouldValidate: l.hasPositiveValue('replacementProcessingFee') || l.hasValue('replacementProcessingFee'),
    },
    'replacedLostItemProcessingFee': {
      rules: ['hasReplacementAllowedAndPositiveLostItemPolicyFee', 'hasReplacementAllowedAndNegativeLostItemPolicyFee', 'hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee'],
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
};

export default lostItemFee;
