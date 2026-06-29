import React from 'react';
import { FormattedMessage } from 'react-intl';

const patronIdentifierValidator = ({ identifiers = {}, useCustomFieldsAsIdentifiers }, prevErrors) => {
  const nextErrors = { ...prevErrors };

  const { custom: customFieldIdentifiers, ...defaultIdentifers } = identifiers;
  const hasDefaultIdentifiers = Object.values(defaultIdentifers).includes(true);
  const hasCustomIdentifiers = customFieldIdentifiers.length > 0;

  // At least one identifier must be selected (default or custom when enabled)
  const hasIdentifiers = hasDefaultIdentifiers || (useCustomFieldsAsIdentifiers && hasCustomIdentifiers);
  // If "User custom fields" checkbox is checked, at least one custom field must be selected
  const isCustomFieldsValid = !useCustomFieldsAsIdentifiers || hasCustomIdentifiers;

  if (!hasIdentifiers || !isCustomFieldsValid) {
    nextErrors.identifiers = <FormattedMessage id="ui-circulation.settings.checkout.validate.selectContinue" />;
  }

  return nextErrors;
};

export default patronIdentifierValidator;
