import {
  isEmpty,
  head,
} from 'lodash';

import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
  NOT_SELECTED,
  TLR_FIELDS_FOR_RESET,
} from '../../../constants';

const getInitialValues = (settings) => {
  if (isEmpty(settings)) {
    return TITLE_LEVEL_REQUESTS_DEFAULT_VALUES;
  }

  return {
    ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
    ...(head(settings)?.value || {}),
  };
};

export default getInitialValues;
