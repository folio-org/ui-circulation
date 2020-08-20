import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import { forEach } from 'lodash';

import {
  Col,
  Row,
  IconButton,
  Select,
} from '@folio/stripes/components';

import AnonymizingTypeSelectContainer from '../components/AnonymizingTypeSelect/AnonymizingTypeSelectContainer';
import {
  closingTypes,
  closedLoansRules,
} from '../../constants';

import css from './ExceptionCard.css';

class ExceptionCard extends Component {
  static propTypes = {
    intl: PropTypes.object,
    pathToException: PropTypes.string.isRequired,
    paymentMethods: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    exceptionIndex: PropTypes.number.isRequired,
    onRemoveException: PropTypes.func.isRequired,
  }

  onRemove = () => {
    const {
      exceptionIndex,
      onRemoveException,
    } = this.props;

    onRemoveException(exceptionIndex);
  };

  getPaymentMethodOptions = (intl, config, placeholder) => {
    const options = [];

    options.push(this.getSelectOption('', 'x', intl.formatMessage({ id: placeholder })));

    forEach(config, ({ value, label }) => {
      options.push(this.getSelectOption(value, value, label));
    });

    return options;
  }

  getSelectOption(value, key, label) {
    return (
      <option
        value={value}
        key={key}
      >
        { label }
      </option>
    );
  }

  render() {
    const {
      pathToException,
      paymentMethods,
      intl,
    } = this.props;

    const selectedPayments = this.getPaymentMethodOptions(intl, paymentMethods, 'ui-circulation.settings.loanHistory.selectPaymentMethod');

    return (
      <Row
        className={css.exceptionCard}
        data-test-exception-card
      >
        <Col xs={12}>
          <Row>
            <p className={css.exceptionCardHeader}>
              <FormattedMessage id="ui-circulation.settings.loanHistory.paymentMethodLabel" />
            </p>
            <Col
              xs={11}
              data-test-payment-method-selector
            >
              <Field
                name={`${pathToException}.paymentMethod`}
                component={Select}
              >
                {selectedPayments}
              </Field>
            </Col>
            <Col xs={1}>
              <IconButton
                icon="trash"
                data-test-remove-exception-icon
                onClick={this.onRemove}
              />
            </Col>
          </Row>
          <AnonymizingTypeSelectContainer
            name={closedLoansRules.WITH_FEES_FINES}
            path={pathToException}
            types={closingTypes}
          />
        </Col>
      </Row>
    );
  }
}

export default injectIntl(ExceptionCard);
