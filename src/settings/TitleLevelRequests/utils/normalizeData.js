import {
  TITLE_LEVEL_REQUESTS,
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
  TLR_FIELDS_FOR_RESET,
  NOT_SELECTED,
} from '../../../constants';

const normalizeData = (value) => {
  const configForReturn = value[TITLE_LEVEL_REQUESTS.TLR_ENABLED]
    ? value
    : TITLE_LEVEL_REQUESTS_DEFAULT_VALUES;

  TLR_FIELDS_FOR_RESET.forEach(field => {
    if (configForReturn[field] === NOT_SELECTED) {
      configForReturn[field] = null;
    }
  });

  return JSON.stringify(configForReturn);
};

export default normalizeData;
