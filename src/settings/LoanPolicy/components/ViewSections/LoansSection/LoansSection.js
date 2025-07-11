import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
  KeyValue,
} from '@folio/stripes/components';

import {
  loanProfileTypes,
  shortTermLoansOptions,
  longTermLoansOptions,
} from '../../../../../constants';

const LoansSection = (props) => {
  const {
    policy,
    getPeriodValue,
    getDropdownValue,
    getScheduleValue,
    getCheckboxValue,
    getValue,
  } = props;

  if (!policy.loanable) {
    return (
      <div data-test-loan-policy-detail-loans-section>
        <Row data-testid="loansTestId">
          <Col xs={12}>
            <h2 data-test-loans-section-header>
              <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
            </h2>
          </Col>
        </Row>
        <Row data-testid="loanableTestId">
          <Col xs={12}>
            <div data-test-renewals-section-loanable>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanable" />}
                value={getCheckboxValue('loanable')}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  const dueDateScheduleFieldLabel = policy.isProfileRolling()
    ? <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSlimit" />
    : <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDS" />;

  return (
    <div data-test-loan-policy-detail-loans-section>
      <Row data-testid="loansTestId">
        <Col xs={12}>
          <h2 data-test-loans-section-header>
            <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
          </h2>
        </Col>
      </Row>
      <Row data-testid="loanProfileTestId">
        <Col xs={12}>
          <div data-test-loans-section-loan-profile>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile" />}
              value={getDropdownValue('loansPolicy.profileId', loanProfileTypes)}
            />
          </div>
        </Col>
      </Row>
      { policy.isProfileRolling() &&
        <div>
          <Row data-testid="periodTestId">
            <Col xs={12}>
              <div data-test-loans-section-loan-period>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanPeriod" />}
                  value={getPeriodValue('loansPolicy.period')}
                />
              </div>
            </Col>
          </Row>
        </div>}
      { (policy.isProfileRolling() || policy.isProfileFixed()) &&
        <div>
          <Row data-testid="scheduleTestId">
            <Col xs={12}>
              <div data-test-loans-section-due-date-schedule>
                <KeyValue
                  label={dueDateScheduleFieldLabel}
                  value={getScheduleValue('loansPolicy.fixedDueDateScheduleId')}
                />
              </div>
            </Col>
          </Row>
        </div>}
      <Row data-testid="closedDueDateTestId">
        <Col xs={12}>
          <div data-test-loans-section-closed-due-date-mgmte>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
              value={getDropdownValue('loansPolicy.closedLibraryDueDateManagementId', [...shortTermLoansOptions, ...longTermLoansOptions])}
            />
          </div>
        </Col>
      </Row>
      { policy.isOpeningTimeOffsetActive() &&
      <div>
        <Row data-testid="openingTimeOffsetTestId">
          <Col xs={12}>
            <div data-test-loans-section-opening-time-offset>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.openingTimeOffset" />}
                value={getPeriodValue('loansPolicy.openingTimeOffset')}
              />
            </div>
          </Col>
        </Row>
      </div>}
      <Row data-testid="gracePeriodTestId">
        <Col xs={12}>
          <div data-test-loans-section-grace-period>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.gracePeriod" />}
              value={getPeriodValue('loansPolicy.gracePeriod')}
            />
          </div>
        </Col>
      </Row>
      <Row data-testid="itemLimitTestId">
        <Col xs={12}>
          <div data-test-loans-section-item-limit>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.itemLimit" />}
              value={getValue('loansPolicy.itemLimit') || '-'}
            />
          </div>
        </Col>
      </Row>
      <Row data-testid="forUseAtLocationTestId">
        <Col xs={12}>
          <div data-test-loans-section-for-use-at-location>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.forUseAtLocation" />}
              value={getCheckboxValue('loansPolicy.forUseAtLocation')}
            />
          </div>
        </Col>
      </Row>
      {getValue('loansPolicy.forUseAtLocation') &&
        <Row data-testid="holdShelfExpiryPeriodTestId">
          <Col xs={12}>
            <div data-test-loans-section-hold-shelf-expiry-period>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.holdShelfExpirationPeriod" />}
                value={getPeriodValue('loansPolicy.holdShelfExpiryPeriodForUseAtLocation')}
              />
            </div>
          </Col>
        </Row>
      }
      <hr />
    </div>
  );
};

LoansSection.propTypes = {
  policy: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    loanable: PropTypes.bool,
    isProfileRolling: PropTypes.func,
    isOpeningTimeOffsetActive: PropTypes.func,
    isProfileFixed: PropTypes.func,
  }).isRequired,
  getDropdownValue: PropTypes.func.isRequired,
  getPeriodValue: PropTypes.func.isRequired,
  getScheduleValue: PropTypes.func.isRequired,
  getCheckboxValue: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
};

export default LoansSection;
