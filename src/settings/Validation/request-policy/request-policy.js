import FormValidator from '../engine/FormValidator';

import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

export default function (policy) {
  const config = {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
  };
  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
}
