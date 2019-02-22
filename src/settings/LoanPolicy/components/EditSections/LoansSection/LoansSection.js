import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field } from 'redux-form';

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
} from '../../../../../constants';

class LoansSection extends React.Component {
  static propTypes = {
    intl: intlShape,
    policy: PropTypes.object.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

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
      intl: { formatMessage },
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
            required
          />
        }
        { (policy.isProfileRolling() || policy.isProfileFixed()) &&
          <Field
            label={dueDateScheduleFieldLabel}
            name="loansPolicy.fixedDueDateScheduleId"
            id="input_loansPolicy_fixedDueDateSchedule"
            component={Select}
            placeholder={formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' })}
            dataOptions={schedules}
          />
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
            required
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

export default injectIntl(withSectionDefaults({
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
}));
