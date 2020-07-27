import React from 'react';
import { ARRAY_ERROR } from 'final-form';
import { FormattedMessage } from 'react-intl';

export default function ({ idents = [] }, prevErrors) {
  const nextErrors = { ...prevErrors, idents: [] };

  const hasIdents = idents.reduce((valid, v) => (valid || v), false);

  if (!hasIdents) {
    nextErrors.idents[ARRAY_ERROR] = <FormattedMessage id="ui-circulation.settings.checkout.validate.selectContinue" />;
  }

  return nextErrors;
}
