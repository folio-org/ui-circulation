import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Checkbox,
  Col,
  InfoPopover,
  Label,
  RadioButton,
  Row,
  Select,
  TextField,
} from '@folio/stripes/components';

import optionsGenerator from '../../../../utils/options-generator';
import Period, {
  transformInputValue,
} from '../../../../components/Period';
import {
  intervalPeriods,
  renewFromOptions,
  ATTEMPT_ON_DUE_DATE,
  ATTEMPT_DAYS_BEFORE,
} from '../../../../../constants';

class RenewalsSection extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    policy: PropTypes.shape({
      isLoanable: PropTypes.func,
      isProfileRolling: PropTypes.func,
      isRenewable: PropTypes.func,
      isDifferentPeriod: PropTypes.func,
      isUnlimitedRenewals: PropTypes.func,
      isProfileFixed: PropTypes.func,
      isAutomaticRenewals: PropTypes.func,
      isDaysBeforeSelected: PropTypes.func,
    }).isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

  handleAutomaticRenewalsChange = (e) => {
    const {
      change,
      policy,
    } = this.props;

    change('renewalsPolicy.automaticRenewal', e.target.checked);

    if (e.target.checked && policy.renewalsPolicy.attemptFirstRenewal !== ATTEMPT_DAYS_BEFORE) {
      change('renewalsPolicy.attemptFirstRenewal', ATTEMPT_ON_DUE_DATE);
    }
  }

  render() {
    const {
      policy,
      schedules,
      change,
      intl,
    } = this.props;

    if (!policy.isLoanable()) {
      return null;
    }

    const altRenewalScheduleLabel = policy.isProfileRolling()
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSDueDateLimit" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSforRenewals" />;

    return (
      <div
        data-test-loan-policy-form-renewals-section
        data-testid="renewals"
      >
        <h2 data-test-renewals-section-header>
          <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
        </h2>
        <div
          data-test-renewals-section-renewable
          data-testid="renewable"
        >
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewable" />}
            name="renewable"
            component={Checkbox}
            type="checkbox"
            id="renewable"
          />
        </div>
        { policy.isRenewable() &&
          <div
            data-test-renewals-section-unlimited-renewals
            data-testid="unlimitedRenewals"
          >
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
              name="renewalsPolicy.unlimited"
              id="renewalsPolicy.unlimited"
              component={Checkbox}
              type="checkbox"
            />
          </div>}
        { policy.isRenewable() && !policy.isUnlimitedRenewals() &&
          <>
            <div
              data-test-renewals-section-num-renewals-allowed
              data-testid="numRenewalsAllowed"
            >
              <Field
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.numRenewalsAllowed" />}
                name="renewalsPolicy.numberAllowed"
                id="input_allowed_renewals"
                component={TextField}
                type="number"
                required
                min={0}
              />
            </div>
          </>}
        { policy.isRenewable() && policy.isProfileRolling() &&
          <>
            <div
              data-test-renewals-section-renew-from
              data-testid="renewFrom"
            >
              <Field
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
                name="renewalsPolicy.renewFromId"
                id="select_renew_from"
                component={Select}
                required
              >
                {this.generateOptions(renewFromOptions, 'ui-circulation.settings.common.pleaseSelect')}
              </Field>
            </div>
          </>}
        { policy.isRenewable() &&
          <div
            data-test-renewals-section-renewal-period-different
            data-testid="renewalPeriodDifferent"
          >
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
              name="renewalsPolicy.differentPeriod"
              id="renewalsPolicy.differentPeriod"
              component={Checkbox}
              type="checkbox"
            />
          </div>}
        { policy.isRenewable() && policy.isDifferentPeriod() && policy.isProfileRolling() &&
          <>
            <br />
            <div
              data-test-renewals-section-alternate-loan-period-renewals
              data-testid="alternateLoanPeriodRenewals"
            >
              <Period
                fieldLabel="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals"
                inputValuePath="renewalsPolicy.period.duration"
                selectValuePath="renewalsPolicy.period.intervalId"
                intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
                changeFormValue={change}
                required
              />
            </div>
          </>}
        { policy.isRenewable() && policy.isDifferentPeriod() &&
          <div
            data-test-renewals-alternate-fixed-due-date-schedule
            data-testid="altFDDS"
          >
            <Field
              label={altRenewalScheduleLabel}
              name="renewalsPolicy.alternateFixedDueDateScheduleId"
              component={Select}
              required={policy.isProfileFixed()}
            >
              {schedules}
            </Field>
          </div>}
        { policy.isRenewable() &&
          <div data-testid="automaticRenewal">
            <Field
              label={
                <>
                  <FormattedMessage id="ui-circulation.settings.loanPolicy.automaticRenewals" />
                  <InfoPopover
                    content={<FormattedMessage id="ui-circulation.settings.loanPolicy.automaticRenewals.infoPopover" />}
                    iconSize="medium"
                  />
                </>
              }
              name="renewalsPolicy.automaticRenewal"
              id="renewalsPolicy.automaticRenewal"
              component={Checkbox}
              type="checkbox"
              onChange={this.handleAutomaticRenewalsChange}
            />
          </div>}
        { policy.isAutomaticRenewals() &&
          <>
            <div data-testid="attemptFirstRenewal">
              <Row>
                <Col xs={12}>
                  <Label required id="attempt-first-renewal-label">
                    <FormattedMessage id="ui-circulation.settings.loanPolicy.attemptFirstRenewal" />
                  </Label>
                </Col>
              </Row>
              <fieldset aria-labelledby="attempt-first-renewal-label">
                <Row>
                  <Col xs={12}>
                    <Field
                      label={<FormattedMessage id="ui-circulation.settings.loanPolicy.attemptFirstRenewal.onDueDate" />}
                      name="renewalsPolicy.attemptFirstRenewal"
                      component={RadioButton}
                      type="radio"
                      id="attemptFirstRenewal.onDueDate"
                      value={ATTEMPT_ON_DUE_DATE}
                    />
                  </Col>
                </Row>
                <Row
                  role="presentation"
                  onClick={() => change('renewalsPolicy.attemptFirstRenewal', ATTEMPT_DAYS_BEFORE)}
                >
                  <Col xs="auto" style={{ maxWidth: '10px' }}>
                    <Field
                      name="renewalsPolicy.attemptFirstRenewal"
                      component={RadioButton}
                      type="radio"
                      id="attemptFirstRenewal.daysBefore"
                      value={ATTEMPT_DAYS_BEFORE}
                      aria-label={intl.formatMessage({ id: 'ui-circulation.settings.loanPolicy.attemptFirstRenewal.daysBefore' })}
                    />
                  </Col>
                  <Col xs={2}>
                    <Field
                      name="renewalsPolicy.daysBefore"
                      component={TextField}
                      type="number"
                      min={1}
                      max={100}
                      parse={transformInputValue}
                      required={policy.isDaysBeforeSelected()}
                      aria-label={intl.formatMessage({ id: 'ui-circulation.settings.loanPolicy.attemptFirstRenewal.daysBefore' })}
                    />
                  </Col>
                  <Col xs={9}>
                    <strong>
                      <FormattedMessage id="ui-circulation.settings.loanPolicy.attemptFirstRenewal.daysBefore" />
                    </strong>
                  </Col>
                </Row>
              </fieldset>
            </div>
            <div data-testid="attemptAdditionalRetries">
              <Row>
                <Col xs={12}>
                  <Label htmlFor="automaticRenewalRetryPeriodInDays">
                    <FormattedMessage id="ui-circulation.settings.loanPolicy.attemptAdditionalRetries" />
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col xs={2}>
                  <Field
                    id="automaticRenewalRetryPeriodInDays"
                    name="renewalsPolicy.automaticRenewalRetryPeriodInDays"
                    component={TextField}
                    type="number"
                    min={0}
                    max={100}
                    parse={transformInputValue}
                  />
                </Col>
                <Col xs={10}>
                  <strong>
                    <FormattedMessage id="ui-circulation.settings.loanPolicy.days" />
                  </strong>
                </Col>
              </Row>
            </div>
          </>}
        <hr />
      </div>
    );
  }
}

export default injectIntl(RenewalsSection);
