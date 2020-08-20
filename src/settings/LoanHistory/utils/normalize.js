import {
  cloneDeep,
  forEach,
  set,
  isArray,
  isString,
} from 'lodash';

import { closingTypesMap } from '../../../constants';

const cleanInterval = (data) => {
  const newData = cloneDeep(data);

  forEach(data.closingType, (value, key) => {
    if (isString(value) && value !== closingTypesMap.INTERVAL) {
      set(newData, key, {});
    } else if (isArray(value)) {
      forEach(value, (loanExceptionsValue, index) => {
        if (loanExceptionsValue !== closingTypesMap.INTERVAL) {
          set(newData, [key, index], {});
        }
      });
    }
  });
  return newData;
};

const normalize = entity => {
  let cleanedEntity = cloneDeep(entity);
  const cleaners = [cleanInterval];

  forEach(cleaners, cleaner => {
    cleanedEntity = cleaner(cleanedEntity);
  });

  return cleanedEntity;
};

export default normalize;
