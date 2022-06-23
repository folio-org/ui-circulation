import FormValidator from '../engine/FormValidator';

import {
  RULES,
  GENERAL_NAME_FIELD_VALIDATION_PROPS,
} from '../../../constants/Validation/general';
import { PATRON_NOTICE_PATH } from '../../../constants/Validation/patron-notice-template';

export const config = {
  ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
  [PATRON_NOTICE_PATH.CATEGORY]: {
    rules: [RULES.IS_NOT_EMPTY_SELECT],
    shouldValidate: true,
  },
  [PATRON_NOTICE_PATH.LOCALIZED_TEMPLATES_EN_HEADER]: {
    rules: [RULES.IS_NOT_EMPTY, RULES.IS_NOT_EMPTY_WITHOUT_SPACE],
    shouldValidate: true,
  },
  [PATRON_NOTICE_PATH.LOCALIZED_TEMPLATES_EN_BODY]: {
    rules: [RULES.IS_NOT_EMPTY_EDITOR],
    shouldValidate: true,
  },
};

const patronNoticeTemplate = (template) => {
  const formValidator = new FormValidator(config);

  return formValidator.validate(template);
};

export default patronNoticeTemplate;
