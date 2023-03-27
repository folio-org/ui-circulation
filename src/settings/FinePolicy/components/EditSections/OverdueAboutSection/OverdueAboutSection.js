import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  TextField,
  TextArea,
} from '@folio/stripes/components';

const OverdueAboutSection = () => (
  <div
    data-test-fine-policy-form-about-section
    data-testid="overdueAboutSection"
  >
    <Row>
      <Col xs={12} data-test-about-section-policy-name>
        <Field
          data-testid="nameTestId"
          label={<FormattedMessage id="ui-circulation.settings.finePolicy.overdueFinePolicyName" />}
          id="input-policy-name"
          name="name"
          autoFocus
          component={TextField}
          required
        />
      </Col>
    </Row>
    <Row>
      <Col xs={12} data-test-about-section-policy-description>
        <Field
          data-testid="descriptionTestId"
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
