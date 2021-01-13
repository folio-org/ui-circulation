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
  <div data-test-lost-item-fee-policy-form-about-section>
    <Row>
      <Col
        xs={3}
        data-test-about-section-policy-name
      >
        <Field
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
        xs={5}
        data-test-about-section-policy-description
      >
        <Field
          label={<FormattedMessage id="ui-circulation.settings.lostItemFee.description" />}
          name="description"
          component={TextArea}
        />
      </Col>
    </Row>
  </div>
);

export default LostItemFeeAboutSection;
