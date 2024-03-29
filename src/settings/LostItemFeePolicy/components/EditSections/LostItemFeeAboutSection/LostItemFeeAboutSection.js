import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  TextArea,
  TextField,
} from '@folio/stripes/components';

const LostItemFeeAboutSection = () => (
  <div
    data-test-lost-item-fee-policy-form-about-section
    data-testid="lostItemFeeAboutSectionTestId"
  >
    <Row>
      <Col
        xs={12}
        data-test-about-section-policy-name
      >
        <Field
          data-testid="nameTestId"
          label={<FormattedMessage id="ui-circulation.settings.lostItemFee.lostItemFeePolicyName" />}
          component={TextField}
          required
          autoFocus
          name="name"
          id="input-policy-name"
          fullWidth
        />
      </Col>
    </Row>
    <Row>
      <Col
        xs={12}
        data-test-about-section-policy-description
      >
        <Field
          data-testid="descriptionTestId"
          label={<FormattedMessage id="ui-circulation.settings.lostItemFee.description" />}
          name="description"
          component={TextArea}
        />
      </Col>
    </Row>
  </div>
);

export default LostItemFeeAboutSection;
