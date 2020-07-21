import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import {
  isEmpty,
  noop,
} from 'lodash';

import {
  Col,
  Label,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

/**
 * This component was copied here in order to support react-final-form behavior.
 * Will be removed when other entities will use react-final-form and we will be able use common component for all entities.
 * */
class Period extends PureComponent {
  static propTypes = {
    intl: PropTypes.object,
    inputValuePath: PropTypes.string.isRequired,
    selectValuePath: PropTypes.string.isRequired,
    intervalPeriods: PropTypes.arrayOf(PropTypes.node).isRequired,
    required: PropTypes.bool,
    inputSize: PropTypes.number,
    selectSize: PropTypes.number,
    fieldLabel: PropTypes.string,
    selectPlaceholder: PropTypes.string,
    changeFormValue: PropTypes.func,
    intervalPeriodsSuffix: PropTypes.string,
  };

  static defaultProps = {
    required: false,
    inputSize: 2,
    selectSize: 2,
    fieldLabel: '',
    selectPlaceholder: '',
    changeFormValue: noop,
    intervalPeriodsSuffix: '',
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
      intervalPeriodsSuffix,
      intl: {
        formatMessage,
      }
    } = this.props;

    return (
      <>
        {fieldLabel && (
          <div data-test-period-label>
            <Row>
              <Col xs={12}>
                { fieldLabel && (
                  <Label required={required}>
                    <FormattedMessage id={fieldLabel} />
                  </Label>
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
                required={required}
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
                required={required}
                placeholder={isEmpty(selectPlaceholder) ? '' : formatMessage({ id: selectPlaceholder })}
              >
                {intervalPeriods}
              </Field>
            </div>
          </Col>
          { intervalPeriodsSuffix && (
            <Col xs={selectSize}>
              <div data-test-period-interval-suffix>
                <Label>
                  <FormattedMessage id={intervalPeriodsSuffix} />
                </Label>
              </div>
            </Col>
          )}
        </Row>
      </>
    );
  }
}

export default injectIntl(Period);
