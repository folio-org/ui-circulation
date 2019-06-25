import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Col,
  Row,
  RadioButton,
} from '@folio/stripes/components';

const RadioButtons = ({ name, types }) => {
  return types.map((type, index) => (
    <Row key={`row-${index}`}>
      <Col xs={12}>
        <Field
          data-test-radio-button={type.value}
          component={RadioButton}
          label={
            <FormattedMessage
              id={type.label}
              values={{ name }}
            />
          }
          name={`closingType.${name}`}
          type="radio"
          id={`${type.value}-${name.replace('/', '')}-radio-button`}
          value={type.value}
        />
      </Col>
    </Row>
  ));
};

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RadioButtons;
