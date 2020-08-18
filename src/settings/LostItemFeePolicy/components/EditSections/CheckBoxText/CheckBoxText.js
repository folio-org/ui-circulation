import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { FormattedMessage } from 'react-intl';

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
      <div
        data-test-charge-type-actual
        className={css.col}
      >
        <Field
          label={<FormattedMessage id="ui-circulation.settings.lostItemFee.actualCost" />}
          name="chargeAmountItem.chargeType"
          component={RadioButton}
          value="actualCost"
          type="radio"
        />
      </div>
    </Row>
    <Row>
      <div className={css.periodContainer}>
        <div
          data-test-charge-type-another
          className={css.col}
        >
          <Field
            label={<FormattedMessage id="ui-circulation.settings.lostItemFee.setCost" />}
            name="chargeAmountItem.chargeType"
            component={RadioButton}
            value="anotherCost"
            type="radio"
          />
        </div>
        <div
          data-test-charge-amount
          className={css.col}
        >
          <Field
            aria-label={props.intl.formatMessage({ id: 'ui-circulation.settings.lostItemFee.chargeAmount' })}
            name="chargeAmountItem.amount"
            component={TextField}
            type="number"
            formatOnBlur
            format={props.onBlur}
          />
        </div>
      </div>
    </Row>
  </div>);

CheckBoxText.propTypes = {
  intl: PropTypes.object.isRequired,
  onBlur: PropTypes.func,
};

export default injectIntl(CheckBoxText);
