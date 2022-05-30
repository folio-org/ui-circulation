import FormValidator from '../engine/FormValidator';

import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

export default function (template) {
  const config = {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    'category': {
      rules: ['isNotEmptySelect'],
      shouldValidate: true,
    },
    'localizedTemplates.en.header': {
      rules: ['isNotEmpty', 'isNotEmptyWithoutSpace'],
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
