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

export const transformInputValue = (value) => {
  if (isEmpty(value)) {
    return '';
  }

  return Number(value);
};

class Period extends PureComponent {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    inputValuePath: PropTypes.string.isRequired,
    selectValuePath: PropTypes.string.isRequired,
    intervalPeriods: PropTypes.arrayOf(PropTypes.node).isRequired,
    required: PropTypes.bool,
    inputSize: PropTypes.number,
    selectSize: PropTypes.number,
    fieldLabel: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    selectPlaceholder: PropTypes.string,
    changeFormValue: PropTypes.func,
    intervalPeriodsSuffix: PropTypes.string,
  };

  static defaultProps = {
    required: false,
    inputSize: 2,
    selectSize: 2,
    fieldLabel: '',
    inputPlaceholder: '',
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

  render() {
    const {
      fieldLabel,
      inputValuePath,
      selectValuePath,
      intervalPeriods,
      inputPlaceholder,
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
          <div
            data-test-period-label
            data-testid="periodLabelSection"
          >
            <Row>
              <Col xs={12}>
                <Label required={required}>
                  <FormattedMessage id={fieldLabel} />
                </Label>
              </Col>
            </Row>
          </div>
        )}
        <Row>
          <Col
            data-testid="finePolicyDurationColumn"
            xs={inputSize}
          >
            <div data-test-period-duration>
              <Field
                aria-label={formatMessage({ id: 'ui-circulation.settings.finePolicy.duration' })}
                type="number"
                required={required}
                name={inputValuePath}
                component={TextField}
                onClearField={this.onInputClear}
                parse={transformInputValue}
                placeholder={inputPlaceholder}
              />
            </div>
          </Col>
          <Col
            data-testid="finePolicyIntervalColumn"
            xs={selectSize}
          >
            <div data-test-period-interval>
              <Field
                aria-label={formatMessage({ id: 'ui-circulation.settings.finePolicy.interval' })}
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
            <Col
              data-testid="periodIntervalColumn"
              xs={selectSize}
            >
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
