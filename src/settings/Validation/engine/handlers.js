import {
  isEmpty,
  isNumber,
  isInteger,
} from 'lodash';

export const isNotEmpty = (value) => {
  return isNumber(value) || !isEmpty(value);
};

export const isIntegerGreaterThanZero = (value) => isInteger(value) && value > 0;

export const isIntegerGreaterThanOrEqualToZero = (value) => isInteger(value) && value >= 0;

export const isPositiveNumber = (value) => isInteger(value) && value >= 0;

export const isInInterval = (min, max, value) => value >= min && value <= max;

export const isNotEmptyEditor = (value = '') => {
  const plainText = value.replace(/<\/?[^>]+(>|$)/g, '');

  return !isEmpty(plainText);
};

export const isOverdueFindGreaterThan = (value) => isInteger(value) && value > 0;
