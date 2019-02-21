import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import {
  get,
  some,
} from 'lodash';

import {
  Checkbox,
  Select,
} from '@folio/stripes/components';

import { Period } from '../../../../components';
import { defaultLoanPolicy } from '../../../../Models/LoanPolicy/utils';
import withSectionDefaults from '../withSectionDefaults';
import {
  intervalIdsMap,
  loanProfileTypes,
  intervalPeriods,
  shortTermLoansOptions,
  longTermLoansOptions,
  CURRENT_DUE_DATE_TIME,
  CURRENT_DUE_DATE,
} from '../../../../../constants';

class LoansSection extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    this.setDueDateManagementSelectedId();
  }

  isValidItemSelected = (options, selectedId) => {
    return some(options, ({ id }) => id === selectedId);
  };

  setDueDateManagementSelectedId = () => {
    const {
      policy,
      change,
    } = this.props;

    const pathToField = 'loansPolicy.closedLibraryDueDateManagementId';
    const isShortTermLoan = policy.isShortTermLoan();
    const selectedId = get(policy, pathToField);

    const isValidShortTermLoanValue = this.isValidItemSelected(shortTermLoansOptions, selectedId);
    const isValidLongTermLoanValue = this.isValidItemSelected(longTermLoansOptions, selectedId);

    if (isShortTermLoan && !isValidShortTermLoanValue) {
      /* Set default value for short term loan if long term loan item was selected */
      change(pathToField, CURRENT_DUE_DATE_TIME);
    }

    if (!isShortTermLoan && !isValidLongTermLoanValue) {
      /* Set default value for long term loan if short term loan item was selected */
      change(pathToField, CURRENT_DUE_DATE);
    }
  };

  render() {
    const {
      policy,
      schedules,
      change,
    } = this.props;

    const dueDateScheduleFieldLabel = policy.isProfileRolling()
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSlimit" />
      : (
        <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDS">
          {message => `${message} *`}
        </FormattedMessage>
      );

    const dueDateManagementOptions = policy.isShortTermLoan()
      ? shortTermLoansOptions
      : longTermLoansOptions;

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
            normalize={v => !!v}
          />
        </div>
        { policy.isLoanable() &&
          <div data-test-loans-section-loan-profile>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile" />}
              name="loansPolicy.profileId"
              id="input_loan_profile"
              component={Select}
              dataOptions={loanProfileTypes}
            />
          </div>
        }
        { policy.isProfileRolling() &&
          <div data-test-loans-section-loan-period>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.loanPeriod"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="loansPolicy.period.duration"
              selectValuePath="loansPolicy.period.intervalId"
              intervalPeriods={intervalPeriods}
              changeFormValue={change}
              required
            />
          </div>
        }
        { (policy.isProfileRolling() || policy.isProfileFixed()) &&
          <div data-test-loans-section-fixed-due-date-schedule-id>
            <Field
              label={dueDateScheduleFieldLabel}
              name="loansPolicy.fixedDueDateScheduleId"
              id="input_loansPolicy_fixedDueDateSchedule"
              component={Select}
              normalize={value => (value === '' ? null : value)}
            >
              <FormattedMessage id="ui-circulation.settings.loanPolicy.selectSchedule">
                {(message) => <option value="" disabled>{message}</option>}
              </FormattedMessage>
              {schedules}
            </Field>
          </div>
        }
        { policy.isLoanable() &&
          <div data-test-loans-section-closed-due-date-mgmt>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
              name="loansPolicy.closedLibraryDueDateManagementId"
              component={Select}
              dataOptions={dueDateManagementOptions}
            />
          </div>
        }
        { policy.isOpeningTimeOffsetActive() &&
          <div data-test-loans-section-opening-time-offset>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.openingTimeOffset"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="loansPolicy.openingTimeOffset.duration"
              selectValuePath="loansPolicy.openingTimeOffset.intervalId"
              intervalPeriods={intervalPeriods.slice(0, 2).reverse()}
              changeFormValue={change}
              required
            />
          </div>
        }
        { policy.isLoanable() &&
          <div data-test-loans-section-grace-period>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.gracePeriod"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="loansPolicy.gracePeriod.duration"
              selectValuePath="loansPolicy.gracePeriod.intervalId"
              intervalPeriods={intervalPeriods}
              changeFormValue={change}
            />
          </div>
        }
        <hr />
      </div>
    );
  }
}

export default withSectionDefaults({
  component: LoansSection,
  checkMethodName: 'shouldInitLoansPolicy',
  sectionsDefaults: {
    'loansPolicy': defaultLoanPolicy.loansPolicy,
    'renewable': true,
    'renewalsPolicy': defaultLoanPolicy.renewalsPolicy,
    'requestManagement': defaultLoanPolicy.requestManagement,
  },
  dropdownDefaults: {
    'loansPolicy.period': { intervalId: intervalIdsMap.DAYS },
    'loansPolicy.openingTimeOffset': { intervalId: intervalIdsMap.HOURS },
    'loansPolicy.gracePeriod': { intervalId: intervalIdsMap.HOURS },
  },
});
