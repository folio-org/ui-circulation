import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import transitionToParams from '@folio/stripes-components/util/transitionToParams';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Icon from '@folio/stripes-components/lib/Icon';
import Layer from '@folio/stripes-components/lib/Layer';

import { loanProfileTypes, intervalPeriods, dueDateManagementOptions, renewFromOptions } from '../constants';

class LoanPolicyDetail extends React.Component {

  static propTypes = {
    stripes: PropTypes.shape({
      hasPerm: PropTypes.func.isRequired,
      connect: PropTypes.func.isRequired,
      locale: PropTypes.string.isRequired,
      logger: PropTypes.shape({
        log: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    paneWidth: PropTypes.string.isRequired,
    resources: PropTypes.shape({

    }),
    mutator: PropTypes.shape({

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

  });

  constructor(props) {
    super(props);
    this.onClickEdit = this.onClickEdit.bind(this);
  }

  onClickEdit() {

  }

  renderLoans() {
    const policy = (this.props.policy || {});
    let dueDateScheduleFieldLabel = 'Fixed due date schedule';
    if (policy.loansPolicy && policy.loansPolicy.profileId === '2') {
      dueDateScheduleFieldLabel += ' (due date limit)';
    }

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
            <KeyValue label="Loans Profile" value={_.get(policy, ['loansPolicy', 'profileId'], '-')} />
          </Col>
        </Row>

        {/* loan period - only appears when profile is "rolling" */}
        {policy.loansPolicy.profileId === '2' &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue
                  label="Loan period"
                  value={`${_.get(policy, ['loansPolicy', 'period', 'duration'], '')} ${_.get(policy, ['loansPolicy', 'period', 'intervalId'], '-')}`} />
              </Col>
            </Row>
          </div>
        }

        {/* fixed due date schedule - appears when profile is "fixed" or "rolling", but with different labels */}
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

        {/* closed library due date management - Select */}
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Closed library due date management" value={_.get(policy, ['loansPolicy', 'closedLibraryDueDateManagementId'], '-')} />
          </Col>
        </Row>

        {/* skip closed dates - boolean */}
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Skip closed dates in intervening period" value={_.get(policy, ['loansPolicy', 'skipClosed'], '-')} />
          </Col>
        </Row>

        {/* alternate loan period */}
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label="Alternate loan period for items with existing requests"
              value={`${_.get(policy, ['loansPolicy', 'existingRequestsPeriod', 'duration'], '')} ${_.get(policy, ['loansPolicy', 'existingRequestsPeriod', 'intervalId'], '')}`}
            />
          </Col>
        </Row>

        {/* grace period */}
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label="Grace period"
              value={`${_.get(policy, ['loansPolicy', 'gracePeriod', 'duration'], '')} ${_.get(policy, ['loansPolicy', 'gracePeriod', 'intervalId'], '-')}`}
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


    console.log('policy', policy);
    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 style={{ marginTop: '0' }}>Renewals</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue label="Unlimited renewals" value={_.get(policy, ['renewalsPolicy', 'unlimited'], '-')} />
          </Col>
        </Row>
        {policy.renewalsPolicy && policy.renewalsPolicy.unlimited === false &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue label="Number of renewals allowed" value={_.get(policy, ['renewalsPolicy', 'numberAllowed'], '-')} />
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Renew from" value={_.get(policy, ['renewalsPolicy', 'renewFromId'], '-')} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue label="Renewal period different from original loan" value={_.get(policy, ['renewalsPolicy', 'differentPeriod'], '-')} />
          </Col>
        </Row>
        {(policy.renewalsPolicy && policy.renewalsPolicy.differentPeriod && policy.loansPolicy.profileId === '2') &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue label="Alternate loan period for renewals" value={`${_.get(policy, ['renewalsPolicy', 'period', 'duration'], '')} ${_.get(policy, ['renewalsPolicy', 'period', 'intervalId'], '-')}`} />
              </Col>
            </Row>
          </div>
        }
        {(policy.renewalsPolicy && policy.renewalsPolicy.differentPeriod && policy.loansPolicy.profileId !== '3') &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue label={altRenewalScheduleLabel} value={_.get(policy, ['renewalsPolicy'], '-')} />
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }

  render() {
    const policy = (this.props.policy || {});
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
      </Pane>
    );
  }
}

export default LoanPolicyDetail;
