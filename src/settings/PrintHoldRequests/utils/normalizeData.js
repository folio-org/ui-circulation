import {
  PRINT_HOLD_REQUESTS,
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
} from '../../../constants';

const normalizeData = (value = {}) => {
  const configForReturn = value[PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]
    ? value
    : PRINT_HOLD_REQUESTS_DEFAULT_VALUES;

  return JSON.stringify(configForReturn);
};

export default normalizeData;
