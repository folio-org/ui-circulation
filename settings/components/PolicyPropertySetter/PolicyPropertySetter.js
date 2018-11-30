import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import generalStyles from './PolicyPropertySetter.css';

const PolicyPropertySetter = ({
  loanHeader,
  textFieldId,
  textFieldName,
  selectFieldId,
  selectFieldName,
  intervalPeriods,
  validator,
  loansPolicyNamespace,
  loanHeaderNamespace,
  durationDescriptor,
  timeIntervalsUnitsDescriptor,
  minInputValue,
}) => (
  <Fragment>
    <Row className={generalStyles.label}>
      <Col xs={12}>
        <FormattedMessage id={`${loanHeaderNamespace}.${loanHeader}`} />
      </Col>
    </Row>
    <Row>
      <Col xs={1}>
        <Field
          label=""
          id={textFieldId}
          name={`${loansPolicyNamespace}.${textFieldName}.${durationDescriptor}`}
          type="number"
          min={minInputValue}
          component={TextField}
          validate={validator}
        />
      </Col>
      <Col xs={2}>
        <FormattedMessage id="ui-circulation.settings.loanPolicy.selectInterval">
          {placeholder => (
            <Field
              label=""
              id={selectFieldId}
              name={`${loansPolicyNamespace}.${selectFieldName}.${timeIntervalsUnitsDescriptor}`}
              component={Select}
              placeholder={placeholder}
              validate={validator}
            >
              {intervalPeriods}
            </Field>
          )}
        </FormattedMessage>
      </Col>
    </Row>
  </Fragment>
);

PolicyPropertySetter.propTypes = {
  loanHeader: PropTypes.string.isRequired,
  textFieldId: PropTypes.string.isRequired,
  textFieldName: PropTypes.string.isRequired,
  selectFieldId: PropTypes.string.isRequired,
  selectFieldName: PropTypes.string.isRequired,
  intervalPeriods: PropTypes.arrayOf(PropTypes.string).isRequired,
  validator: PropTypes.func.isRequired,
  loansPolicyNamespace: PropTypes.string,
  durationDescriptor: PropTypes.string,
  timeIntervalsUnitsDescriptor: PropTypes.string,
  loanHeaderNamespace: PropTypes.string,
  minInputValue: PropTypes.number,
};

// Default string identifiers to set namespaces
PolicyPropertySetter.defaultProps = {
  loansPolicyNamespace: 'loansPolicy',
  durationDescriptor: 'duration',
  timeIntervalsUnitsDescriptor: 'intervalId',
  loanHeaderNamespace: 'ui-circulation.settings.loanPolicy',
  minInputValue: 1,
};

export default PolicyPropertySetter;
