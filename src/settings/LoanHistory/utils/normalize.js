import {
  cloneDeep,
  forEach,
  set,
  isArray,
  isString,
} from 'lodash';
import { change } from 'redux-form';

import { closingTypesMap } from '../../../constants';

const cleanInterval = ({ data, dispatch }) => {
  const newData = cloneDeep(data);

  forEach(data.closingType, (value, key) => {
    if (isString(value) && value !== closingTypesMap.INTERVAL) {
      set(newData, key, {});
      dispatch(change('loanHistoryForm', key, {}));
    } else if (isArray(value)) {
      forEach(value, (loanExceptionsValue, index) => {
        if (loanExceptionsValue !== closingTypesMap.INTERVAL) {
          set(newData, [key, index], {});
          dispatch(change('loanHistoryForm', [key, index], {}));
        }
      });
    }
  });

  return newData;
};

export const normalize = entity => {
  let cleanedEntity = cloneDeep(entity);
  const cleaners = [cleanInterval];

  forEach(cleaners, cleaner => {
    cleanedEntity = cleaner(cleanedEntity);
  });

  return cleanedEntity;
};

export default normalize;
