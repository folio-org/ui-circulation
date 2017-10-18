import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import Layer from '@folio/stripes-components/lib/Layer';

import { loanProfileTypes, intervalPeriods, dueDateManagementOptions, renewFromOptions } from '../constants';
import LoanPolicyForm from './LoanPolicyForm';

class LoanPolicyDetail extends React.Component {

  static propTypes = {
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      connect: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired,
    }).isRequired,
    paneWidth: PropTypes.string.isRequired,
    resources: PropTypes.shape({
      editMode: PropTypes.shape({
        mode: PropTypes.bool,
      }),
    }),
    mutator: PropTypes.shape({
      editMode: PropTypes.shape({
        replace: PropTypes.func,
      }),
    }),
    match: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }).isRequired,
    onClose: PropTypes.func,
    okapi: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    policy: PropTypes.object,
  };

  static manifest = Object.freeze({
    editMode: { initialValue: { mode: false } },
  });

  constructor(props) {
    super(props);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onCloseEdit = this.onCloseEdit.bind(this);
  }

  onClickEdit() {
    this.props.mutator.editMode.replace({ mode: true });
  }

  onUpdate() {

  }

  onCloseEdit(e) {
    e.preventDefault();
    this.props.mutator.editMode.replace({ mode: false });
  }

  getInterval(id) {
    return _.find(intervalPeriods, intr => intr.id === parseInt(id, 10));
  }

  renderLoans() {
    const policy = (this.props.policy || {});
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
                  value={`${_.get(policy, ['loansPolicy', 'period', 'duration'], '')} ${_.get(periodInterval, ['label'], '-')}`} />
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
    const policy = (this.props.policy || {});

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
    const policy = this.props.policy || {};
    const altRenewalScheduleLabel = (policy.loansPolicy && policy.loansPolicy.profileId === '2')
      ? 'Alternate fixed due date schedule (due date limit) for renewals'
      : 'Alternate fixed due date schedule for renewals';


    const unlimited = (_.get(policy, ['renewalsPolicy', 'unlimited'])) ? 'Yes' : 'No';
    const differentPeriod = (_.get(policy, ['renewalsPolicy', 'differentPeriod'])) ? 'Yes' : 'No';

    const renewFromId = _.get(policy, ['renewalsPolicy', 'renewFromId'], 0);
    const renewFrom = _.find(renewFromOptions, r => r.id == renewFromId);
    const intervalId = _.get(policy, ['renewalsPolicy', 'period', 'intervalId']);
    const interval = _.find(intervalPeriods, intr => intr.id == intervalId);

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
    const location = this.props.location;
    const policy = this.props.policy || {};
    const query = location.search ? queryString.parse(location.search) : {};
    const detailMenu = (
      <PaneMenu>
        <button id="clickable-edituser" onClick={this.onClickEdit} title="Edit Loan Policy"><Icon icon="edit" />Edit</button>
      </PaneMenu>
    );

    return (
      <Pane defaultWidth={this.props.paneWidth} paneTitle="Loan Policy Details" lastMenu={detailMenu} dismissible onClose={this.props.onClose}>
        {this.renderAbout()}
        <hr />
        {policy.loanable && this.renderLoans()}
        <hr />
        {policy.renewable && this.renderRewals()}

        <Layer isOpen={this.props.resources.editMode ? this.props.resources.editMode.mode : false} label="Edit Loan Policy">
          <LoanPolicyForm
            initialValues={policy}
            onSubmit={(record) => { this.onUpdate(record); }}
            onCancel={this.onCloseEdit}
            okapi={this.props.okapi}
          />
        </Layer>
      </Pane>
    );
  }
}

export default LoanPolicyDetail;
