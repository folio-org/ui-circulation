import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import { FormattedMessage } from 'react-intl';

import {
  loanProfileTypes,
  intervalPeriods,
  dueDateManagementOptions,
  renewFromOptions,
  loanProfileMap
} from '../constants';

class LoanPolicyDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }),
  };

  // eslint-disable-next-line class-methods-use-this
  getInterval(id) {
    return _.find(intervalPeriods, intr => intr.id === parseInt(id, 10));
  }

  renderLoans() {
    const { stripes, initialValues, parentResources } = this.props;

    const formatMsg = stripes.intl.formatMessage;
    const policy = initialValues || {};
    const fixedDueDateSchedules = ((parentResources || {}).fixedDueDateSchedules || {}).records || [];

    let dueDateScheduleFieldLabel = formatMsg({ id: 'ui-circulation.settings.loanPolicy.fDDS' });
    if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) {
      dueDateScheduleFieldLabel = formatMsg({ id: 'ui-circulation.settings.loanPolicy.fDDSlimit' });
    }

    let schedule = {};
    if (policy.loansPolicy && policy.loansPolicy.fixedDueDateScheduleId) {
      schedule = fixedDueDateSchedules.find(s => s.id === policy.loansPolicy.fixedDueDateScheduleId);
    }

    const profileId = _.get(policy, ['loansPolicy', 'profileId']);
    const profile = _.find(loanProfileTypes, t => t.value === profileId);
    const ddId = _.get(policy, ['loansPolicy', 'closedLibraryDueDateManagementId']);
    const closedLibraryDueDateManagement = _.find(dueDateManagementOptions, dd => dd.id === parseInt(ddId, 10));
    const skipClosed = (_.get(policy, ['loansPolicy', 'skipClosed'])) ? 'Yes' : 'No';
    const periodInterval = this.getInterval(_.get(policy, ['loansPolicy', 'period', 'intervalId']));
    const exReqPerInterval = this.getInterval(_.get(policy, ['loansPolicy', 'existingRequestsPeriod', 'intervalId']));
    const gracePeriodInterval = this.getInterval(_.get(policy, ['loansPolicy', 'gracePeriod', 'intervalId']));

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>
              <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
            </h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.loanProfile' })}
              value={_.get(profile, ['label'], '-')}
            />
          </Col>
        </Row>
        {policy.loansPolicy.profileId === loanProfileMap.ROLLING &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.loanPeriod' })}
                  value={`${_.get(policy, ['loansPolicy', 'period', 'duration'], '')} ${_.get(periodInterval, ['label'], '-')}`}
                />
              </Col>
            </Row>
          </div>
        }
        {(policy.loansPolicy && policy.loansPolicy.profileId !== loanProfileMap.INDEFINITE) &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue label={dueDateScheduleFieldLabel} value={_.get(schedule, ['name'], '-')} />
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.closedDueDateMgmt' })} value={_.get(closedLibraryDueDateManagement, ['label'], '-')} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.skipClosedDates' })} value={skipClosed} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.alternateLoanPeriodExisting' })}
              value={`${_.get(policy, ['loansPolicy', 'existingRequestsPeriod', 'duration'], '')} ${_.get(exReqPerInterval, ['label'], '-')}`}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.gracePeriod' })}
              value={`${_.get(policy, ['loansPolicy', 'gracePeriod', 'duration'], '')} ${_.get(gracePeriodInterval, ['label'], '-')}`}
            />
          </Col>
        </Row>
      </div>
    );
  }

  renderAbout() {
    const policy = (this.props.initialValues || {});
    const formatMsg = this.props.stripes.intl.formatMessage;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>
              <FormattedMessage id="ui-circulation.settings.loanPolicy.about" />
            </h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.policyName' })}
              value={_.get(policy, ['name'], '')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.policyDescription' })}
              value={_.get(policy, ['description'], '-')}
            />
          </Col>
        </Row>
      </div>
    );
  }

  renderRenewals() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const policy = this.props.initialValues || {};
    const unlimited = (_.get(policy, ['renewalsPolicy', 'unlimited'])) ? 'Yes' : 'No';
    const differentPeriod = (_.get(policy, ['renewalsPolicy', 'differentPeriod'])) ? 'Yes' : 'No';
    const renewFromId = _.get(policy, ['renewalsPolicy', 'renewFromId'], 0);
    const renewFrom = _.find(renewFromOptions, r => r.id === parseInt(renewFromId, 10));
    const interval = this.getInterval(_.get(policy, ['renewalsPolicy', 'period', 'intervalId']));

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>
              <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.unlimitedRenewals' })}
              value={unlimited}
            />
          </Col>
        </Row>
        {policy.renewalsPolicy && policy.renewalsPolicy.unlimited === false &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.numRenewalsAllowed' })}
                  value={_.get(policy, ['renewalsPolicy', 'numberAllowed'], 0)}
                />
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.renewFrom' })}
              value={_.get(renewFrom, ['label'], '-')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.renewalPeriodDifferent' })}
              value={differentPeriod}
            />
          </Col>
        </Row>
        {(policy.renewalsPolicy && policy.renewalsPolicy.differentPeriod && policy.loansPolicy.profileId === loanProfileMap.ROLLING) &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals' })}
                  value={`${_.get(policy, ['renewalsPolicy', 'period', 'duration'])} ${_.get(interval, ['label'], '-')}`}
                />
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }

  render() {
    const policy = this.props.initialValues || {};

    return (
      <div>
        {this.renderAbout()}
        <hr />
        {policy.loanable && this.renderLoans()}
        <hr />
        {policy.renewable && this.renderRenewals()}
      </div>
    );
  }
}

export default LoanPolicyDetail;
