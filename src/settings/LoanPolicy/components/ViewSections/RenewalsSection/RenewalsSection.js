import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

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
    intl:{
      formatMessage,
    },
  } = props;

  if (!isVisible) {
    return null;
  }

  const altRenewalScheduleLabel = policy.isProfileRolling()
    ? formatMessage({ id: 'ui-circulation.settings.loanPolicy.altFDDSDueDateLimit' })
    : formatMessage({ id: 'ui-circulation.settings.loanPolicy.altFDDSforRenewals' });

  return (
    <div data-test-loan-policy-detail-renewals-section>
      <Row data-testid="renewals">
        <Col xs={12}>
          <h2 data-test-renewals-section-header>
            {formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewals' })}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div
            data-testid="renewable"
            data-test-renewals-section-renewable
          >
            <KeyValue
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewable' })}
              value={getCheckboxValue('renewable')}
            />
          </div>
        </Col>
      </Row>
      { policy.isRenewable() &&
        <Row>
          <Col xs={12}>
            <div
              data-testid="unlimitedRenewals"
              data-test-renewals-section-unlimited-renewals
            >
              <KeyValue
                label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.unlimitedRenewals' })}
                value={getCheckboxValue('renewalsPolicy.unlimited')}
              />
            </div>
          </Col>
        </Row>}
      { policy.isRenewable() && !policy.isUnlimitedRenewals() &&
        <div>
          <Row>
            <Col xs={12}>
              <div
                data-testid="numRenewalsAllowed"
                data-test-renewals-section-number-renewals-allowed
              >
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.numRenewalsAllowed' })}
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
              <div
                data-testid="renewFrom"
                data-test-renewals-section-renew-from
              >
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewFrom' })}
                  value={getDropdownValue('renewalsPolicy.renewFromId', renewFromOptions)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <div
                data-testid="renewalPeriodDifferent"
                data-test-renewals-section-renewal-period-different
              >
                <KeyValue
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewalPeriodDifferent' })}
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
            <div
              data-testid="alternateLoanPeriodRenewals"
              data-test-renewals-section-alternate-loan-period-renewals
            >
              <KeyValue
                label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals' })}
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
              <div
                data-testid="altFDDS"
                data-test-renewals-section-alternate-fixed-due-date-schedule-id
              >
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
  policy: PropTypes.shape({
    isProfileRolling: PropTypes.func,
    isRenewable: PropTypes.func,
    isDifferentPeriod: PropTypes.func,
    isUnlimitedRenewals: PropTypes.func,
  }).isRequired,
  getValue: PropTypes.func.isRequired,
  getDropdownValue: PropTypes.func.isRequired,
  getPeriodValue: PropTypes.func.isRequired,
  getCheckboxValue: PropTypes.func.isRequired,
  getScheduleValue: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default injectIntl(RenewalsSection);
