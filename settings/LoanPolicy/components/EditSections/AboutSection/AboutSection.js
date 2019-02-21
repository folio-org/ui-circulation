import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  TextArea,
  TextField,
} from '@folio/stripes/components';

const AboutSection = () => (
  <div data-test-loan-policy-form-about-section>
    <h2 data-test-about-section-header>
      <FormattedMessage id="ui-circulation.settings.loanPolicy.about" />
    </h2>
    <div data-test-about-section-policy-name>
      <Field
        label={(
          <FormattedMessage id="ui-circulation.settings.loanPolicy.policyName">
            {message => `${message} *`}
          </FormattedMessage>
        )}
        autoFocus
        component={TextField}
        name="name"
        id="input_policy_name"
        fullWidth
      />
    </div>
    <div data-test-about-section-policy-description>
      <Field
        label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
        name="description"
        component={TextArea}
      />
    </div>
    <hr />
  </div>
);

export default AboutSection;
