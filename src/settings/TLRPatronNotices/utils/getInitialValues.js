import {
  head,
  isEmpty,
} from 'lodash';
import {
  NOT_SELECTED,
  TLR_FIELDS_FOR_RESET,
  TLR_PATRON_NOTICES_DEFAULT_VALUES,
} from '../../../constants';

const getInitialValues = (values) => {
  if (isEmpty(values)) {
    return TLR_PATRON_NOTICES_DEFAULT_VALUES;
  }

  const settingsForReturn = {
    ...TLR_PATRON_NOTICES_DEFAULT_VALUES,
    ...(head(values)?.value || {}),
  };

  TLR_FIELDS_FOR_RESET.forEach(field => {
    if (settingsForReturn[field] === null) {
      settingsForReturn[field] = NOT_SELECTED;
    }
  });

  return settingsForReturn;
};

export default getInitialValues;
