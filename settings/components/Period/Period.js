import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Field } from 'redux-form';
import { isEmpty } from 'lodash';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import css from './Period.css';

class Period extends React.Component {
  static propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    selectPlaceholder: PropTypes.string.isRequired,
    inputValuePath: PropTypes.string.isRequired,
    selectValuePath: PropTypes.string.isRequired,
    intervalPeriods: PropTypes.arrayOf(PropTypes.object).isRequired,
    changeFormValue: PropTypes.func.isRequired,
  };

  onInputClear = () => {
    const {
      inputValuePath,
      changeFormValue,
    } = this.props;

    changeFormValue(inputValuePath, '');
  };

  transformInputValue = (value) => {
    if (isEmpty(value)) {
      return '';
    }

    return Number(value);
  };

  generateOptions = () => {
    const {
      intervalPeriods,
      selectValuePath,
    } = this.props;

    return intervalPeriods.map(({ value, label }) => (
      <option value={value} key={`${selectValuePath}-${value}`}>
        {label}
      </option>
    ));
  };

  render() {
    const {
      fieldLabel,
      selectPlaceholder,
      inputValuePath,
      selectValuePath,
    } = this.props;

    return (
      <React.Fragment>
        <Row className={css.label}>
          <Col xs={12}>
            <FormattedMessage id={fieldLabel} />
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <Field
              type="number"
              name={inputValuePath}
              component={TextField}
              onClearField={this.onInputClear}
              parse={this.transformInputValue}
            />
          </Col>
          <Col xs={2}>
            <FormattedMessage id={selectPlaceholder}>
              {placeholder => (
                <Field
                  name={selectValuePath}
                  component={Select}
                  placeholder={placeholder}
                >
                  {this.generateOptions()}
                </Field>
              )}
            </FormattedMessage>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Period;
