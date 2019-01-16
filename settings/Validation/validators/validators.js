import {
  isEmpty,
  isNumber,
  isInteger,
} from 'lodash';

export const isNotEmpty = (value) => isNumber(value) || !isEmpty(value);

export const isIntegerGreaterThanOne = (value) => isInteger(value) && value > 1;
