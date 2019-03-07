import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  intlShape,
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import {
  isEmpty,
  isString,
  noop,
} from 'lodash';

import {
  Col,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import css from './Period.css';

class Period extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    inputValuePath: PropTypes.string.isRequired,
    selectValuePath: PropTypes.string.isRequired,
    intervalPeriods: PropTypes.arrayOf(PropTypes.object).isRequired,
    required: PropTypes.bool,
    emptySelectPlaceholder: PropTypes.bool,
    inputSize: PropTypes.number,
    selectSize: PropTypes.number,
    fieldLabel: PropTypes.string,
    selectPlaceholder: PropTypes.string,
    inputPlaceholder: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    changeFormValue: PropTypes.func,
  };

  static defaultProps = {
    required: false,
    emptySelectPlaceholder: false,
    inputSize: 2,
    selectSize: 2,
    fieldLabel: '',
    inputPlaceholder: '',
    selectPlaceholder: '',
    changeFormValue: noop,
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

  getPlaceholder = (value) => {
    const { intl } = this.props;

    if (!isString(value)) {
      return value;
    }

    if (isEmpty(value)) {
      return '';
    }

    return intl.formatMessage({ id: value });
  };

  getSelectPlaceholder = () => {
    const {
      selectPlaceholder,
      emptySelectPlaceholder,
    } = this.props;

    if (emptySelectPlaceholder) {
      return ' ';
    }

    return this.getPlaceholder(selectPlaceholder);
  };

  render() {
    const {
      fieldLabel,
      inputPlaceholder,
      inputValuePath,
      selectValuePath,
      intervalPeriods,
      required,
      inputSize,
      selectSize,
    } = this.props;

    return (
      <React.Fragment>
        {fieldLabel && (
          <div data-test-period-label>
            <Row className={css.label}>
              <Col xs={12}>
                { fieldLabel && (
                  <FormattedMessage id={fieldLabel}>
                    {message => (required ? `${message} *` : message)}
                  </FormattedMessage>
                )}
              </Col>
            </Row>
          </div>
        )}
        <Row>
          <Col xs={inputSize}>
            <div data-test-period-duration>
              <Field
                type="number"
                name={inputValuePath}
                component={TextField}
                placeholder={this.getPlaceholder(inputPlaceholder)}
                onClearField={this.onInputClear}
                parse={this.transformInputValue}
              />
            </div>
          </Col>
          <Col xs={selectSize}>
            <div data-test-period-interval>
              <Field
                name={selectValuePath}
                component={Select}
                placeholder={this.getSelectPlaceholder()}
                dataOptions={intervalPeriods}
              />
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectIntl(Period);
