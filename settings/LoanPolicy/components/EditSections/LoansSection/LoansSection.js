import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Checkbox,
  Select,
} from '@folio/stripes/components';

// eslint-disable-next-line
import {
  loanProfileTypes,
  intervalPeriods,
  shortTermLoansOptions,
  longTermLoansOptions,
} from '@folio/circulation/constants';

// eslint-disable-next-line
import { Period } from '@folio/circulation/settings/components';

import withLoansPolicyDefaults from './withLoansPolicyDefaults';

class LoansSection extends React.Component {
  static propTypes = {
    policy: PropTypes.object.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
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

    const dueDateManagementOptions = policy.isShortTermLoan()
      ? shortTermLoansOptions
      : longTermLoansOptions;

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
        { policy.isLoanable() &&
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
        { policy.isLoanable() &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
            name="loansPolicy.closedLibraryDueDateManagementId"
            component={Select}
            dataOptions={dueDateManagementOptions}
          />
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
        { policy.isLoanable() &&
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

export default withLoansPolicyDefaults(LoansSection);
