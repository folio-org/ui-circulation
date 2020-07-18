import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  get,
  set,
  forEach,
  some,
} from 'lodash';

import defaultValidators from './validators';

const validateField = Symbol('validateField');

export default class FormValidator {
  constructor(config, validators = defaultValidators) {
    this.config = config;
    this.validators = validators;
  }

  [validateField](data, pathToField) {
    let isFieldValid = true;
    let validationMessage = null;

    const validationRules = this.config[pathToField].rules || [];
    const additionalData = this.config[pathToField].additionalData;

    some(validationRules, validationRule => {
      const validator = this.validators[validationRule];
      if (!validator) {
        throw new Error(
          `Validation: no handler to validate - ${validationRule}`
        );
      }

      const valueToValidate = get(data, pathToField);
      const isValid = this.config[pathToField].shouldValidate
        ? validator.validate(valueToValidate, data, additionalData)
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

  validate(data, sectionKey) {
    const errors = {};

    forEach(Object.keys(this.config), pathToField => {
      const {
        isFieldValid,
        validationMessage,
      } = this[validateField](data, pathToField);

      if (!isFieldValid) {
        set(errors, pathToField, validationMessage);
      }
    });

    if (data[sectionKey]) {
      const uniqueValues = {};
      forEach(data[sectionKey], ({ paymentMethod }, index) => {
        if (paymentMethod) {
          if (uniqueValues[paymentMethod]) {
            set(
              errors,
              `${sectionKey}[${index}].paymentMethod`,
              <FormattedMessage id="ui-circulation.settings.loanHistory.errors.paymentMethodSelected" />
            );
          } else {
            uniqueValues[paymentMethod] = {};
          }
        }
      });
    }
    return errors;
  }
}
