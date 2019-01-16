import {
  get,
  set,
  forEach,
  some,
} from 'lodash';

import validatorsList from './validatorsList';

const validateField = Symbol('validateField');

export default class FormValidator {
  constructor(config, validators = validatorsList) {
    this.config = config;
    this.validators = validators;
  }

  [validateField](data, pathToField) {
    let isFieldValid = true;
    let validationMessage = null;

    const validationRules = this.config[pathToField].rules || [];

    some(validationRules, (validationRule) => {
      const validator = this.validators[validationRule];

      if (!validator) {
        throw new Error(`Validation: no handler to validate - ${validationRule}`);
      }

      const valueToValidate = get(data, pathToField);
      const isValid = this.config[pathToField].shouldValidate
        ? validator.validate(valueToValidate)
        : true;

      if (!isValid) {
        isFieldValid = false;
        validationMessage = validator.message;
      }

      return !isValid;
    });

    return {
      isFieldValid,
      validationMessage,
    };
  }

  validate(data) {
    const errors = {};

    forEach(Object.keys(this.config), (pathToField) => {
      const {
        isFieldValid,
        validationMessage,
      } = this[validateField](data, pathToField);

      if (!isFieldValid) {
        set(errors, pathToField, validationMessage);
      }
    });

    return errors;
  }
}
