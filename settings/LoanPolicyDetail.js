import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';

import { loanProfileTypes, intervalPeriods, dueDateManagementOptions, renewFromOptions } from '../constants';

class LoanPolicyDetail extends React.Component {

  static propTypes = {
    initialValues: PropTypes.object,
  };

  // eslint-disable-next-line class-methods-use-this
  getInterval(id) {
    return _.find(intervalPeriods, intr => intr.id === parseInt(id, 10));
  }

  renderLoans() {
    const policy = this.props.initialValues || {};
    let dueDateScheduleFieldLabel = 'Fixed due date schedule';
    if (policy.loansPolicy && policy.loansPolicy.profileId === '2') {
      dueDateScheduleFieldLabel += ' (due date limit)';
    }

    const profileId = _.get(policy, ['loansPolicy', 'profileId']);
    const profile = _.find(loanProfileTypes, t => t.id === parseInt(profileId, 10));
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
            <h2 style={{ marginTop: '0' }}>Loans</h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Loans Profile" value={_.get(profile, ['label'], '-')} />
          </Col>
        </Row>
        {policy.loansPolicy.profileId === '2' &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue
                  label="Loan period"
                  value={`${_.get(policy, ['loansPolicy', 'period', 'duration'], '')} ${_.get(periodInterval, ['label'], '-')}`}
                />
              </Col>
            </Row>
          </div>
        }
        {(policy.loansPolicy && policy.loansPolicy.profileId !== '3') &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue label={dueDateScheduleFieldLabel} value={_.get(policy, ['loansPolicy', 'fixedDueDateSchedule'], '-')} />
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Closed library due date management" value={_.get(closedLibraryDueDateManagement, ['label'], '-')} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Skip closed dates in intervening period" value={skipClosed} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label="Alternate loan period for items with existing requests"
              value={`${_.get(policy, ['loansPolicy', 'existingRequestsPeriod', 'duration'], '')} ${_.get(exReqPerInterval, ['label'], '-')}`}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label="Grace period"
              value={`${_.get(policy, ['loansPolicy', 'gracePeriod', 'duration'], '')} ${_.get(gracePeriodInterval, ['label'], '-')}`}
            />
          </Col>
        </Row>
      </div>
    );
  }

  renderAbout() {
    const policy = (this.props.initialValues || {});

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>About</h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Policy Name" value={_.get(policy, ['name'], '')} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Policy Description" value={_.get(policy, ['description'], '-')} />
          </Col>
        </Row>
      </div>
    );
  }

  renderRewals() {
    const policy = this.props.initialValues || {};
    const unlimited = (_.get(policy, ['renewalsPolicy', 'unlimited'])) ? 'Yes' : 'No';
    const differentPeriod = (_.get(policy, ['renewalsPolicy', 'differentPeriod'])) ? 'Yes' : 'No';
    const renewFromId = _.get(policy, ['renewalsPolicy', 'renewFromId'], 0);
    const renewFrom = _.find(renewFromOptions, r => r.id === parseInt(renewFromId, 10));
    const intervalId = _.get(policy, ['renewalsPolicy', 'period', 'intervalId']);
    const interval = _.find(intervalPeriods, intr => intr.id === parseInt(intervalId, 10));

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>Renewals</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue label="Unlimited renewals" value={unlimited} />
          </Col>
        </Row>
        {policy.renewalsPolicy && policy.renewalsPolicy.unlimited === false &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue label="Number of renewals allowed" value={_.get(policy, ['renewalsPolicy', 'numberAllowed'], 0)} />
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Renew from" value={_.get(renewFrom, ['label'], '-')} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Renewal period different from original loan" value={differentPeriod} />
          </Col>
        </Row>
        {(policy.renewalsPolicy && policy.renewalsPolicy.differentPeriod && policy.loansPolicy.profileId === '2') &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue label="Alternate loan period for renewals" value={`${_.get(policy, ['renewalsPolicy', 'period', 'duration'])} ${_.get(interval, ['label'], '-')}`} />
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
        {policy.renewable && this.renderRewals()}
      </div>
    );
  }
}

export default LoanPolicyDetail;
