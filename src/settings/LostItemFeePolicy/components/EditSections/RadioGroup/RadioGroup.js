import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import {
  Col,
  Label,
  RadioButton,
  Row,
  TextField,
} from '@folio/stripes/components';

const RadioGroup = (props) => (
  <Row>
    <Col xs={4}>
      <Row>
        <Col xs={6}>
          <Label
            htmlFor="chargeAmount"
            id="chargeAmount-label"
          >
            <FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItem" />
          </Label>
        </Col>
      </Row>
      <Row>
        <Col
          xs={3}
          data-test-charge-type-actual
        >
          <Field
            label={<FormattedMessage id="ui-circulation.settings.lostItemFee.actualCost" />}
            name="chargeAmountItem.chargeType"
            component={RadioButton}
            id="chargeAmount"
            value="actualCost"
            type="radio"
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={2}
          data-test-charge-type-another
        >
          <Field
            label={<FormattedMessage id="ui-circulation.settings.lostItemFee.setCost" />}
            name="chargeAmountItem.chargeType"
            component={RadioButton}
            value="anotherCost"
            type="radio"
          />
        </Col>
        <Col
          xs={6}
          data-test-charge-amount
        >
          <Field
            aria-label={props.intl.formatMessage({ id: 'ui-circulation.settings.lostItemFee.chargeAmount' })}
            name="chargeAmountItem.amount"
            component={TextField}
            type="number"
            formatOnBlur
            format={props.onBlur}
          />
        </Col>
      </Row>
    </Col>
  </Row>
);

RadioGroup.propTypes = {
  intl: PropTypes.object.isRequired,
  onBlur: PropTypes.func,
};

export default injectIntl(RadioGroup);
