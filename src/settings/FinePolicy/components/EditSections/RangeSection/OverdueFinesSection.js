import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
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

export const formatNumber = (value = 0) => {
  return parseFloat(value).toFixed(2);
};

const OverdueFinesSection = (props) => {
  const { label, name, period, intervalPeriods, data, intl: { formatMessage } } = props;
  const test = `data-test-quantity-${data}`;

  return (
    <div>
      <Row data-testid="quantityDurationLabelTestId">
        <Col xs={2} data-test-quantity-duration-label>
          {label}
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <div
            data-testid="qoverdueFineQuantityTestId"
            id={test}
          >
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.circulationRules.overdueFine.quantity' })}
              name={name}
              type="number"
              hasClearIcon={false}
              component={TextField}
              formatOnBlur
              format={formatNumber}
            />
          </div>
        </Col>
        <Col>
          <div
            data-testid="finePolicyLabelTestId"
            data-test-quantity-interval-label
          >
            <FormattedMessage id="ui-circulation.settings.finePolicy.per" />
          </div>
        </Col>
        <Col xs={2}>
          <div
            data-testid="overdueFinePeriodTestId"
            data-test-quantity-interval
          >
            <Field
              aria-label={formatMessage({ id: 'ui-circulation.settings.circulationRules.overdueFine.period' })}
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
  intl: PropTypes.object.isRequired,
  label: PropTypes.node,
  name: PropTypes.string,
  period: PropTypes.string,
  data: PropTypes.string,
  intervalPeriods: PropTypes.arrayOf(PropTypes.node),
};

export default injectIntl(OverdueFinesSection);
