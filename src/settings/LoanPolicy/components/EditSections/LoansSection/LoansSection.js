import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
  injectIntl,
  FormattedMessage,
} from 'react-intl';

import {
  Checkbox,
  Select,
  TextField,
  Row,
  Col,
} from '@folio/stripes/components';

import Period from '../../../../components/Period';
import {
  loanProfileTypes,
  intervalPeriods,
  shortTermLoansOptions,
  longTermLoansOptions,
} from '../../../../../constants';

import optionsGenerator from '../../../../utils/options-generator';

class LoansSection extends React.Component {
  static propTypes = {
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    policy: PropTypes.shape({
      isProfileRolling: PropTypes.func,
      isShortTermLoan: PropTypes.func,
      isLoanable: PropTypes.func,
      isProfileFixed: PropTypes.func,
      isOpeningTimeOffsetActive: PropTypes.func,
      loansPolicy: PropTypes.shape({
        closedLibraryDueDateManagementId: PropTypes.string,
      }),
    }).isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

  componentDidUpdate(prevProps) {
    const { policy } = prevProps;
    this.setDueDateManagementSelectedId(policy);
  }

  setDueDateManagementSelectedId(prevPolicy) {
    const {
      policy,
      change,
    } = this.props;

    const pathToField = 'loansPolicy.closedLibraryDueDateManagementId';
    const selectedId = get(policy, pathToField);
    const prevSelectedId = get(prevPolicy, pathToField);

    if (selectedId !== prevSelectedId) {
      change(pathToField, selectedId);
    }
  }

  render() {
    const {
      policy,
      schedules,
      change,
    } = this.props;

    const dueDateScheduleFieldLabel = policy.isProfileRolling()
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSlimit" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDS" />;

    const dueDateManagementOptions = policy.isShortTermLoan()
      ? this.generateOptions(shortTermLoansOptions, 'ui-circulation.settings.common.pleaseSelect')
      : this.generateOptions(longTermLoansOptions, 'ui-circulation.settings.common.pleaseSelect');

    return (
      <div data-test-loan-policy-form-loans-section>
        <h2 data-test-loans-section-header>
          <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
        </h2>
        <div data-test-loans-section-loanable>
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanable" />}
            id="loanable"
            name="loanable"
            component={Checkbox}
            type="checkbox"
          />
        </div>
        { policy.isLoanable() &&
          <div data-test-loans-section-loan-profile>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile" />}
              name="loansPolicy.profileId"
              id="input_loan_profile"
              component={Select}
              required
            >
              {this.generateOptions(loanProfileTypes, 'ui-circulation.settings.common.pleaseSelect')}
            </Field>
          </div>}
        { policy.isProfileRolling() &&
          <div data-test-loans-section-loan-period>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.loanPeriod"
              inputValuePath="loansPolicy.period.duration"
              selectValuePath="loansPolicy.period.intervalId"
              intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
              changeFormValue={change}
              required
            />
          </div>}
        { (policy.isProfileRolling() || policy.isProfileFixed()) &&
          <div data-test-loans-section-fixed-due-date-schedule-id>
            <Field
              label={dueDateScheduleFieldLabel}
              name="loansPolicy.fixedDueDateScheduleId"
              id="input_loansPolicy_fixedDueDateSchedule"
              required={policy.isProfileFixed()}
              component={Select}
            >
              {schedules}
            </Field>
          </div>}
        { policy.isLoanable() &&
          <div data-test-loans-section-closed-due-date-mgmt>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
              name="loansPolicy.closedLibraryDueDateManagementId"
              component={Select}
              required
            >
              {dueDateManagementOptions}
            </Field>
          </div>}
        { policy.isOpeningTimeOffsetActive() &&
          <div data-test-loans-section-opening-time-offset>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.openingTimeOffset"
              inputValuePath="loansPolicy.openingTimeOffset.duration"
              selectValuePath="loansPolicy.openingTimeOffset.intervalId"
              intervalPeriods={this.generateOptions(intervalPeriods.slice(0, 2).reverse(), 'ui-circulation.settings.loanPolicy.selectInterval')}
              changeFormValue={change}
              required
            />
          </div>}
        { policy.isLoanable() &&
          <>
            <div data-test-loans-section-grace-period>
              <Period
                fieldLabel="ui-circulation.settings.loanPolicy.gracePeriod"
                inputValuePath="loansPolicy.gracePeriod.duration"
                selectValuePath="loansPolicy.gracePeriod.intervalId"
                intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
                changeFormValue={change}
              />
            </div>
            <Row>
              <Col xs={2}>
                <Field
                  data-test-loans-section-item-limit
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.itemLimit" />}
                  component={TextField}
                  name="loansPolicy.itemLimit"
                  id="input_item_limit"
                  type="number"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Field
                  data-test-loans-section-for-use-at-location
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.forUseAtLocation" />}
                  name="loansPolicy.forUseAtLocation"
                  id="input_for_use_at_location"
                  component={Checkbox}
                  type="checkbox"
                />
              </Col>
            </Row>
            { policy.loansPolicy.forUseAtLocation &&
              <Period
                fieldLabel="ui-circulation.settings.loanPolicy.holdShelfExpirationPeriod"
                inputValuePath="loansPolicy.holdShelfExpiryPeriodForUseAtLocation.duration"
                selectValuePath="loansPolicy.holdShelfExpiryPeriodForUseAtLocation.intervalId"
                intervalPeriods={this.generateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
                changeFormValue={change}
              />
            }
          </>}
        <hr />
      </div>
    );
  }
}

export default injectIntl(LoansSection);
