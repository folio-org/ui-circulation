import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  some,
  get,
} from 'lodash';

import {
  Checkbox,
  Select,
} from '@folio/stripes/components';

import {
  loanProfileTypes,
  intervalPeriods,
  shortTermLoansOptions,
  longTermLoansOptions,
  CURRENT_DUE_DATE_TIME,
  CURRENT_DUE_DATE,
} from '../../../../constants';

import { Period } from '../../../components';

class LoansSection extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

  componentDidUpdate() {
    this.setCorrectDueDateManagementSelectedValue();
  }

  isValidItemSelected = (options, selectedId) => {
    return some(options, ({ id }) => id === selectedId);
  };

  setCorrectDueDateManagementSelectedValue = () => {
    const {
      policy,
      change,
    } = this.props;

    const isShortTermLoan = policy.isShortTermLoan();
    const selectedId = get(policy, 'loansPolicy.closedLibraryDueDateManagementId');

    const isValidShortTermLoanValue = this.isValidItemSelected(shortTermLoansOptions, selectedId);
    const isValidLongTermLoanValue = this.isValidItemSelected(longTermLoansOptions, selectedId);

    if (isShortTermLoan && !isValidShortTermLoanValue) {
      /* Set default value for short term loan if long term loan item was selected */
      change('loansPolicy.closedLibraryDueDateManagementId', CURRENT_DUE_DATE_TIME);
    }

    if (!isShortTermLoan && !isValidLongTermLoanValue) {
      /* Set default value for long term loan if short term loan item was selected */
      change('loansPolicy.closedLibraryDueDateManagementId', CURRENT_DUE_DATE);
    }
  };

  getDueDateManagementOptions = () => {
    return this.props.policy.isShortTermLoan()
      ? shortTermLoansOptions
      : longTermLoansOptions;
  };

  render() {
    const {
      policy,
      schedules,
      change,
    } = this.props;

    const dueDateScheduleFieldLabel = policy.isProfileRolling()
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSlimit" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSRequired" />;

    const dueDateManagementOptions = this.getDueDateManagementOptions();

    return (
      <React.Fragment>
        <h2>
          <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
        </h2>
        <Field
          label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanable" />}
          id="loanable"
          name="loanable"
          component={Checkbox}
          type="checkbox"
          normalize={v => !!v}
        />
        { policy.loanable &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile" />}
            name="loansPolicy.profileId"
            id="input_loan_profile"
            component={Select}
            dataOptions={loanProfileTypes}
          />
        }
        { policy.isProfileRolling() &&
          <Period
            fieldLabel="ui-circulation.settings.loanPolicy.loanPeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="loansPolicy.period.duration"
            selectValuePath="loansPolicy.period.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
        }
        { (policy.isProfileRolling() || policy.isProfileFixed()) &&
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
        }
        { policy.loanable &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
            name="loansPolicy.closedLibraryDueDateManagementId"
            component={Select}
          >
            {dueDateManagementOptions.map(({ value, label }) => (
              <option value={value} key={`${label}-${value}`}>
                {label}
              </option>
            ))}
          </Field>
        }
        { policy.isOpeningTimeOffsetActive() &&
          <Period
            fieldLabel="ui-circulation.settings.loanPolicy.openingTimeOffset"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="loansPolicy.openingTimeOffset.duration"
            selectValuePath="loansPolicy.openingTimeOffset.intervalId"
            intervalPeriods={intervalPeriods.slice(0, 2).reverse()}
            changeFormValue={change}
          />
        }
        { policy.loanable &&
          <Period
            fieldLabel="ui-circulation.settings.loanPolicy.gracePeriod"
            selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
            inputValuePath="loansPolicy.gracePeriod.duration"
            selectValuePath="loansPolicy.gracePeriod.intervalId"
            intervalPeriods={intervalPeriods}
            changeFormValue={change}
          />
        }
        <hr />
      </React.Fragment>
    );
  }
}

export default LoansSection;
