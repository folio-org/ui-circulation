import React from 'react';
import {
  isEmpty,
  forEach,
  noop,
} from 'lodash';

export default (formatMessage = noop, config = {}, placeholder = '') => {
  const options = [];

  if (!isEmpty(placeholder)) {
    options.push(
      <option
        value=""
        key="x"
      >
        {formatMessage({ id: placeholder })}
      </option>
    );
  }

  forEach(config, ({ value, label }) => {
    options.push(
      <option
        value={value}
        key={value}
      >
        {formatMessage({ id: label })}
      </option>
    );
  });

  return options;
};
