import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  TextArea,
  TextField,
} from '@folio/stripes/components';

const AboutSection = () => (
  <Fragment>
    <h2>
      <FormattedMessage id="ui-circulation.settings.loanPolicy.about" />
    </h2>
    <Field
      label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyName" />}
      autoFocus
      component={TextField}
      name="name"
      id="input_policy_name"
      fullWidth
    />
    <Field
      label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
      name="description"
      component={TextArea}
    />
    <hr />
  </Fragment>
);

export default AboutSection;
