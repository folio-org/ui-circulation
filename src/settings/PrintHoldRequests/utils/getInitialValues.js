import {
  isEmpty,
  head,
} from 'lodash';

import {
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
} from '../../../constants';

const getInitialValues = (settings) => {
  if (isEmpty(settings)) {
    return PRINT_HOLD_REQUESTS_DEFAULT_VALUES;
  }

  const settingsForReturn = {
    ...PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
    ...JSON.parse(head(settings).value),
  };

  return settingsForReturn;
};

export default getInitialValues;
