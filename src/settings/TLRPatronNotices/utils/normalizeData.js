import {
  NOT_SELECTED,
  TLR_FIELDS_FOR_RESET,
} from '../../../constants';

const normalizeData = (value) => {
  TLR_FIELDS_FOR_RESET.forEach(field => {
    if (value[field] === NOT_SELECTED) {
      value[field] = null;
    }
  });

  return value;
};

export default normalizeData;