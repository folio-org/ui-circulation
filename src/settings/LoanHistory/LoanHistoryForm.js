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

import {
  IfPermission,
} from '@folio/stripes/core';
import stripesFinalForm from '@folio/stripes/final-form';
import {
  Button,
  Checkbox,
  Col,
  Pane,
  Row,
  Headline,
  InfoPopover,
  Layout,
  PaneFooter,
} from '@folio/stripes/components';

import AnonymizingTypeSelectContainer from '../components/AnonymizingTypeSelect/AnonymizingTypeSelectContainer';
import ExceptionsList from './ExceptionsList';
import {
  closingTypes,
  CLOSING_TYPES_WITH_FEES_FINES,
  closedLoansRules,
  USER_SPECIFIC_CLOSING_TYPES,
  USER_SPECIFIC_RULE,
} from '../../constants';
import { LoanHistory as validateLoanHistorySettings } from '../Validation';

import css from './LoanHistoryForm.css';

class LoanHistoryForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    form: PropTypes.shape({
      getState: PropTypes.func.isRequired,
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  renderFooter = () => {
    const {
      pristine,
      submitting,
    } = this.props;

    return (
      <IfPermission perm="ui-circulation.settings.edit-loan-history">
        <PaneFooter
          renderEnd={(
            <Button
              data-testid="submitButton"
              data-test-loan-history-save-button
              type="submit"
              buttonStyle="primary paneHeaderNewButton"
              disabled={pristine || submitting}
              marginBottom0
            >
              <FormattedMessage id="stripes-core.button.save" />
            </Button>
          )}
        />
      </IfPermission>
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
          <Layout
            data-testid="closedLoans"
            data-test-closed-loans
            className="padding-bottom-gutter"
          >
            <Headline
              data-testid="closedLoansHeadline"
              size="large"
              margin="xx-small"
              tag="h3"
            >
              <FormattedMessage id="ui-circulation.settings.loanHistory.libraryPolicy" />
            </Headline>
            <AnonymizingTypeSelectContainer
              label="ui-circulation.settings.loanHistory.anonymize"
              name={closedLoansRules.DEFAULT}
              path={closedLoansRules.DEFAULT}
              types={closingTypes}
            />
          </Layout>
          <hr />
          <Layout
            data-testid="userSpecificSection"
            className="padding-bottom-gutter"
          >
            <Headline
              data-testid="userSpecificHeadline"
              size="large"
              margin="xx-small"
              tag="h3"
            >
              <FormattedMessage id="ui-circulation.settings.loanHistory.userSpecific" />
              <InfoPopover
                content={<FormattedMessage id="ui-circulation.settings.loanHistory.userSpecific.infoPopover" />}
              />
            </Headline>
            <AnonymizingTypeSelectContainer
              label="ui-circulation.settings.loanHistory.userSpecific.anonymize"
              name={closedLoansRules.DEFAULT}
              path={USER_SPECIFIC_RULE}
              types={USER_SPECIFIC_CLOSING_TYPES}
            />
          </Layout>
          <hr />
          <div
            data-testid="loansFeefineSection"
            data-test-closed-loans-feefine
          >
            <Headline
              data-testid="closedLoansFeesFinesHeadline"
              size="large"
              margin="xx-small"
              tag="h3"
            >
              <FormattedMessage id="ui-circulation.settings.loanHistory.feeFinePolicy" />
              <InfoPopover
                content={<FormattedMessage id="ui-circulation.settings.loanHistory.feeFinePolicy.infoPopover" />}
              />
            </Headline>
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
            <Layout className="marginTopHalf">
              <AnonymizingTypeSelectContainer
                label="ui-circulation.settings.loanHistory.anonymizeFeesFines"
                name={closedLoansRules.WITH_FEES_FINES}
                path={closedLoansRules.WITH_FEES_FINES}
                types={CLOSING_TYPES_WITH_FEES_FINES}
                disabled={!loanHistoryValues.treatEnabled}
              />
            </Layout>
            <FieldArray
              name="loanExceptions"
              component={ExceptionsList}
              disabled={!loanHistoryValues.treatEnabled}
            />
          </div>
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
