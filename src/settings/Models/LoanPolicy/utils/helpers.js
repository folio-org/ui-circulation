import {
  has,
  reduce,
  isEqual,
  isEmpty,
  some,
} from 'lodash';

const isDefaultsSelected = (model, defaultState) => {
  const currentState = JSON.parse(JSON.stringify(model));

  return isEqual(currentState, defaultState);
};

const additionalFieldsSelected = (model, defaultState) => {
  const currentState = JSON.parse(JSON.stringify(model));

  if (isEqual(currentState, defaultState)) {
    return false;
  }

  const fields = reduce(currentState, (res, value, key) => {
    const hasNewValue = has(defaultState, key) && !isEqual(defaultState[key], value) && !isEmpty(value);
    const hasNewKey = !has(defaultState, key);
    if (hasNewKey || hasNewValue) {
      res.push(key);
    }

    return res;
  }, []);

  return !isEmpty(fields);
};

const isValidItemSelected = (options, selectedId) => {
  return some(options, ({ id }) => id === selectedId);
};

export default {
  isDefaultsSelected,
  additionalFieldsSelected,
  isValidItemSelected,
};
