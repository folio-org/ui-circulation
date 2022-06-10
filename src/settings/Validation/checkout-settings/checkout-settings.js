import FormValidator from '../engine/FormValidator';
import patronIdentifierValidator from './patron-identifiers';

const checkoutSettingsValidator = (settings) => {
  const config = {
    'checkoutTimeoutDuration': {
      rules: ['hasPositiveCheckoutTimeoutDuration'],
      shouldValidate: true,
    },
  };
  const formValidator = new FormValidator(config);

  return patronIdentifierValidator(settings, formValidator.validate(settings));
};

export default checkoutSettingsValidator;
