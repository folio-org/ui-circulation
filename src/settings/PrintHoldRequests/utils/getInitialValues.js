import {
  isEmpty,
} from 'lodash';

import {
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
} from '../../../constants';

const getInitialValues = (settings) => (
  isEmpty(settings)
    ? PRINT_HOLD_REQUESTS_DEFAULT_VALUES
    : {
      ...PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
      ...settings,
    }
);

export default getInitialValues;
