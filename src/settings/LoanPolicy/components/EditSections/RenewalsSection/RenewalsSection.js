import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Checkbox,
  Select,
  TextField,
} from '@folio/stripes/components';

import { Period } from '../../../../components';
import { defaultLoanPolicy } from '../../../../Models/LoanPolicy/utils';
import withSectionDefaults from '../withSectionDefaults';
import {
  intervalPeriods,
  intervalIdsMap,
  renewFromOptions,
} from '../../../../../constants';

class RenewalsSection extends React.Component {
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

    if (!policy.isLoanable()) {
      return null;
    }

    const altRenewalScheduleLabel = policy.isProfileRolling()
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSDueDateLimit" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSforRenewals" />;

    return (
      <div data-test-loan-policy-form-renewals-section>
        <h2 data-test-renewals-section-header>
          <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
        </h2>
        <div data-test-renewals-section-renewable>
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewable" />}
            name="renewable"
            component={Checkbox}
            type="checkbox"
            id="renewable"
            normalize={v => !!v}
          />
        </div>
        { policy.isRenewable() &&
          <div data-test-renewals-section-unlimited-renewals>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
              name="renewalsPolicy.unlimited"
              id="renewalsPolicy.unlimited"
              component={Checkbox}
              type="checkbox"
              normalize={v => !!v}
            />
          </div>
        }
        { policy.isRenewable() && !policy.isUnlimitedRenewals() &&
          <React.Fragment>
            <br />
            <div data-test-renewals-section-num-renewals-allowed>
              <Field
                label={(
                  <FormattedMessage id="ui-circulation.settings.loanPolicy.numRenewalsAllowed">
                    {message => `${message} *`}
                  </FormattedMessage>
                )}
                name="renewalsPolicy.numberAllowed"
                id="input_allowed_renewals"
                component={TextField}
                type="number"
                min={0}
              />
            </div>
          </React.Fragment>
        }
        { policy.isRenewable() && policy.isProfileRolling() &&
          <React.Fragment>
            <br />
            <div data-test-renewals-section-renew-from>
              <Field
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
                name="renewalsPolicy.renewFromId"
                id="select_renew_from"
                component={Select}
                dataOptions={renewFromOptions}
              />
            </div>
          </React.Fragment>
        }
        { policy.isRenewable() &&
          <div data-test-renewals-section-renewal-period-different>
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
              name="renewalsPolicy.differentPeriod"
              id="renewalsPolicy.differentPeriod"
              component={Checkbox}
              type="checkbox"
              normalize={v => !!v}
            />
          </div>
        }
        { policy.isRenewable() && policy.isDifferentPeriod() && policy.isProfileRolling() &&
          <React.Fragment>
            <br />
            <div data-test-renewals-section-alternate-loan-period-renewals>
              <Period
                fieldLabel="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals"
                selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
                inputValuePath="renewalsPolicy.period.duration"
                selectValuePath="renewalsPolicy.period.intervalId"
                intervalPeriods={intervalPeriods}
                changeFormValue={change}
                required
              />
            </div>
          </React.Fragment>
        }
        { policy.isRenewable() && policy.isDifferentPeriod() &&
          <div data-test-renewals-alternate-fixed-due-date-schedule>
            <Field
              label={altRenewalScheduleLabel}
              name="renewalsPolicy.alternateFixedDueDateScheduleId"
              component={Select}
            >
              {schedules}
            </Field>
          </div>
        }
        <hr />
      </div>
    );
  }
}

export default withSectionDefaults({
  component: RenewalsSection,
  checkMethodName: 'shouldInitRenewalsPolicy',
  sectionsDefaults: { 'renewalsPolicy': defaultLoanPolicy.renewalsPolicy },
  dropdownDefaults: { 'renewalsPolicy.period': { intervalId: intervalIdsMap.DAYS } }
});
