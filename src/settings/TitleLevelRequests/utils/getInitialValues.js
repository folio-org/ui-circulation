import {
  isEmpty,
  head,
} from 'lodash';

import { TITLE_LEVEL_REQUESTS_DEFAULT_VALUES } from '../../../constants';

const getInitialValues = (settings) => {
  if (isEmpty(settings)) {
    return TITLE_LEVEL_REQUESTS_DEFAULT_VALUES;
  }

  return {
    ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
    ...JSON.parse(head(settings).value),
  };
};

export default getInitialValues;
