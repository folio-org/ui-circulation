import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

const OverdueFinesSection = (props) => {
  const { label, name, period, intervalPeriods, onBlurField, data } = props;
  const test = `data-test-quantity-${data}`;
  return (
    <div>
      <Row>
        <Col xs={2} data-test-quantity-duration-label>
          {label}
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <div id={test}>
            <Field
              name={name}
              type="number"
              hasClearIcon={false}
              component={TextField}
              onBlur={onBlurField}
            />
          </div>
        </Col>
        <Col>
          <div data-test-quantity-interval-label>
            {<FormattedMessage id="ui-circulation.settings.finePolicy.per" />}
          </div>
        </Col>
        <Col xs={2}>
          <div data-test-quantity-interval>
            <Field
              name={period}
              component={Select}
            >
              {intervalPeriods}
            </Field>
          </div>
        </Col>
      </Row>
    </div>

  );
};
OverdueFinesSection.propTypes = {
  label: PropTypes.object,
  name: PropTypes.string,
  period: PropTypes.string,
  data: PropTypes.string,
  intervalPeriods: PropTypes.arrayOf(PropTypes.node),
  onBlurField: PropTypes.func,
};

export default injectIntl(OverdueFinesSection);
