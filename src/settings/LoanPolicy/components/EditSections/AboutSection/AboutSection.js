import React from 'react';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

import {
  TextArea,
  TextField,
} from '@folio/stripes/components';

const AboutSection = () => (
  <div
    data-test-loan-policy-form-about-section
    data-testid="aboutSection"
  >
    <h2 data-test-about-section-header>
      <FormattedMessage id="ui-circulation.settings.loanPolicy.about" />
    </h2>
    <div data-test-about-section-policy-name>
      <Field
        data-testid="nameTestId"
        label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyName" />}
        autoFocus
        component={TextField}
        required
        name="name"
        id="input_policy_name"
        fullWidth
      />
    </div>
    <div data-test-about-section-policy-description>
      <Field
        data-testid="descriptionTestId"
        label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
        name="description"
        component={TextArea}
      />
    </div>
    <hr />
  </div>
);

export default AboutSection;
