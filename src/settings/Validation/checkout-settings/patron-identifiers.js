import React from 'react';
import { FormattedMessage } from 'react-intl';

const patronIdentifierValidator = ({ identifiers = {} }, prevErrors) => {
  const nextErrors = { ...prevErrors };

  const { custom: customFieldIdentifiers, ...defaultIdentifers } = identifiers;
  const hasIndentifiers = Object.values(defaultIdentifers).includes(true) || customFieldIdentifiers.length > 0;

  if (!hasIndentifiers) {
    nextErrors.identifiers = <FormattedMessage id="ui-circulation.settings.checkout.validate.selectContinue" />;
  }

  return nextErrors;
};

export default patronIdentifierValidator;
