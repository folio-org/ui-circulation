import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  get,
  set,
  forEach,
  isEmpty,
  isNumber,
} from 'lodash';

const defaultValidators = {
  isNotEmpty: {
    validate: (value) => isNumber(value) || !isEmpty(value),
    message: <FormattedMessage id="ui-circulation.settings.validate.fillIn" />,
  },
};

export default class FormValidator {
  constructor(config, validators = defaultValidators) {
    this.config = config;
    this.validators = validators;
  }

  validate(data) {
    const errors = {};

    forEach(Object.keys(this.config), (pathToField) => {
      const type = this.config[pathToField].type;
      const validator = this.validators[type];

      if (!type) {
        return;
      }

      if (!validator) {
        throw new Error(`Validation: no handler to validate - ${type}`);
      }

      const valueToValidate = get(data, pathToField);
      const isValid = this.config[pathToField].shouldValidate
        ? validator.validate(valueToValidate)
        : true;

      if (!isValid) {
        set(errors, pathToField, validator.message);
      }
    });

    return errors;
  }
}
