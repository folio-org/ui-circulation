import {
  isEmpty,
  isNumber,
  isInteger,
  isUndefined,
} from 'lodash';

export const isNotEmpty = (value) => isNumber(value) || !isEmpty(value);

export const isIntegerGreaterThanOne = (value) => isInteger(value) && value > 1;

export const isIntegerGreaterThanZero = (value) => isUndefined(value) || (isInteger(value) && value > 0);

export const isPositiveNumber = (value) => isUndefined(value) || (isInteger(value) && value >= 0);
