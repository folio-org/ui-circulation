import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl';
import {
  get,
  find,
  isNull,
  isEmpty,
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
  shortTermLoansOptions,
  longTermLoansOptions,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  intervalIdsMap,
  intervalPeriods,
} from '../../constants';

import RequestManagementSection from './components/ViewSections/RequestManagementSection';

class LoanPolicyDetail extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
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

  getPeriodValue = (pathToPeriod) => {
    const {
      initialValues: loanPolicy,
      intl: {
        formatMessage,
      },
    } = this.props;

    const period = get(loanPolicy, pathToPeriod);

    if (isEmpty(period)) {
      return '-';
    }

    const itervalIdKey = find(intervalPeriods, ({ value }) => value === period.intervalId).label;

    return `${period.duration} ${formatMessage({ id: itervalIdKey })}`;
  };

  getDropdownValue = (pathToValue, items) => {
    const { initialValues: loanPolicy } = this.props;

    const seletedValue = get(loanPolicy, pathToValue);
    const selectedItem = find(items, (item) => item.value === seletedValue);

    return selectedItem ? selectedItem.label : null;
  };

  getTranslatedDropdownValue = (pathToValue, items) => {
    const translationKey = this.getDropdownValue(pathToValue, items);

    return isNull(translationKey) ? null : <FormattedMessage id={translationKey} />;
  };

  getCheckboxValue = (pathToValue) => {
    const { initialValues: loanPolicy } = this.props;

    const seletedValue = get(loanPolicy, pathToValue);

    return seletedValue
      ? <FormattedMessage id="ui-circulation.settings.common.yes" />
      : <FormattedMessage id="ui-circulation.settings.common.no" />;
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
    const isOpeningTimeOffsetVisible = this.isOpeningTimeOffsetVisible();

    return (
      <div data-test-loan-policy-detail-loans-section>
        <Row>
          <Col xs={12}>
            <h2
              data-test-loans-section-header
              style={{ marginTop: '0' }}
            >
              <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
            </h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <div data-test-loans-section-loan-profile>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile" />}
                value={<FormattedMessage id={get(profile, ['label'])} />}
              />
            </div>
          </Col>
        </Row>
        {policy.loansPolicy.profileId === loanProfileMap.ROLLING &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <div data-test-loans-section-loan-period>
                  <KeyValue
                    label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanPeriod" />}
                    value={this.getPeriodValue('loansPolicy.period')}
                  />
                </div>
              </Col>
            </Row>
          </div>
        }
        {(policy.loansPolicy && policy.loansPolicy.profileId !== loanProfileMap.INDEFINITE) &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <div data-test-loans-section-due-date-schedule>
                  <KeyValue
                    label={dueDateScheduleFieldLabel}
                    value={get(schedule, ['name'], '-')}
                  />
                </div>
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <div data-test-loans-section-closed-due-date-mgmte>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
                value={<FormattedMessage id={get(closedLibraryDueDateManagementItem, ['label'], '-')} />}
              />
            </div>
          </Col>
        </Row>
        <br />
        {isOpeningTimeOffsetVisible &&
        <div>
          <Row>
            <Col xs={12}>
              <div data-test-loans-section-opening-time-offset>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.openingTimeOffset" />}
                  value={this.getPeriodValue('loansPolicy.openingTimeOffset')}
                />
              </div>
            </Col>
          </Row>
          <br />
        </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <div data-test-loans-section-grace-period>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.gracePeriod" />}
                value={this.getPeriodValue('loansPolicy.gracePeriod')}
              />
            </div>
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
      <div data-test-loan-policy-detail-about-section>
        <Row>
          <Col xs={12}>
            <h2
              style={{ marginTop: '0' }}
              data-test-about-section-header
            >
              <FormattedMessage id="ui-circulation.settings.loanPolicy.about" />
            </h2>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <div data-test-about-section-policy-name>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyName" />}
                value={get(policy, ['name'], '')}
              />
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <div data-test-about-section-policy-description>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
                value={get(policy, ['description'], '-')}
              />
            </div>
          </Col>
        </Row>
        <hr />
      </div>
    );
  }

  renderRenewals() {
    const {
      initialValues: policy = {},
      parentResources,
    } = this.props;

    const renewFromId = get(policy, ['renewalsPolicy', 'renewFromId']);
    const renewFrom = find(renewFromOptions, r => r.value === renewFromId);
    const altRenewalScheduleLabel = policy.loanable && policy.loansPolicy.profileId === loanProfileMap.ROLLING
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSDueDateLimit" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.view.altFDDSforRenewals" />;

    const fixedDueDateSchedules = get(parentResources, 'fixedDueDateSchedules.records', []);
    const schedule = fixedDueDateSchedules.find(s => s.id === policy.renewalsPolicy.alternateFixedDueDateScheduleId);

    return (
      <div data-test-loan-policy-detail-renewals-section>
        <Row>
          <Col xs={12}>
            <h2
              style={{ marginTop: '0' }}
              data-test-renewals-section-header
            >
              <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div data-test-renewals-section-unlimited-renewals>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
                value={this.getCheckboxValue('renewalsPolicy.unlimited')}
              />
            </div>
          </Col>
        </Row>
        {policy.renewalsPolicy && policy.renewalsPolicy.unlimited === false &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <div data-test-renewals-section-number-renewals-allowed>
                  <KeyValue
                    label={<FormattedMessage id="ui-circulation.settings.loanPolicy.numRenewalsAllowed" />}
                    value={get(policy, ['renewalsPolicy', 'numberAllowed'], 0)}
                  />
                </div>
              </Col>
            </Row>
          </div>
        }
        <br />
        <Row>
          <Col xs={12}>
            <div data-test-renewals-section-renew-from>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
                value={<FormattedMessage id={get(renewFrom, ['label'])} />}
              />
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col xs={12}>
            <div data-test-renewals-section-renewal-period-different>
              <KeyValue
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
                value={this.getCheckboxValue('renewalsPolicy.differentPeriod')}
              />
            </div>
          </Col>
        </Row>
        {(policy.renewalsPolicy && policy.renewalsPolicy.differentPeriod && policy.loansPolicy.profileId === loanProfileMap.ROLLING) &&
        <div>
          <br />
          <Row>
            <Col xs={12}>
              <div data-test-renewals-section-alternate-loan-period-renewals>
                <KeyValue
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals" />}
                  value={this.getPeriodValue('renewalsPolicy.period')}
                />
              </div>
            </Col>
          </Row>
        </div>
        }
        {(policy.renewalsPolicy && policy.renewalsPolicy.differentPeriod) &&
          <div>
            <br />
            <Row>
              <Col xs={12}>
                <div data-test-renewals-section-alternate-fixed-due-date-schedule-id>
                  <KeyValue
                    label={altRenewalScheduleLabel}
                    value={get(schedule, ['name'], '-')}
                  />
                </div>
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
      <div data-test-loan-policy-detail>
        <Row end="xs">
          <Col
            data-test-expand-all
            xs
          >
            <ExpandAllButton
              accordionStatus={sections}
              onToggle={this.handleExpandAll}
            />
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

export default injectIntl(LoanPolicyDetail);
