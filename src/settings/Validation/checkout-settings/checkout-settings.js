import FormValidator from '../engine/FormValidator';
import patronIdentifierValidator from './patron-identifiers';

export const config = {
  checkoutTimeoutDuration: {
    rules: ['hasPositiveCheckoutTimeoutDuration'],
    shouldValidate: true,
  },
};

const checkoutSettingsValidator = (settings) => {
  const formValidator = new FormValidator(config);

  return patronIdentifierValidator(settings, formValidator.validate(settings));
};

export default checkoutSettingsValidator;
