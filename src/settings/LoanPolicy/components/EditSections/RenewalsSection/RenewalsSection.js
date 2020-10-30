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
} from '@folio/stripes/components';

import optionsGenerator from '../../../../utils/options-generator';
import Period from '../../../../components/Period';
import {
  intervalPeriods,
  renewFromOptions,
} from '../../../../../constants';

class RenewalsSection extends React.Component {
  static propTypes = {
    intl: PropTypes.object,
    policy: PropTypes.object.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.generateOptions = optionsGenerator.bind(null, this.props.intl.formatMessage);
  }

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
            />
          </div>}
        { policy.isRenewable() && !policy.isUnlimitedRenewals() &&
          <>
            <div data-test-renewals-section-num-renewals-allowed>
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
            <div data-test-renewals-section-renew-from>
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
          <div data-test-renewals-section-renewal-period-different>
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
            <div data-test-renewals-section-alternate-loan-period-renewals>
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
          <div data-test-renewals-alternate-fixed-due-date-schedule>
            <Field
              label={altRenewalScheduleLabel}
              name="renewalsPolicy.alternateFixedDueDateScheduleId"
              component={Select}
              required={policy.isProfileFixed()}
            >
              {schedules}
            </Field>
          </div>}
        <hr />
      </div>
    );
  }
}

export default injectIntl(RenewalsSection);
