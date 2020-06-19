import {
  get,
  isEmpty,
  isNumber,
  isInteger,
  isUndefined
} from 'lodash';

export const isNotEmpty = (value) => {
  return isNumber(value) || !isEmpty(value);
};

export const isIntegerGreaterThanZero = (value) => isInteger(value) && value > 0;

export const isIntegerGreaterThanOrEqualToZero = (value) => isInteger(value) && value >= 0;

export const isStringGreaterThanOrEqualToZero = value => isIntegerGreaterThanOrEqualToZero(parseInt(value, 10));

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
