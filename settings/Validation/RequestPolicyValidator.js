import FormValidator from './engine/FormValidator';

export default function (policy) {
  const config = {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
  };
  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
}
