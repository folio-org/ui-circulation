import React from 'react';
import { find } from 'lodash';
import { FormattedMessage } from 'react-intl';

export default function (requestPolicy, _, props) {
  return new Promise((resolve, reject) => {
    const { id, name } = requestPolicy;

    if (!name) return resolve();

    const validator = props.parentMutator.nameUniquenessValidator;
    const query = `(name="${name}")`;

    validator.reset();
    return validator.GET({ params: { query } }).then((items) => {
      const item = find(items, new RegExp(name, 'i'));
      if (item && item.id !== id) {
        const error = {
          name: <FormattedMessage id="ui-circulation.settings.requestPolicy.errors.nameExists" />
        };

        reject(error);
      } else {
        resolve();
      }
    });
  });
}
