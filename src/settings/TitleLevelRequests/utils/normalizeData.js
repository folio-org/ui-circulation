import {
  TITLE_LEVEL_REQUESTS,
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
  // TLR_FIELDS_FOR_RESET,
  // NOT_SELECTED,
} from '../../../constants';

const normalizeData = (value) => {
  return value[TITLE_LEVEL_REQUESTS.TLR_ENABLED]
    ? value
    : TITLE_LEVEL_REQUESTS_DEFAULT_VALUES;
};

export default normalizeData;
