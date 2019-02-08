import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  get,
  find,
} from 'lodash';

import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  ExpandAllButton,
  KeyValue,
  Col,
  Row,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import {
  loanProfileTypes,
  renewFromOptions,
  loanProfileMap,
  renewFromIds,
  shortTermLoansOptions,
  longTermLoansOptions,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  intervalIdsMap,
} from '../../constants';

import RequestManagementSection from './components/ViewSections/RequestManagementSection';

class LoanPolicyDetail extends React.Component {
  static propTypes = {
    initialValues: PropTypes.object,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      sections: {
        generalInformation: true,
        recalls: true,
        holds: true,
      },
    };

    this.cViewMetaData = props.stripes.connect(ViewMetaData);
  }

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const sections = { ...state.sections };
      sections[id] = !sections[id];
      return { sections };
    });
  };

  getClosedLibraryDueDateManagementItem = (selectedItemId) => {
    const availableLoansOptions = [
      ...shortTermLoansOptions,
      ...longTermLoansOptions,
    ];

    return find(availableLoansOptions, loanOption => loanOption.id === selectedItemId);
  };

  isOpeningTimeOffsetVisible = () => {
    const policy = this.props.initialValues || {};
    const {
      loanable,
      loansPolicy: {
        closedLibraryDueDateManagementId,
        profileId,
        period: {
          intervalId = '',
        } = {},
      },
    } = policy;

    const isProfileRolling = profileId === loanProfileMap.ROLLING;
    const isShortTermPeriod = intervalId === intervalIdsMap.MINUTES || intervalId === intervalIdsMap.HOURS;
    const isBeginningOfNextOpenServicePointHours = closedLibraryDueDateManagementId === BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS;

    return loanable && isProfileRolling && isShortTermPeriod && isBeginningOfNextOpenServicePointHours;
  };

  renderLoans() {
    const {
      initialValues,
      parentResources,
    } = this.props;

    const policy = initialValues || {};
    const fixedDueDateSchedules = ((parentResources || {}).fixedDueDateSchedules || {}).records || [];

    let dueDateScheduleFieldLabel = <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDS" />;
    if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) {
      dueDateScheduleFieldLabel = <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSlimit" />;
    }

    let schedule = {};
    if (policy.loansPolicy && policy.loansPolicy.fixedDueDateScheduleId) {
      schedule = fixedDueDateSchedules.find(s => s.id === policy.loansPolicy.fixedDueDateScheduleId);
    }

    const profileId = get(policy, ['loansPolicy', 'profileId']);
    const profile = find(loanProfileTypes, t => t.value === profileId);
    const ddId = get(policy, ['loansPolicy', 'closedLibraryDueDateManagementId']);
    const closedLibraryDueDateManagementItem = this.getClosedLibraryDueDateManagementItem(ddId);
    const periodInterval = get(policy, ['loansPolicy', 'period', 'intervalId']);
    const gracePeriodInterval = get(policy, ['loansPolicy', 'gracePeriod', 'intervalId'], '-');
    const timeOffsetInterval = get(policy, ['loansPolicy', 'openingTimeOffset', 'intervalId']);
    const isOpeningTimeOffsetVisible = this.isOpeningTimeOffsetVisible();

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
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile" />}
              value={get(profile, ['label'], '-')}
            />
          </Col>
        </Row>
        {policy.loansPolicy.profileId === loanProfileMap.ROLLING &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanPeriod" />}
                  value={`${get(policy, ['loansPolicy', 'period', 'duration'], '')} ${periodInterval}`}
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
                <KeyValue label={dueDateScheduleFieldLabel} value={get(schedule, ['name'], '-')} />
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
              value={get(closedLibraryDueDateManagementItem, ['label'], '-')}
            />
          </Col>
        </Row>
        <br />
        {isOpeningTimeOffsetVisible &&
          <div>
            <Row>
              <Col xs={12}>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.openingTimeOffset" />}
                  value={`${get(policy, ['loansPolicy', 'openingTimeOffset', 'duration'], '')} ${timeOffsetInterval}`}
                />
              </Col>
            </Row>
            <br />
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.gracePeriod" />}
              value={`${get(policy, ['loansPolicy', 'gracePeriod', 'duration'], '')} ${gracePeriodInterval}`}
            />
          </Col>
        </Row>
        <hr />
      </div>
    );
  }

  renderAbout() {
    const {
      initialValues: policy = {},
    } = this.props;

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
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyName" />}
              value={get(policy, ['name'], '')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
              value={get(policy, ['description'], '-')}
            />
          </Col>
        </Row>
        <hr />
      </div>
    );
  }

  renderRenewals() {
    const { initialValues: policy = {} } = this.props;
    const unlimited = (get(policy, ['renewalsPolicy', 'unlimited']))
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.yes" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.no" />;
    const differentPeriod = (get(policy, ['renewalsPolicy', 'differentPeriod']))
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.yes" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.no" />;
    const renewFromId = get(policy, ['renewalsPolicy', 'renewFromId'], renewFromIds.SYSTEM_DATE);
    const renewFrom = find(renewFromOptions, r => r.value === renewFromId);
    const interval = get(policy, ['renewalsPolicy', 'period', 'intervalId']);

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
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
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
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.numRenewalsAllowed" />}
                  value={get(policy, ['renewalsPolicy', 'numberAllowed'], 0)}
                />
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
              value={get(renewFrom, ['label'], '-')}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <KeyValue
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
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
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals" />}
                  value={`${get(policy, ['renewalsPolicy', 'period', 'duration'])} ${interval}`}
                />
              </Col>
            </Row>
          </div>
        }
        <hr />
      </div>
    );
  }

  render() {
    const { initialValues: policy = {} } = this.props;
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
          label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
        >
          {policy.metadata && policy.metadata.createdDate &&
            <Row>
              <Col xs={12}>
                <this.cViewMetaData metadata={policy.metadata} />
              </Col>
            </Row>
          }

          {this.renderAbout()}
          {policy.loanable && this.renderLoans()}
          {policy.renewable && this.renderRenewals()}
          <RequestManagementSection
            isVisible={policy.loanable}
            isRecallsOpen={sections.recalls}
            isHoldsOpen={sections.holds}
            requestManagementOptions={policy.requestManagement}
            onSectionToggle={this.handleSectionToggle}
          />
        </Accordion>
      </div>
    );
  }
}

export default LoanPolicyDetail;
