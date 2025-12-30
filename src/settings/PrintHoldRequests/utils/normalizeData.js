import {
  PRINT_HOLD_REQUESTS,
  PRINT_HOLD_REQUESTS_DEFAULT_VALUES,
} from '../../../constants';

const normalizeData = (value = {}) => (
  value[PRINT_HOLD_REQUESTS.PRINT_HOLD_REQUESTS_ENABLED]
    ? value
    : PRINT_HOLD_REQUESTS_DEFAULT_VALUES
);

export default normalizeData;
