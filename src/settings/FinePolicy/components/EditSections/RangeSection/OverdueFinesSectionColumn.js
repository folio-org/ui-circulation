import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

const OverdueFinesSectionColumn = (props) => {
  const {
    label,
    component,
    name,
    intl: { formatMessage }
  } = props;

  return (
    <div>
      <Row>
        <Col xs={3}>
          {label}
        </Col>
      </Row>
      <Row>
        <Col xs={2}>
          <div>
            {component === 'TextField' ?
              <Field
                aria-label={formatMessage({ id: 'ui-circulation.settings.finePolicy.quantity' })}
                name={name}
                type="number"
                hasClearIcon={false}
                component={TextField}
                onBlur={props.onBlurField}
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
  label: PropTypes.object,
  name: PropTypes.string,
  component: PropTypes.string,
  intl: PropTypes.object,
  onBlurField: PropTypes.func,
};


export default OverdueFinesSectionColumn;
