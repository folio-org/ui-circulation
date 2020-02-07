import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

import { renewFromOptions } from '../../../../../constants';

const RenewalsSection = (props) => {
  const {
    isVisible,
    policy,
    getCheckboxValue,
    getDropdownValue,
    getPeriodValue,
    getScheduleValue,
    getValue,
  } = props;

  if (!isVisible) {
    return null;
  }

  const altRenewalScheduleLabel = policy.isProfileRolling()
    ? <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSDueDateLimit" />
    : <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSforRenewals" />;

  return (
    <div data-test-loan-policy-detail-renewals-section>
      <Row>
        <Col xs={12}>
          <h2 data-test-renewals-section-header>
            <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div data-test-renewals-section-renewable>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewable" />}
              value={getCheckboxValue('renewable')}
            />
          </div>
        </Col>
      </Row>
      { policy.isRenewable() &&
        <Row>
          <Col xs={12}>
            <div data-test-renewals-section-unlimited-renewals>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
                value={getCheckboxValue('renewalsPolicy.unlimited')}
              />
            </div>
          </Col>
        </Row>}
      { policy.isRenewable() && !policy.isUnlimitedRenewals() &&
        <div>
          <Row>
            <Col xs={12}>
              <div data-test-renewals-section-number-renewals-allowed>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.numRenewalsAllowed" />}
                  value={getValue('renewalsPolicy.numberAllowed')}
                />
              </div>
            </Col>
          </Row>
        </div>}
      { policy.isRenewable() &&
        <>
          <Row>
            <Col xs={12}>
              <div data-test-renewals-section-renew-from>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
                  value={getDropdownValue('renewalsPolicy.renewFromId', renewFromOptions)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div data-test-renewals-section-renewal-period-different>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
                  value={getCheckboxValue('renewalsPolicy.differentPeriod')}
                />
              </div>
            </Col>
          </Row>
        </>}
      { policy.isRenewable() && policy.isDifferentPeriod() && policy.isProfileRolling() &&
      <div>
        <Row>
          <Col xs={12}>
            <div data-test-renewals-section-alternate-loan-period-renewals>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals" />}
                value={getPeriodValue('renewalsPolicy.period')}
              />
            </div>
          </Col>
        </Row>
      </div>}
      { policy.isRenewable() && policy.isDifferentPeriod() &&
        <div>
          <Row>
            <Col xs={12}>
              <div data-test-renewals-section-alternate-fixed-due-date-schedule-id>
                <KeyValue
                  label={altRenewalScheduleLabel}
                  value={getScheduleValue('renewalsPolicy.alternateFixedDueDateScheduleId')}
                />
              </div>
            </Col>
          </Row>
        </div>}
      <hr />
    </div>
  );
};

RenewalsSection.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  policy: PropTypes.object.isRequired,
  getValue: PropTypes.func.isRequired,
  getDropdownValue: PropTypes.func.isRequired,
  getPeriodValue: PropTypes.func.isRequired,
  getCheckboxValue: PropTypes.func.isRequired,
  getScheduleValue: PropTypes.func.isRequired,
};

export default RenewalsSection;
