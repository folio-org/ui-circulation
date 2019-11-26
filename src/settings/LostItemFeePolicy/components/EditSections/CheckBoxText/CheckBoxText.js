import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  FormattedMessage,
} from 'react-intl';

import {
  Col,
  RadioButton,
  Row,
  TextField,
} from '@folio/stripes/components';

import css from './LostItem.css';

const CheckBoxText = (props) => (
  <div>
    <Row>
      <Col xs={2}>
        <FormattedMessage id="ui-circulation.settings.lostItemFee.chargeAmountItem" />
      </Col>
    </Row>
    <Row>
      <div data-test-charge-type-actual className={css.col}>
        <Field
          label={<FormattedMessage
            id="ui-circulation.settings.lostItemFee.actualCost"
          />}
          name="chargeAmountItem.chargeType"
          component={RadioButton}
          value="actualCost"
          type="radio"
        />
      </div>

    </Row>
    <Row>
      <div className={css.periodContainer}>
        <div data-test-charge-type-another className={css.col}>
          <Field
            name="chargeAmountItem.chargeType"
            component={RadioButton}
            value="anotherCost"
            type="radio"
          />
        </div>
        <div data-test-charge-amount className={css.col}>
          <Field
            name="chargeAmountItem.amount"
            onBlur={props.onBlur}
            component={TextField}
          />
        </div>
      </div>
    </Row>
  </div>);

CheckBoxText.propTypes = {
  onBlur: PropTypes.func,
};

export default CheckBoxText;
