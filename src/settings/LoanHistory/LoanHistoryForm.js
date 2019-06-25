import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import {
  Field,
  getFormValues,
} from 'redux-form';
import { camelCase } from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  Headline,
} from '@folio/stripes/components';

import {
  Period,
  RadioButtons,
} from '../components';
import optionsGenerator from '../utils/options-generator';
import {
  closingTypes,
  closingTypesMap,
  intervalPeriods,
  closedLoansRules,
} from '../../constants';

import css from './LoanHistoryForm.css';

class LoanHistoryForm extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    initialValues: PropTypes.oneOfType([PropTypes.array]),
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);

    // eslint-disable-next-line react/no-unused-state
    this.state = { checked: false };
    this.generateOptions = optionsGenerator.bind(null, props.intl.formatMessage);
    this.selectedPeriods = intervalPeriods.filter(period => props.initialValues.selectedPeriodsValues.includes(period.value));
  }

  onSave = data => this.props.onSubmit({ loan_history: JSON.stringify(data) });

  getLastMenu = () => {
    const {
      pristine,
      submitting,
    } = this.props;

    return (
      <Button
        data-test-loan-history-save-button
        type="submit"
        disabled={pristine || submitting}
        marginBottom0
      >
        <FormattedMessage id="stripes-core.button.save" />
      </Button>
    );
  }

  toggleCheckbox = () => {
    this.setState(({ checked }) => ({
      // eslint-disable-next-line react/no-unused-state
      checked: !checked
    }));
  }

  getCurrentValues() {
    const { store } = this.props.stripes;
    const state = store.getState();

    return getFormValues('loanHistoryForm')(state) || {};
  }

  renderPeriod(name) {
    return (
      <div
        data-test-period-section
        className={css.periodContainer}
      >
        <Period
          inputValuePath={`${name}.duration`}
          selectValuePath={`${name}.intervalId`}
          intervalPeriods={this.generateOptions(this.selectedPeriods, 'ui-circulation.settings.loanHistory.selectInterval')}
          inputSize={4}
          selectSize={7}
        />
        <div>
          <FormattedMessage
            id="ui-circulation.settings.loanHistory.after"
            values={{ name: <FormattedMessage id={`ui-circulation.settings.loanHistory.${camelCase(name)}`} /> }}
          />
        </div>
      </div>
    );
  }

  getClosingTypes(name) {
    const updatedType = {
      label: this.renderPeriod(name),
      value: closingTypesMap.INTERVAL,
    };

    return closingTypes.map(type => (type.value === updatedType.value ? updatedType : type));
  }

  render() {
    const {
      handleSubmit,
      label,
    } = this.props;

    const loanHistoryValues = this.getCurrentValues();

    return (
      <form
        id="loan-history-form"
        onSubmit={handleSubmit(this.onSave)}
      >
        <Pane
          defaultWidth="fill"
          fluidContentWidth
          paneTitle={label}
          lastMenu={this.getLastMenu()}
        >
          <div data-test-closed-loans>
            <Headline
              size="large"
              margin="xx-large"
              tag="h5"
            >
              <FormattedMessage id="ui-circulation.settings.loanHistory.closedLoans" />
            </Headline>
            <FormattedMessage
              tagName="p"
              id="ui-circulation.settings.loanHistory.anonymize"
            />
            <RadioButtons
              name={closedLoansRules.DEFAULT}
              types={this.getClosingTypes(closedLoansRules.DEFAULT)}
            />
          </div>
          <br />
          <Row>
            <Col xs={12}>
              <Field
                label={<FormattedMessage id="ui-circulation.settings.loanHistory.treat" />}
                id="treatEnabled-checkbox"
                name="treatEnabled"
                component={Checkbox}
                type="checkbox"
                onChange={this.toggleCheckbox}
                normalize={value => !!value}
              />
            </Col>
          </Row>
          <br />
          {loanHistoryValues.treatEnabled &&
            <div data-test-closed-loans-feefine>
              <Headline
                size="large"
                margin="xx-large"
                tag="h5"
              >
                <FormattedMessage id="ui-circulation.settings.loanHistory.closedLoansFeesFines" />
              </Headline>
              <FormattedMessage
                tagName="p"
                id="ui-circulation.settings.loanHistory.anonymizeFeesFines"
              />
              <RadioButtons
                name={closedLoansRules.WITH_FEES_FINES}
                types={this.getClosingTypes(closedLoansRules.WITH_FEES_FINES)}
              />
            </div>
          }
        </Pane>
      </form>
    );
  }
}

export default injectIntl(
  stripesForm({
    form: 'loanHistoryForm',
    navigationCheck: true,
    enableReinitialize: true,
  })(LoanHistoryForm)
);
