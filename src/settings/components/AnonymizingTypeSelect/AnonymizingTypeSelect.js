import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import {
  Col,
  Row,
  RadioButton,
} from '@folio/stripes/components';

const AnonymizingTypeSelect = ({ name, types }) => {
  return types.map((type, index) => (
    <Row key={`row-${index}`}>
      <Col xs={12}>
        <Field
          data-test-radio-button={type.value}
          component={RadioButton}
          label={type.label}
          name={`closingType.${name}`}
          type="radio"
          id={`${type.value}-${name}-radio-button`}
          value={type.value}
        />
      </Col>
    </Row>
  ));
};

AnonymizingTypeSelect.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AnonymizingTypeSelect;
