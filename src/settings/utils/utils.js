import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  find,
  get,
} from 'lodash';

export const LAYERS = {
  EDIT: 'edit',
  CLONE: 'clone',
  ADD: 'add',
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

export const getRecordName = ({
  entryList,
  location,
  formatMessage,
  optionNameId,
}) => {
  const pathParams = location.pathname.split('/');
  const recordId = pathParams[pathParams.length - 1];
  const query = new URLSearchParams(location.search);
  const layer = query.get('layer');
  const selectedRecordName = entryList.find(entry => entry.id === recordId)?.name;

  if (layer === LAYERS.EDIT) {
    return formatMessage(
      {
        id: 'ui-circulation.settings.title.editRecord',
      },
      {
        name: selectedRecordName,
      },
    );
  }

  if (layer === LAYERS.ADD || layer === LAYERS.CLONE) {
    return formatMessage(
      {
        id: 'ui-circulation.settings.title.newRecord',
      },
      {
        name: formatMessage(
          {
            id: optionNameId,
          },
          {
            optionNumber: 1,
          }
        ).toLowerCase(),
      },
    );
  }

  return selectedRecordName ||
    formatMessage(
      {
        id: optionNameId,
      },
      {
        optionNumber: 2,
      }
    );
};
