import {
  get,
  isNumber,
  isEmpty,
} from 'lodash';

const isValueExists = (model, path) => {
  const value = get(model, `${path}.duration`);

  return isNumber(value);
};

const isIntervalSelected = (model, key) => {
  const interval = get(model, `${key}.intervalId`);

  return !isEmpty(interval);
};

export default (model, key) => ({
  duration: isValueExists(model, key),
  intervalId: isIntervalSelected(model, key),
});
