import React from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import _ from 'lodash';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';
import { FormattedMessage } from 'react-intl';

import {
  loanProfileTypes,
  intervalPeriods,
  dueDateManagementOptions,
  renewFromOptions,
  intervalIdsMap,
  loanProfileMap
} from '../constants';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    resources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    change: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.validateField = this.validateField.bind(this);
  }

  getCurrentValues() {
    const { stripes: { store } } = this.props;
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

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const policy = this.getCurrentValues();

    // Conditional field labels
    let dueDateScheduleFieldLabel = formatMsg({ id: 'ui-circulation.settings.loanPolicy.fDDS' });
    let altRenewalScheduleLabel = formatMsg({ id: 'ui-circulation.settings.loanPolicy.altFDDSforRenewals' });
    if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) {
      dueDateScheduleFieldLabel = formatMsg({ id: 'ui-circulation.settings.loanPolicy.fDDSlimit' });
      altRenewalScheduleLabel = formatMsg({ id: 'ui-circulation.settings.loanPolicy.altFDDSDueDateLimit' });
    } else if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.FIXED) {
      dueDateScheduleFieldLabel += ' *';
    }

    const schedules = _.sortBy((this.props.resources.fixedDueDateSchedules || {}).records || [], ['name'])
      .map(schedule => (
        {
          id: schedule.id,
          value: schedule.id,
          label: schedule.name,
        }));

    return (
      <div>
        {/* Primary information: policy name and description, plus delete button */}
        <h2 style={{ marginTop: '0' }}>About</h2>
        <Field
          label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.policyName' })}
          autoFocus
          name="name"
          component={TextField}
          required
          fullWidth
          rounded
          validate={this.validateField}
        />
        <Field
          label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.policyDescription' })}
          name="description"
          component={TextArea}
          fullWidth
          rounded
          validate={this.validateField}
        />
        <hr />

        {/* Loan detail section */}
        <h2>
          <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
        </h2>
        {/* loanable: boolean determining visibility of all subsequent elements */}
        <Field
          label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.loanable' })}
          id="loanable"
          name="loanable"
          component={Checkbox}
          normalize={v => !!v}
        />
        {/* loan profile. Value affects visibility of several subsequent elements */}
        { policy.loanable &&
          <Field
            label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.loanProfile' })}
            name="loansPolicy.profileId"
            component={Select}
            dataOptions={loanProfileTypes}
            validate={this.validateField}
          />
        }
        {/* loan period - only appears when profile is "rolling" */}
        { (policy.loanable && policy.loansPolicy.profileId === loanProfileMap.ROLLING) &&
          <div>
            <p>
              <FormattedMessage id="ui-circulation.settings.loanPolicy.loanPeriod" />
            </p>
            <Row>
              <Col xs={2}>
                <Field label="" name="loansPolicy.period.duration" component={TextField} rounded validate={this.validateField} />
              </Col>
              <Col>
                <Field
                  label=""
                  name="loansPolicy.period.intervalId"
                  component={Select}
                  placeholder={formatMsg({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
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
            name="loansPolicy.fixedDueDateSchedule"
            component={Select}
            placeholder={formatMsg({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' })}
            dataOptions={schedules}
          />
        }
        {/* closed library due date management - Select */}
        { policy.loanable &&
          <Field
            label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.closedDueDateMgmt' })}
            name="loansPolicy.closedLibraryDueDateManagementId"
            component={Select}
            dataOptions={dueDateManagementOptions}
            validate={this.validateField}
          />
        }
        {/* skip closed dates - boolean */}
        { policy.loanable &&
          <Field
            label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.skipClosedDates' })}
            id="loansPolicy.skipClosed"
            name="loansPolicy.skipClosed"
            component={Checkbox}
            validate={this.validateField}
            normalize={v => !!v}
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
                  rounded
                  validate={this.validateField}
                />
              </Col>
              <Col>
                <Field
                  label=""
                  name="loansPolicy.existingRequestsPeriod.intervalId"
                  component={Select}
                  placeholder={formatMsg({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
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
                  rounded
                  validate={this.validateField}
                />
              </Col>
              <Col>
                <Field
                  label=""
                  name="loansPolicy.gracePeriod.intervalId"
                  component={Select}
                  placeholder={formatMsg({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
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
              label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.renewable' })}
              name="renewable"
              component={Checkbox}
              id="renewable"
              validate={this.validateField}
              normalize={v => !!v}
            />
            {/* unlimited renewals (bool) */}
            { policy.renewable &&
              <Field
                label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.unlimitedRenewals' })}
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
                      component={TextField}
                      required
                      rounded
                      validate={this.validateField}
                    />
                  </Col>
                </Row>
              </div>
            }
            {/* renew from */}
            { policy.renewable &&
              <Field
                label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.renewFrom' })}
                name="renewalsPolicy.renewFromId"
                component={Select}
                dataOptions={renewFromOptions}
                validate={this.validateField}
              />
            }
            {/* different renewal period (bool) */}
            { policy.renewable &&
              <Field
                label={formatMsg({ id: 'ui-circulation.settings.loanPolicy.renewalPeriodDifferent' })}
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
                      rounded
                      validate={this.validateField}
                    />
                  </Col>
                  <Col>
                    <Field
                      label=""
                      name="renewalsPolicy.period.intervalId"
                      component={Select}
                      placeholder={formatMsg({ id: 'ui-circulation.settings.loanPolicy.selectInterval' })}
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
                placeholder={formatMsg({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' })}
                dataOptions={schedules}
              />
            }
          </fieldset>
        }
      </div>
    );
  }
}

export default LoanPolicyForm;
