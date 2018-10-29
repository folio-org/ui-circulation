import React from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import _ from 'lodash';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  Checkbox,
  Col,
  ExpandAllButton,
  Row,
  Select,
  TextArea,
  TextField
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';

import {
  loanProfileTypes,
  intervalPeriods,
  dueDateManagementOptions,
  renewFromOptions,
  intervalIdsMap,
  loanProfileMap,
} from '../constants';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.validateField = this.validateField.bind(this);

    this.handleExpandAll = this.handleExpandAll.bind(this);
    this.handleSectionToggle = this.handleSectionToggle.bind(this);
    this.cViewMetaData = props.stripes.connect(ViewMetaData);

    this.state = {
      sections: {
        generalSection: true,
      },
    };
  }

  getCurrentValues() {
    const { store } = this.props.stripes;
    const state = store.getState();
    return getFormValues('entryForm')(state) || {};
  }

  validateField(fieldValue, allValues) {
    const period = (allValues.loansPolicy && allValues.loansPolicy.period);
    if (period && period.duration && !period.intervalId) {
      this.props.change('loansPolicy.period.intervalId', intervalIdsMap.DAYS);
    }
    if (period && period.intervalId && !period.duration) {
      this.props.change('loansPolicy.period.duration', 1);
    }
    const existingPeriod = (allValues.loansPolicy && allValues.loansPolicy.existingRequestsPeriod);
    if (existingPeriod && existingPeriod.duration && !existingPeriod.intervalId) {
      this.props.change('loansPolicy.existingRequestsPeriod.intervalId', intervalIdsMap.DAYS);
    }
    if (existingPeriod && existingPeriod.intervalId && !existingPeriod.duration) {
      this.props.change('loansPolicy.existingRequestsPeriod.duration', 1);
    }
    const gracePeriod = (allValues.loansPolicy && allValues.loansPolicy.gracePeriod);
    if (gracePeriod && gracePeriod.duration && !gracePeriod.intervalId) {
      this.props.change('loansPolicy.gracePeriod.intervalId', intervalIdsMap.DAYS);
    }
    if (gracePeriod && gracePeriod.intervalId && !gracePeriod.duration) {
      this.props.change('loansPolicy.gracePeriod.duration', 1);
    }
    const altRenewPeriod = (allValues.renewalsPolicy && allValues.renewalsPolicy.period);
    if (altRenewPeriod && altRenewPeriod.duration && !altRenewPeriod.intervalId) {
      this.props.change('renewalsPolicy.period.intervalId', intervalIdsMap.DAYS);
    }
    if (altRenewPeriod && altRenewPeriod.intervalId && !altRenewPeriod.duration) {
      this.props.change('renewalsPolicy.period.duration', 1);
    }
  }

  handleSectionToggle({ id }) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  }

  handleExpandAll(sections) {
    this.setState((curState) => {
      const newState = _.cloneDeep(curState);
      newState.sections = sections;
      return newState;
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const policy = this.getCurrentValues();
    const { sections } = this.state;

    // Conditional field labels
    let dueDateScheduleFieldLabel = formatMessage({ id: 'ui-circulation.settings.loanPolicy.fDDS' });
    let altRenewalScheduleLabel = formatMessage({ id: 'ui-circulation.settings.loanPolicy.altFDDSforRenewals' });
    if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) {
      dueDateScheduleFieldLabel = formatMessage({ id: 'ui-circulation.settings.loanPolicy.fDDSlimit' });
      altRenewalScheduleLabel = formatMessage({ id: 'ui-circulation.settings.loanPolicy.altFDDSDueDateLimit' });
    } else if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.FIXED) {
      dueDateScheduleFieldLabel += ' *';
    }

    const schedules = _.sortBy((this.props.parentResources.fixedDueDateSchedules || {}).records || [], ['name'])
      .map(schedule => (
        {
          id: schedule.id,
          value: schedule.id,
          label: schedule.name,
        }));

    return (
      <div>
        <Row end="xs">
          <Col xs>
            <ExpandAllButton accordionStatus={sections} onToggle={this.handleExpandAll} />
          </Col>
        </Row>
        <Accordion
          open={sections.generalSection}
          id="generalSection"
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

          {/* Primary information: policy name and description, plus delete button */}
          <h2 style={{ marginTop: '0' }}>About</h2>
          <Field
            label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.policyName' })}
            autoFocus
            name="name"
            id="input_policy_name"
            component={TextField}
            required
            fullWidth
            validate={this.validateField}
          />
          <Field
            label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.policyDescription' })}
            name="description"
            component={TextArea}
            fullWidth
            validate={this.validateField}
          />
          <hr />

          {/* Loan detail section */}
          <h2>
            <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
          </h2>
          {/* loanable: boolean determining visibility of all subsequent elements */}
          <Field
            label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.loanable' })}
            id="loanable"
            name="loanable"
            component={Checkbox}
            normalize={v => !!v}
          />
          {/* loan profile. Value affects visibility of several subsequent elements */}
          { policy.loanable &&
            <Field
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.loanProfile' })}
              name="loansPolicy.profileId"
              id="input_loan_profile"
              component={Select}
              dataOptions={loanProfileTypes}
              validate={this.validateField}
            />
          }
          {/* loan period - only appears when profile is "rolling" */}
          { (policy.loanable && policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) &&
            <div>
              <p>
                <FormattedMessage id="ui-circulation.settings.loanPolicy.loanPeriod" />
              </p>
              <Row>
                <Col xs={2}>
                  <Field label="" name="loansPolicy.period.duration" id="input_loan_period" component={TextField} validate={this.validateField} />
                </Col>
                <Col>
                  <Field
                    label=""
                    name="loansPolicy.period.intervalId"
                    id="select_policy_period"
                    component={Select}
                    placeholder={formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
                    dataOptions={intervalPeriods}
                    validate={this.validateField}
                  />
                </Col>
              </Row>
            </div>
          }
          {/* fixed due date schedule - appears when profile is "fixed" or "rolling",
              but with different labels */}
          { (policy.loanable && policy.loansPolicy && policy.loansPolicy.profileId !== loanProfileMap.INDEFINITE) &&
            <Field
              label={dueDateScheduleFieldLabel}
              name="loansPolicy.fixedDueDateScheduleId"
              id="input_loansPolicy_fixedDueDateSchedule"
              component={Select}
              normalize={value => (value === '' ? null : value)}
              dataOptions={[{ label: formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' }), value: '' }, ...schedules]}
            />
          }
          {/* closed library due date management - Select */}
          { policy.loanable &&
            <Field
              label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.closedDueDateMgmt' })}
              name="loansPolicy.closedLibraryDueDateManagementId"
              component={Select}
              dataOptions={dueDateManagementOptions}
              validate={this.validateField}
            />
          }
          {/* alternate loan period */}
          { policy.loanable &&
            <div>
              <p>
                <FormattedMessage id="ui-circulation.settings.loanPolicy.alternateLoanPeriodExisting" />
              </p>
              <Row>
                <Col xs={2}>
                  <Field
                    label=""
                    name="loansPolicy.existingRequestsPeriod.duration"
                    component={TextField}
                    validate={this.validateField}
                  />
                </Col>
                <Col>
                  <Field
                    label=""
                    name="loansPolicy.existingRequestsPeriod.intervalId"
                    component={Select}
                    placeholder={formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
                    dataOptions={intervalPeriods.slice(0, 3)}
                    validate={this.validateField}
                  />
                </Col>
              </Row>
            </div>
          }
          {/* grace period */}
          { policy.loanable &&
            <div>
              <p>
                <FormattedMessage id="ui-circulation.settings.loanPolicy.gracePeriod" />
              </p>
              <Row>
                <Col xs={2}>
                  <Field
                    label=""
                    name="loansPolicy.gracePeriod.duration"
                    component={TextField}
                    validate={this.validateField}
                  />
                </Col>
                <Col>
                  <Field
                    label=""
                    name="loansPolicy.gracePeriod.intervalId"
                    component={Select}
                    placeholder={formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
                    dataOptions={intervalPeriods}
                    validate={this.validateField}
                  />
                </Col>
              </Row>
            </div>
          }

          {/* ************ renewals section ************* */}
          { policy.loanable &&
            <fieldset>
              <legend>
                <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
              </legend>

              {/*
                renewable (bool) - affects visibility of most subsequent fields
                (The normalize function used is needed to deal with an annoying behavior
                in current versions of redux-form in which values of 'false' are
                not handled properly -- see https://github.com/erikras/redux-form/issues/1993)
              */}
              <Field
                label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewable' })}
                name="renewable"
                component={Checkbox}
                id="renewable"
                validate={this.validateField}
                normalize={v => !!v}
              />
              {/* unlimited renewals (bool) */}
              { policy.renewable &&
                <Field
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.unlimitedRenewals' })}
                  name="renewalsPolicy.unlimited"
                  id="renewalsPolicy.unlimited"
                  component={Checkbox}
                  validate={this.validateField}
                  normalize={v => !!v}
                />
              }
              {/* number of renewals allowed */}
              { policy.renewable && policy.renewalsPolicy.unlimited === false &&
                <div>
                  <p>
                    <FormattedMessage id="ui-circulation.settings.loanPolicy.numRenewalsAllowed" />
                  </p>
                  <Row>
                    <Col xs={2}>
                      <Field
                        label=""
                        name="renewalsPolicy.numberAllowed"
                        id="input_allowed_renewals"
                        component={TextField}
                        required
                        validate={this.validateField}
                      />
                    </Col>
                  </Row>
                </div>
              }
              {/* renew from */}
              { policy.renewable &&
                policy.loansPolicy.profileId === loanProfileMap.ROLLING &&
                <Field
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewFrom' })}
                  name="renewalsPolicy.renewFromId"
                  id="select_renew_from"
                  component={Select}
                  dataOptions={renewFromOptions}
                  validate={this.validateField}
                />
              }
              {/* different renewal period (bool) */}
              { policy.renewable &&
                <Field
                  label={formatMessage({ id: 'ui-circulation.settings.loanPolicy.renewalPeriodDifferent' })}
                  name="renewalsPolicy.differentPeriod"
                  id="renewalsPolicy.differentPeriod"
                  component={Checkbox}
                  validate={this.validateField}
                  normalize={v => !!v}
                />
              }
              {/* alternate loan period for renewals ("rolling" profile only) */}
              { policy.renewable &&
                policy.renewalsPolicy.differentPeriod &&
                policy.loansPolicy.profileId === loanProfileMap.ROLLING &&
                <div>
                  <p>
                    <FormattedMessage id="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals" />
                  </p>
                  <Row>
                    <Col xs={2}>
                      <Field
                        label=""
                        name="renewalsPolicy.period.duration"
                        component={TextField}
                        validate={this.validateField}
                      />
                    </Col>
                    <Col>
                      <Field
                        label=""
                        name="renewalsPolicy.period.intervalId"
                        component={Select}
                        placeholder={formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
                        dataOptions={intervalPeriods}
                        validate={this.validateField}
                      />
                    </Col>
                  </Row>
                </div>
              }
              {/* alt fixed due date schedule for renewals - appears when profile is
                "fixed" or "rolling", but with different labels */}
              { policy.renewable &&
                policy.renewalsPolicy.differentPeriod &&
                policy.loansPolicy.profileId !== loanProfileMap.INDEFINITE &&
                <Field
                  label={altRenewalScheduleLabel}
                  name="renewalsPolicy.alternateFixedDueDateScheduleId"
                  component={Select}
                  normalize={value => (value === '' ? null : value)}
                  dataOptions={[{ label: formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' }), value: '' }, ...schedules]}
                />
              }
            </fieldset>
          }
        </Accordion>
      </div>
    );
  }
}

export default injectIntl(LoanPolicyForm);
