import {
  has,
  reduce,
  isEqual,
  isEmpty,
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
    const hasNewValue = has(defaultState, key) && !isEqual(defaultState[key], value);
    const hasNewKey = !has(defaultState, key);
    if (hasNewKey || hasNewValue) {
      res.push(key);
    }

    return res;
  }, []);

  return !isEmpty(fields);
};

export default {
  isDefaultsSelected,
  additionalFieldsSelected,
};
