import FormValidator from '../engine/FormValidator';

export default function (template) {
  const config = {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'category': {
      rules: ['isNotEmptySelect'],
      shouldValidate: true,
    },
    'localizedTemplates.en.header': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
    'localizedTemplates.en.body': {
      rules: ['isNotEmptyEditor'],
      shouldValidate: true,
    },
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(template);
}
