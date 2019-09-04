import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Col,
  Row,
  TextField,
  TextArea,
} from '@folio/stripes/components';

const OverdueAboutSection = () => (
  <div data-test-fine-policy-form-about-section>
    <Row>
      <Col xs={3} data-test-about-section-policy-name>
        <Field
          label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFinePolicyName" />}
          id="input-policy-name"
          name="name"
          component={TextField}
          required
        />
      </Col>
    </Row>
    <Row>
      <Col xs={5} data-test-about-section-policy-description>
        <Field
          label={<FormattedMessage id="ui-circulation.settings.finePolicy.description" />}
          id="description"
          name="description"
          component={TextArea}
        />
      </Col>
    </Row>
  </div>
);

export default OverdueAboutSection;
