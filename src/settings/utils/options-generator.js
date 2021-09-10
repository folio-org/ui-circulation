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
        data-testid="placeholderTestId"
        value=""
        key="x"
      >
        {formatMessage({ id: placeholder })}
      </option>
    );
  }

  forEach(config, ({ value, label }, index) => {
    options.push(
      <option
        data-testid={`optionTestId-${index}`}
        value={value}
        key={value}
      >
        {formatMessage({ id: label })}
      </option>
    );
  });

  return options;
};
