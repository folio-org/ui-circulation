import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import {
  Col,
  Row,
  RadioButton,
} from '@folio/stripes/components';

const AnonymizingTypeSelect = ({ name, types, disabled }) => {
  return types.map((type, index) => (
    <Row
      key={`row-${index}`}
      data-testid="anonymizingTypeRowTestId"
    >
      <Col xs={12}>
        <Field
          data-test-radio-button
          component={RadioButton}
          label={type.label}
          name={`closingType.${name}`}
          type="radio"
          id={`${type.value}-${name}-radio-button`}
          value={type.value}
          disabled={disabled}
        />
        {type.details}
      </Col>
    </Row>
  ));
};

AnonymizingTypeSelect.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    details: PropTypes.node,
  })).isRequired,
};

export default AnonymizingTypeSelect;
