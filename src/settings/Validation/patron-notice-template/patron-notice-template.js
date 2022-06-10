import FormValidator from '../engine/FormValidator';

import {
  RULES,
  GENERAL_NAME_FIELD_VALIDATION_PROPS,
} from '../../../constants/Validation/general';

const patronNoticeTemplate = (template) => {
  const config = {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    'category': {
      rules: [RULES.IS_NOT_EMPTY_SELECT],
      shouldValidate: true,
    },
    'localizedTemplates.en.header': {
      rules: [RULES.IS_NOT_EMPTY, RULES.IS_NOT_EMPTY_WITHOUT_SPACE],
      shouldValidate: true,
    },
    'localizedTemplates.en.body': {
      rules: [RULES.IS_NOT_EMPTY_EDITOR],
      shouldValidate: true,
    },
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(template);
};

export default patronNoticeTemplate;
