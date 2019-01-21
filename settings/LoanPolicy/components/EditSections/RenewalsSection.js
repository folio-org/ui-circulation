import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Checkbox,
  Select,
  TextField,
  Col,
  Row,
} from '@folio/stripes/components';

// eslint-disable-next-line
import {
  intervalPeriods,
  renewFromOptions,
} from '@folio/circulation/constants';

// eslint-disable-next-line
import { Period } from '@folio/circulation/settings/components';

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

    if (!policy.loanable) {
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
        { policy.renewable &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
            name="renewalsPolicy.unlimited"
            id="renewalsPolicy.unlimited"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
        }
        { policy.renewable && policy.renewalsPolicy.unlimited === false &&
          <React.Fragment>
            <p>
              <FormattedMessage id="ui-circulation.settings.loanPolicy.numRenewalsAllowed" />
            </p>
            <Row>
              <Col xs={2}>
                <Field
                  label=""
                  name="renewalsPolicy.numberAllowed"
                  id="input_allowed_renewals"
                  component={TextField}
                  type="number"
                  min={0}
                />
              </Col>
            </Row>
          </React.Fragment>
        }
        { policy.renewable && policy.isProfileRolling() &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
            name="renewalsPolicy.renewFromId"
            id="select_renew_from"
            component={Select}
            dataOptions={renewFromOptions}
          />
        }
        { policy.renewable &&
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
            name="renewalsPolicy.differentPeriod"
            id="renewalsPolicy.differentPeriod"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
        }
        { policy.renewable && policy.renewalsPolicy.differentPeriod && policy.isProfileRolling() &&
          <React.Fragment>
            <br />
            <Period
              fieldLabel="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="renewalsPolicy.period.duration"
              selectValuePath="renewalsPolicy.period.intervalId"
              intervalPeriods={intervalPeriods}
              changeFormValue={change}
            />
          </React.Fragment>
        }
        { policy.renewable && policy.renewalsPolicy.differentPeriod &&
          (policy.isProfileRolling() || policy.isProfileFixed()) &&
          <Field
            label={altRenewalScheduleLabel}
            name="renewalsPolicy.alternateFixedDueDateScheduleId"
            component={Select}
            normalize={value => (value === '' ? null : value)}
          >
            <FormattedMessage id="ui-circulation.settings.loanPolicy.selectSchedule">
              {(message) => <option value="" disabled>{message}</option>}
            </FormattedMessage>
            {schedules}
          </Field>
        }
        <hr />
      </React.Fragment>
    );
  }
}

export default RenewalsSection;
