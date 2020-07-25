import {
  get,
  isEmpty,
  isNumber,
  isInteger,
  isUndefined
} from 'lodash';

import moment from 'moment';

export const isNotEmpty = (value) => {
  return isNumber(value) || !isEmpty(value);
};

export const isIntegerGreaterThanZero = (value) => isInteger(value) && value > 0;

export const isIntegerGreaterThanOrEqualToZero = (value) => isInteger(value) && value >= 0;

export const isStringGreaterThanZero = (value) => isIntegerGreaterThanZero(Number(value));

export const isStringGreaterThanOrEqualToZero = (value) => isIntegerGreaterThanOrEqualToZero(Number(value));

export const isPositiveNumber = (value) => isInteger(value) && value >= 0;

export const isInInterval = (min, max, value) => value >= min && value <= max;

export const isInIntervalOrNull = (min, max, value) => !value || isInInterval(min, max, value);

export const isNotEmptyEditor = (value = '') => {
  const plainText = value.replace(/<\/?[^>]+(>|$)/g, '');

  return !isEmpty(plainText);
};

export const isSelected = (value) => !isUndefined(value);

export const isGreaterOrEqualThanPassedField = (fieldToCompare, value, model) => {
  const valueToCompare = get(model, fieldToCompare);
  return parseInt(value, 10) >= parseInt(valueToCompare, 10);
};

export const isMaximumFineValueValid = (fieldToCompare, value, model) => {
  const valueToCompare = get(model, fieldToCompare);
  return parseInt(value, 10) > 0 && parseInt(valueToCompare, 10) > 0;
};

export const hasNoChargeLostItemProcessingFee = (value, model) => {
  const chargeAmountItemPatron = get(model, 'chargeAmountItemPatron');
  const chargeAmountItemSystem = get(model, 'chargeAmountItemSystem');

  return chargeAmountItemPatron || chargeAmountItemSystem;
};

export const hasLostItemProcessingFeeValue = (value, model) => {
  const lostItemProcessingFee = get(model, 'lostItemProcessingFee');

  return parseInt(lostItemProcessingFee, 10) > 0;
};

export const hasPositivereplacementAllowed = (value, model) => {
  const replacementAllowed = get(model, 'replacementAllowed');

  return replacementAllowed;
};

export const hasPatronBilledAfterAgedToLostValue = (value, model) => {
  const patronBilledAfterAgedToLostValue = get(model, 'patronBilledAfterAgedLost.duration');

  return (isNotEmpty(patronBilledAfterAgedToLostValue) && isNotEmpty(value)) || !isNotEmpty(patronBilledAfterAgedToLostValue);
};

export const hasChargeAmountItemSystemSelected = (value, model) => {
  const chargeAmountItemSystem = get(model, 'chargeAmountItemSystem');

  return (chargeAmountItemSystem && isNotEmpty(value)) || !chargeAmountItemSystem;
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
