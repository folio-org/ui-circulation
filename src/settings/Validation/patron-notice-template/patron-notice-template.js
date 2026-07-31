import { omit } from 'lodash';

import FormValidator from '../engine/FormValidator';

import {
  RULES,
  GENERAL_NAME_FIELD_VALIDATION_PROPS,
} from '../../../constants/Validation/general';
import { PATRON_NOTICE_PATH } from '../../../constants/Validation/patron-notice-template';
import { isSubjectEnabled } from '../../PatronNotices/utils';

export const config = {
  ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
  [PATRON_NOTICE_PATH.CATEGORY]: {
    rules: [RULES.IS_NOT_EMPTY_SELECT],
    shouldValidate: true,
  },
  [PATRON_NOTICE_PATH.LOCALIZED_TEMPLATES_EN_HEADER]: {
    rules: [RULES.IS_NOT_EMPTY, RULES.IS_NOT_EMPTY_WITHOUT_SPACE, RULES.NO_WHITE_SPACE_AT_BEGIN],
    shouldValidate: true,
  },
  [PATRON_NOTICE_PATH.LOCALIZED_TEMPLATES_EN_BODY]: {
    rules: [RULES.IS_NOT_EMPTY_EDITOR],
    shouldValidate: true,
  },
};

const patronNoticeTemplate = (template) => {
  let updatedConfig = config;

  // The LOCALIZED_TEMPLATES_EN_HEADER has value only for email notices,
  // so we need to remove it from validation config for other notice formats.
  if (!isSubjectEnabled(template.additionalProperties?.noticeFormat)) {
    updatedConfig = omit(config, PATRON_NOTICE_PATH.LOCALIZED_TEMPLATES_EN_HEADER);
  }
  const formValidator = new FormValidator(updatedConfig);

  return formValidator.validate(template);
};

export default patronNoticeTemplate;
