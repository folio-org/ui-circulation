import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

export const formatNumber = (value = 0) => {
  return parseFloat(value).toFixed(2);
};

const OverdueFinesSectionColumn = (props) => {
  const {
    label,
    component,
    name,
    intl: { formatMessage },
  } = props;

  return (
    <div>
      <Row data-testid="mainLabelTestId">
        <Col xs={3}>
          {label}
        </Col>
      </Row>
      <Row data-testid="sectionTestId">
        <Col xs={2}>
          <div>
            {component === 'TextField' ?
              <Field
                aria-label={formatMessage({ id: 'ui-circulation.settings.finePolicy.quantity' })}
                name={name}
                type="number"
                hasClearIcon={false}
                component={TextField}
                formatOnBlur
                format={formatNumber}
              />
              :
              <Field
                aria-label={formatMessage({ id: 'ui-circulation.settings.finePolicy.select' })}
                name={name}
                component={Select}
                dataOptions={[
                  { value: true, label: formatMessage({ id: 'ui-circulation.settings.finePolicy.yes' }) },
                  { value: false, label: formatMessage({ id: 'ui-circulation.settings.finePolicy.no' }) },
                ]}
              />}
          </div>
        </Col>
      </Row>
    </div>

  );
};
OverdueFinesSectionColumn.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
  component: PropTypes.string,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default OverdueFinesSectionColumn;
