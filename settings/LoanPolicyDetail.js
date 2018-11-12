import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { stripesShape } from '@folio/stripes/core';
import { Accordion, Col, ExpandAllButton, KeyValue, Row } from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import {
  loanProfileTypes,
  renewFromOptions,
  loanProfileMap,
  renewFromIds,
  shortTermLoansOptions,
  longTermLoansOptions,
} from '../constants';

class LoanPolicyDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    intl: intlShape.isRequired,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);

    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.state = {
      sections: {
        generalInformation: true,
      },
    };

    this.cViewMetaData = props.stripes.connect(ViewMetaData);
  }

  handleExpandAll(sections) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = sections;
      return newState;
    });
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  getClosedLibraryDueDateManagementItem = (selectedItemId) => {
    const availableLoansOptions = [
      ...shortTermLoansOptions,
      ...longTermLoansOptions,
    ];
    debugger;

    return _.find(availableLoansOptions, loanOption => loanOption.id === selectedItemId);
  };

  renderLoans() {
    const {
      intl: { formatMessage },
      initialValues,
      parentResources,
    } = this.props;

    const policy = initialValues || {};
    const fixedDueDateSchedules = ((parentResources || {}).fixedDueDateSchedules || {}).records || [];

    let dueDateScheduleFieldLabel = formatMessage({ id: 'ui-circulation.settings.loanPolicy.fDDS' });
    if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) {
      dueDateScheduleFieldLabel = formatMessage({ id: 'ui-circulation.settings.loanPolicy.fDDSlimit' });
    }

    let schedule = {};
    if (policy.loansPolicy && policy.loansPolicy.fixedDueDateScheduleId) {
      schedule = fixedDueDateSchedules.find(s => s.id === policy.loansPolicy.fixedDueDateScheduleId);
    }

    const profileId = _.get(policy, ['loansPolicy', 'profileId']);
    const profile = _.find(loanProfileTypes, t => t.value === profileId);
    const ddId = _.get(policy, ['loansPolicy', 'closedLibraryDueDateManagementId']);
    const closedLibraryDueDateManagementItem = this.getClosedLibraryDueDateManagementItem(ddId);
    const periodInterval = _.get(policy, ['loansPolicy', 'period', 'intervalId']);
    const exReqPerInterval = _.get(policy, ['loansPolicy', 'existingRequestsPeriod', 'intervalId']);
    const gracePeriodInterval = _.get(policy, ['loansPolicy', 'gracePeriod', 'intervalId']);

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
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.loanProfile' })}
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
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.loanPeriod' })}
                  value={`${_.get(policy, ['loansPolicy', 'period', 'duration'], '')} ${periodInterval}`}
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
            <KeyValue
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.closedDueDateMgmt' })}
              value={_.get(closedLibraryDueDateManagementItem, ['label'], '-')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.alternateLoanPeriodExisting' })}
              value={`${_.get(policy, ['loansPolicy', 'existingRequestsPeriod', 'duration'], '')} ${exReqPerInterval}`}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.gracePeriod' })}
              value={`${_.get(policy, ['loansPolicy', 'gracePeriod', 'duration'], '')} ${gracePeriodInterval}`}
            />
          </Col>
        </Row>
      </div>
    );
  }

  renderAbout() {
    const policy = (this.props.initialValues || {});
    const { formatMessage } = this.props.intl;

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
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.policyName' })}
              value={_.get(policy, ['name'], '')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.policyDescription' })}
              value={_.get(policy, ['description'], '-')}
            />
          </Col>
        </Row>
      </div>
    );
  }

  renderRenewals() {
    const { formatMessage } = this.props.intl;
    const policy = this.props.initialValues || {};
    const unlimited = (_.get(policy, ['renewalsPolicy', 'unlimited'])) ? 'Yes' : 'No';
    const differentPeriod = (_.get(policy, ['renewalsPolicy', 'differentPeriod'])) ? 'Yes' : 'No';
    const renewFromId = _.get(policy, ['renewalsPolicy', 'renewFromId'], renewFromIds.SYSTEM_DATE);
    const renewFrom = _.find(renewFromOptions, r => r.value === renewFromId);
    const interval = _.get(policy, ['renewalsPolicy', 'period', 'intervalId']);

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
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.unlimitedRenewals' })}
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
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.numRenewalsAllowed' })}
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
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewFrom' })}
              value={_.get(renewFrom, ['label'], '-')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewalPeriodDifferent' })}
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
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals' })}
                  value={`${_.get(policy, ['renewalsPolicy', 'period', 'duration'])} ${interval}`}
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
    const { formatMessage } = this.props.intl;
    const { sections } = this.state;

    return (
      <div>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
          </Col>
        </Row>
        <Accordion
          open={sections.generalInformation}
          id="generalInformation"
          onToggle={this.handleSectionToggle}
          label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.generalInformation' })}
        >
          {policy.metadata && policy.metadata.createdDate &&
            <Row>
              <Col xs={12}>
                <this.cViewMetaData metadata={policy.metadata} />
              </Col>
            </Row>
          }

          {this.renderAbout()}
          <hr />
          {policy.loanable && this.renderLoans()}
          <hr />
          {policy.renewable && this.renderRenewals()}

        </Accordion>
      </div>
    );
  }
}

export default injectIntl(LoanPolicyDetail);
