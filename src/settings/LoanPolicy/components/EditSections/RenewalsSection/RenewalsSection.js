import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
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
    intl: intlShape,
    policy: PropTypes.object.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.node).isRequired,
    change: PropTypes.func.isRequired,
  };

  render() {
    const {
      policy,
      schedules,
      change,
      intl: { formatMessage }
    } = this.props;

    if (!policy.isLoanable()) {
      return null;
    }

    const altRenewalScheduleLabel = policy.isProfileRolling()
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSDueDateLimit" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSforRenewals" />;

    return (
      <React.Fragment>
        <h2>
          <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
        </h2>
        <Field
          label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewable" />}
          name="renewable"
          component={Checkbox}
          type="checkbox"
          id="renewable"
          normalize={v => !!v}
        />
        { policy.isRenewable() &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
            name="renewalsPolicy.unlimited"
            id="renewalsPolicy.unlimited"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
        }
        { policy.isRenewable() && !policy.isUnlimitedRenewals() &&
          <React.Fragment>
            <br />
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
          </React.Fragment>
        }
        { policy.isRenewable() && policy.isProfileRolling() &&
          <React.Fragment>
            <br />
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
              name="renewalsPolicy.renewFromId"
              id="select_renew_from"
              component={Select}
              dataOptions={renewFromOptions}
            />
          </React.Fragment>
        }
        { policy.isRenewable() &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
            name="renewalsPolicy.differentPeriod"
            id="renewalsPolicy.differentPeriod"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
        }
        { policy.isRenewable() && policy.isDifferentPeriod() && policy.isProfileRolling() &&
          <React.Fragment>
            <br />
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="renewalsPolicy.period.duration"
              selectValuePath="renewalsPolicy.period.intervalId"
              intervalPeriods={intervalPeriods}
              changeFormValue={change}
              required
            />
          </React.Fragment>
        }
        { policy.isRenewable() && policy.isDifferentPeriod()
          && (policy.isProfileRolling() || policy.isProfileFixed()) &&
          <Field
            label={altRenewalScheduleLabel}
            name="renewalsPolicy.alternateFixedDueDateScheduleId"
            component={Select}
            placeholder={formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' })}
            dataOptions={schedules}
          />
        }
        <hr />
      </React.Fragment>
    );
  }
}

export default injectIntl(withSectionDefaults({
  component: RenewalsSection,
  checkMethodName: 'shouldInitRenewalsPolicy',
  sectionsDefaults: { 'renewalsPolicy': defaultLoanPolicy.renewalsPolicy },
  dropdownDefaults: { 'renewalsPolicy.period': { intervalId: intervalIdsMap.DAYS } }
}));
