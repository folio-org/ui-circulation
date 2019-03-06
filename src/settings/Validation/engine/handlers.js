import {
  isEmpty,
  isNumber,
  isInteger,
} from 'lodash';

export const isNotEmpty = (value) => isNumber(value) || !isEmpty(value);

export const isIntegerGreaterThanOne = (value) => isInteger(value) && value > 1;

export const isIntegerGreaterThanZero = (value) => isInteger(value) && value > 0;

export const isPositiveNumber = (value) => isInteger(value) && value >= 0;

export const isInInterval = (min, max, value) => value >= min && value <= max;
