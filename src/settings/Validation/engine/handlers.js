import {
  get,
  isEmpty,
  isNumber,
  isInteger,
  isUndefined,
  isString,
} from 'lodash';

import moment from 'moment';

import LostItemFeePolicy from '../../Models/LostItemFeePolicy';

export const isNotEmpty = (value) => {
  return isNumber(value) || !isEmpty(value);
};

export const isNotEmptyWithoutSpace = (value) => {
  return isString(value) && !!value.trim();
};

export const isIntegerGreaterThanZero = (value) => isInteger(value) && value > 0;

export const isIntegerGreaterThanOrEqualToZero = (value) => isInteger(value) && value >= 0;

export const isFloatGreaterThanZero = (value) => {
  const parsedValue = parseFloat(value, 10);

  return isNumber(parsedValue) && parsedValue > 0;
};

export const isFloatGreaterThanOrEqualToZero = (value) => {
  const parsedValue = parseFloat(value, 10);

  return isNumber(parsedValue) && value >= 0;
};

export const isPositiveNumber = (value) => isInteger(value) && value >= 0;

export const isInInterval = (min, max, value) => value >= min && value <= max;

export const isInIntervalOrNull = (min, max, value) => !value || isInInterval(min, max, value);

export const isNotEmptyEditor = (value = '') => {
  const plainText = value.replace(/<\/?[^>]+(>|$)/g, '');

  return !isEmpty(plainText) && !!plainText.trim();
};

export const isSelected = (value) => !isUndefined(value);

export const isGreaterOrEqualThanPassedField = (fieldToCompare, value, model) => {
  const valueToCompare = get(model, fieldToCompare);

  return parseFloat(value, 10) >= parseFloat(valueToCompare, 10);
};

export const isMaximumFineValueValid = (fieldToCompare, value, model) => {
  const valueToCompare = get(model, fieldToCompare);
  return parseFloat(value, 10) > 0 && parseFloat(valueToCompare, 10) > 0;
};

export const hasNoChargeLostItemProcessingFee = (value, model) => {
  const chargeAmountItemPatron = get(model, 'chargeAmountItemPatron');
  const chargeAmountItemSystem = get(model, 'chargeAmountItemSystem');

  return chargeAmountItemPatron || chargeAmountItemSystem;
};

export const hasLostItemProcessingFeeValue = (value, model) => {
  const lostItemProcessingFee = get(model, 'lostItemProcessingFee');

  return parseFloat(lostItemProcessingFee, 10) > 0;
};

export const hasPositiveReplacementAllowed = (value, model) => {
  const replacementAllowed = get(model, 'replacementAllowed');

  return replacementAllowed;
};

export const hasReplacementAllowedAndPositiveLostItemPolicyFee = (value, model) => {
  const replacementAllowed = get(model, 'replacementAllowed');
  const lostItemProcessingFee = get(model, 'lostItemProcessingFee');

  const hasVaidLostItemProcessingFee = parseFloat(lostItemProcessingFee, 10) > 0;

  return value && (hasVaidLostItemProcessingFee || replacementAllowed);
};

export const hasReplacementAllowedAndNegativeLostItemPolicyFee = (value, model) => {
  const replacementAllowed = get(model, 'replacementAllowed');
  const lostItemProcessingFee = get(model, 'lostItemProcessingFee');

  return value && replacementAllowed && parseFloat(lostItemProcessingFee, 10) >= 0;
};

export const hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee = (value, model) => {
  const lostItemProcessingFee = get(model, 'lostItemProcessingFee');

  return value && parseFloat(lostItemProcessingFee, 10) > 0;
};

export const hasPatronBilledAfterAgedToLostValue = (value, model) => {
  const patronBilledAfterAgedToLostValue = get(model, 'patronBilledAfterAgedLost.duration');

  return (isNotEmpty(patronBilledAfterAgedToLostValue) && isNotEmpty(value)) || !isNotEmpty(patronBilledAfterAgedToLostValue);
};

export const hasChargeAmountItemSystemSelected = (value, model) => {
  const chargeAmountItemSystem = get(model, 'chargeAmountItemSystem');
  const itemAgedLostOverdueDuration = get(model, 'itemAgedLostOverdue.duration');
  const recalledItemAgedLostOverdueDuration = get(model, 'recalledItemAgedLostOverdue.duration');

  return !chargeAmountItemSystem
    || isNotEmpty(itemAgedLostOverdueDuration)
    || isNotEmpty(recalledItemAgedLostOverdueDuration);
};

export const isToBeforeFrom = (value, model, { pathToSection }) => {
  const to = moment(value);
  const from = moment(get(model, `${pathToSection}.from`));

  return to.isAfter(from);
};

export const isDueAfterTo = (value, model, { pathToSection }) => {
  const due = moment(value);
  const to = moment(get(model, `${pathToSection}.to`));

  return due.isSameOrAfter(to);
};

export const isRquiredLostItemCharge = (value, model) => {
  const lostItemFeePolicy = new LostItemFeePolicy(model);

  return !lostItemFeePolicy.isRquiredLostItemCharge() || isNotEmpty(value);
};

export const hasPositiveItemsAgedToLostAfterOverdueAmount = (value, model) => {
  const chargeType = get(model, 'chargeAmountItem.chargeType');
  const lostBySystem = get(model, 'chargeAmountItemSystem');

  return chargeType === 'anotherCost' && (lostBySystem || (!isUndefined(value) && parseFloat(value, 10) > 0));
};

export const hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue = (value, model) => {
  const itemAgedToLost = get(model, 'itemAgedLostOverdue.duration');

  const hasValidItemAgedToLost = (!isUndefined(itemAgedToLost) && parseInt(itemAgedToLost, 10) > 0);

  return value && hasValidItemAgedToLost;
};

export const hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue = (value, model) => {
  const lostItemProcessingFee = get(model, 'lostItemProcessingFee');
  const itemAgedToLost = get(model, 'itemAgedLostOverdue.duration');

  return value && parseFloat(lostItemProcessingFee, 10) < 0 && parseInt(itemAgedToLost, 10) > 0;
};

// If 'Patron billed for recall after aged to lost' has a value, then
// 'Recalled items aged to lost after overdue' requires a value also.
export const hasPatronBilledAfterRecalledAgedToLostValue = (value, model) => {
  const recalledLostValue = get(model, 'recalledItemAgedLostOverdue.duration');
  const patronBilledRecalledValue = get(model, 'patronBilledAfterRecalledItemAgedLost.duration');

  return !!((isUndefined(patronBilledRecalledValue) || patronBilledRecalledValue === '') ||
    (recalledLostValue && patronBilledRecalledValue >= 0));
};
