import FormValidator from './FormValidator';

const defaultValidators = {
  testValidator: {
    validate: () => true,
    message: 'test message',
  }
};

jest.mock('./validators', () => defaultValidators);

describe('FormValidator', () => {
  const fieldName = 'testField';
  const validatorName = 'testValidator';
  const message = 'test message';
  const config = {
    [fieldName]: {
      shouldValidate: true,
      rules: [validatorName],
    },
  };
  const validators = {
    [validatorName]: {
      validate: () => true,
      message,
    },
  };
  const validationData = {
    [fieldName]: '',
  };
  const formValidator = new FormValidator(config, validators);

  it('should have correct properties', () => {
    expect(formValidator).toEqual(expect.objectContaining({
      config,
      validators,
    }));
  });

  it('should have correct properties if "validators" not provided', () => {
    const formValidatorInstance = new FormValidator(config);

    expect(formValidatorInstance).toEqual(expect.objectContaining({
      config,
      validators: defaultValidators,
    }));
  });

  describe('validate', () => {
    it('should return empty error object if validation passed successfully', () => {
      expect(formValidator.validate(validationData)).toEqual({});
    });

    it('should return empty error object if "config" is empty object', () => {
      const formValidatorInstance = new FormValidator({}, validators);

      expect(formValidatorInstance.validate(validationData)).toEqual({});
    });

    it('should return empty error object if there is no provided rules', () => {
      const validatorConfig = {
        [fieldName]: {
          shouldValidate: true,
        },
      };
      const formValidatorInstance = new FormValidator(validatorConfig, validators);

      expect(formValidatorInstance.validate(validationData)).toEqual({});
    });

    it('should throw an error if there is no matched validators', () => {
      const wrongValidator = 'wrongValidator';
      const validatorConfig = {
        [fieldName]: {
          shouldValidate: true,
          rules: [wrongValidator],
        },
      };
      const formValidatorInstance = new FormValidator(validatorConfig, validators);

      try {
        formValidatorInstance.validate(validationData);
      } catch (e) {
        expect(e).toEqual(Error(`Validation: no handler to validate - ${wrongValidator}`));
      }
    });

    it('should return empty error object if "shouldValidate" equals false', () => {
      const validatorConfig = {
        [fieldName]: {
          shouldValidate: false,
          rules: [validatorName],
        },
      };
      const formValidatorInstance = new FormValidator(validatorConfig, validators);

      expect(formValidatorInstance.validate(validationData)).toEqual({});
    });

    it('should return error object if validation did not pass', () => {
      const validatorsList = {
        [validatorName]: {
          validate: () => false,
          message,
        }
      };
      const formValidatorInstance = new FormValidator(config, validatorsList);

      expect(formValidatorInstance.validate(validationData)).toEqual({
        [fieldName]: message,
      });
    });
  });
});
