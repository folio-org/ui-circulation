import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import setFieldData from 'final-form-set-field-data';
import { isEqual } from 'lodash';

import stripesFinalForm from '@folio/stripes/final-form';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  Headline,
  PaneFooter,
} from '@folio/stripes/components';

import AnonymizingTypeSelectContainer from '../components/AnonymizingTypeSelect/AnonymizingTypeSelectContainer';
import ExceptionsList from './ExceptionsList';
import {
  closingTypes,
  closedLoansRules,
} from '../../constants';
import { LoanHistory as validateLoanHistorySettings } from '../Validation';

import css from './LoanHistoryForm.css';

class LoanHistoryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    stripes: PropTypes.object,
    submitting: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    form: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
  };

  renderFooter = () => {
    const {
      pristine,
      stripes,
      submitting,
    } = this.props;

    return (
      <PaneFooter
        renderEnd={(
          <Button
            data-testid="submitButton"
            data-test-loan-history-save-button
            type="submit"
            buttonStyle="primary paneHeaderNewButton"
            disabled={pristine || submitting || !stripes?.user?.perms?.['ui-circulation.settings.edit-loan-history']}
            marginBottom0
          >
            <FormattedMessage id="stripes-core.button.save" />
          </Button>
        )}
      />
    );
  }

  render() {
    const {
      handleSubmit,
      label,
      form: { getState },
      intl: {
        formatMessage,
      },
    } = this.props;

    const { values: loanHistoryValues } = getState();

    return (
      <form
        data-testid="form"
        id="loan-history-form"
        className={css.loanHistoryForm}
        noValidate
        onSubmit={handleSubmit}
      >
        <Pane
          id="loan-history-pane"
          defaultWidth="fill"
          fluidContentWidth
          paneTitle={label}
          footer={this.renderFooter()}
        >
          <div
            data-testid="closedLoans"
            data-test-closed-loans
          >
            <Headline
              data-testid="closedLoansHeadline"
              size="large"
              margin="xx-large"
              tag="h3"
            >
              <FormattedMessage id="ui-circulation.settings.loanHistory.closedLoans" />
            </Headline>
            <FormattedMessage
              tagName="p"
              id="ui-circulation.settings.loanHistory.anonymize"
            />
            <AnonymizingTypeSelectContainer
              name={closedLoansRules.DEFAULT}
              path={closedLoansRules.DEFAULT}
              types={closingTypes}
            />
          </div>
          <br />
          <Row>
            <Col xs={12}>
              <Field
                name="treatEnabled"
                type="checkbox"
                id="treatEnabled-checkbox"
                component={Checkbox}
                label={formatMessage({ id: 'ui-circulation.settings.loanHistory.treat' })}
              />
            </Col>
          </Row>
          <br />
          {loanHistoryValues.treatEnabled &&
            <div
              data-testid="loansFeefineSection"
              data-test-closed-loans-feefine
            >
              <Headline
                data-testid="closedLoansFeesFinesHeadline"
                size="large"
                margin="xx-large"
                tag="h3"
              >
                <FormattedMessage id="ui-circulation.settings.loanHistory.closedLoansFeesFines" />
              </Headline>
              <FormattedMessage
                tagName="p"
                id="ui-circulation.settings.loanHistory.anonymizeFeesFines"
              />
              <AnonymizingTypeSelectContainer
                name={closedLoansRules.WITH_FEES_FINES}
                path={closedLoansRules.WITH_FEES_FINES}
                types={closingTypes}
              />
              <FieldArray
                name="loanExceptions"
                component={ExceptionsList}
              />
            </div>}
        </Pane>
      </form>
    );
  }
}

export default injectIntl(stripesFinalForm({
  initialValuesEqual: (a, b) => isEqual(a, b),
  navigationCheck: true,
  validate: validateLoanHistorySettings,
  subscription: { values: true },
  mutators: { setFieldData }
})(LoanHistoryForm));
