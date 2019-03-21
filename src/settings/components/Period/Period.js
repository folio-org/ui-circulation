import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import {
  isEmpty,
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
    inputValuePath: PropTypes.string.isRequired,
    selectValuePath: PropTypes.string.isRequired,
    intervalPeriods: PropTypes.arrayOf(PropTypes.node).isRequired,
    required: PropTypes.bool,
    inputSize: PropTypes.number,
    selectSize: PropTypes.number,
    fieldLabel: PropTypes.string,
    selectPlaceholder: PropTypes.string,
    changeFormValue: PropTypes.func,
  };

  static defaultProps = {
    required: false,
    inputSize: 2,
    selectSize: 2,
    fieldLabel: '',
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

  render() {
    const {
      fieldLabel,
      inputValuePath,
      selectValuePath,
      intervalPeriods,
      selectPlaceholder,
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
                placeholder={selectPlaceholder ? <FormattedMessage id={selectPlaceholder} /> : ''}
              >
                {intervalPeriods}
              </Field>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Period;
