import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  find,
  get,
} from 'lodash';

export const LAYERS = {
  EDIT: 'edit',
};

export const validateUniqueNameById = async ({
  currentName,
  previousId,
  getByName,
  selector,
  errorKey,
}) => {
  let error;

  if (currentName) {
    try {
      const response = await getByName(currentName);
      const responseData = await response.json();
      const data = get(responseData, selector, []);
      const matched = find(data, (item) => {
        return item.name.toLowerCase() === currentName.toLowerCase();
      });

      if (matched && matched.id !== previousId) {
        error = <FormattedMessage id={`ui-circulation.${errorKey}`} />;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  return error;
};

export const isEditLayer = (layer = '') => (layer.includes(LAYERS.EDIT));
