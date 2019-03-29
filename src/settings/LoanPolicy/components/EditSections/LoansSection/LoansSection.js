import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';

import {
  Checkbox,
  Select,
} from '@folio/stripes/components';

import { Period } from '../../../../components';
import {
  loanProfileTypes,
  intervalPeriods,
  shortTermLoansOptions,
  longTermLoansOptions,
} from '../../../../../constants';

import optionsGenarator from '../../../../utils/options-genarator';

class LoansSection extends React.Component {
  static propTypes = {
    intl: intlShape,
    policy: PropTypes.object.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.genarateOptions = optionsGenarator.bind(null, this.props.intl.formatMessage);
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
      : (
        <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDS">
          {message => `${message} *`}
        </FormattedMessage>
      );

    const dueDateManagementOptions = policy.isShortTermLoan()
      ? this.genarateOptions(shortTermLoansOptions, 'ui-circulation.settings.common.pleaseSelect')
      : this.genarateOptions(longTermLoansOptions, 'ui-circulation.settings.common.pleaseSelect');

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
              label={(
                <FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile">
                  {message => `${message} *`}
                </FormattedMessage>
              )}
              name="loansPolicy.profileId"
              id="input_loan_profile"
              component={Select}
            >
              {this.genarateOptions(loanProfileTypes, 'ui-circulation.settings.common.pleaseSelect')}
            </Field>
          </div>
        }
        { policy.isProfileRolling() &&
          <div data-test-loans-section-loan-period>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.loanPeriod"
              inputValuePath="loansPolicy.period.duration"
              selectValuePath="loansPolicy.period.intervalId"
              intervalPeriods={this.genarateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
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
            >
              {schedules}
            </Field>
          </div>
        }
        { policy.isLoanable() &&
          <div data-test-loans-section-closed-due-date-mgmt>
            <Field
              label={(
                <FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt">
                  {message => `${message} *`}
                </FormattedMessage>
              )}
              name="loansPolicy.closedLibraryDueDateManagementId"
              component={Select}
            >
              {dueDateManagementOptions}
            </Field>
          </div>
        }
        { policy.isOpeningTimeOffsetActive() &&
          <div data-test-loans-section-opening-time-offset>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.openingTimeOffset"
              inputValuePath="loansPolicy.openingTimeOffset.duration"
              selectValuePath="loansPolicy.openingTimeOffset.intervalId"
              intervalPeriods={this.genarateOptions(intervalPeriods.slice(0, 2).reverse(), 'ui-circulation.settings.loanPolicy.selectInterval')}
              changeFormValue={change}
              required
            />
          </div>
        }
        { policy.isLoanable() &&
          <div data-test-loans-section-grace-period>
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.gracePeriod"
              inputValuePath="loansPolicy.gracePeriod.duration"
              selectValuePath="loansPolicy.gracePeriod.intervalId"
              intervalPeriods={this.genarateOptions(intervalPeriods, 'ui-circulation.settings.loanPolicy.selectInterval')}
              changeFormValue={change}
            />
          </div>
        }
        <hr />
      </div>
    );
  }
}

export default injectIntl(LoansSection);
