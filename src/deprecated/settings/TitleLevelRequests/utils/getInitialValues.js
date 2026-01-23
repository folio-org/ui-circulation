import {
  isEmpty,
} from 'lodash';

import {
  NOT_SELECTED,
  TLR_FIELDS_FOR_RESET,
} from '../../../../constants';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
} from '../constants';

const getInitialValues = (settings) => {
  if (isEmpty(settings)) {
    return TITLE_LEVEL_REQUESTS_DEFAULT_VALUES;
  }

  const settingsForReturn = {
    ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
    ...settings,
  };

  TLR_FIELDS_FOR_RESET.forEach(field => {
    if (settingsForReturn[field] === null) {
      settingsForReturn[field] = NOT_SELECTED;
    }
  });

  return settingsForReturn;
};

export default getInitialValues;
