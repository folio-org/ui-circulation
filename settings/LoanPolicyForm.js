import React from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues } from 'redux-form';
import _ from 'lodash';
import Checkbox from '@folio/stripes-components/lib/Checkbox';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import TextField from '@folio/stripes-components/lib/TextField';
import TextArea from '@folio/stripes-components/lib/TextArea';

import { loanProfileTypes, intervalPeriods, dueDateManagementOptions, renewFromOptions } from '../constants';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    stripes: PropTypes.shape({
      store: PropTypes.object.isRequired,
    }).isRequired,
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
      this.props.change('loansPolicy.period.intervalId', 3);
    }
    if (period && period.intervalId && !period.duration) {
      this.props.change('loansPolicy.period.duration', 1);
    }
    const existingPeriod = (allValues.loansPolicy && allValues.loansPolicy.existingRequestsPeriod);
    if (existingPeriod && existingPeriod.duration && !existingPeriod.intervalId) {
      this.props.change('loansPolicy.existingRequestsPeriod.intervalId', 3);
    }
    if (existingPeriod && existingPeriod.intervalId && !existingPeriod.duration) {
      this.props.change('loansPolicy.existingRequestsPeriod.duration', 1);
    }
    const gracePeriod = (allValues.loansPolicy && allValues.loansPolicy.gracePeriod);
    if (gracePeriod && gracePeriod.duration && !gracePeriod.intervalId) {
      this.props.change('loansPolicy.gracePeriod.intervalId', 3);
    }
    if (gracePeriod && gracePeriod.intervalId && !gracePeriod.duration) {
      this.props.change('loansPolicy.gracePeriod.duration', 1);
    }
    const altRenewPeriod = (allValues.renewalsPolicy && allValues.renewalsPolicy.period);
    if (altRenewPeriod && altRenewPeriod.duration && !altRenewPeriod.intervalId) {
      this.props.change('renewalsPolicy.period.intervalId', 3);
    }
    if (altRenewPeriod && altRenewPeriod.intervalId && !altRenewPeriod.duration) {
      this.props.change('renewalsPolicy.period.duration', 1);
    }
  }

  render() {
    const policy = this.getCurrentValues();

    // Conditional field labels
    let dueDateScheduleFieldLabel = 'Fixed due date schedule';
    let altRenewalScheduleLabel = 'Alternate fixed due date schedule for renewals';
    if (policy.loansPolicy && policy.loansPolicy.profileId === '2') {
      dueDateScheduleFieldLabel += ' (due date limit)';
      altRenewalScheduleLabel = 'Alternate fixed due date schedule (due date limit) for renewals';
    }

    const schedules = _.sortBy((this.props.resources.fixedDueDateSchedules || {}).records || [], ['name'])
      .map(schedule => (
        {
          id: schedule.id,
          value: schedule.id,
          label: schedule.name,
        }),
      );

    return (
      <div>
        {/* Primary information: policy name and description, plus delete button */}
        <h2 style={{ marginTop: '0' }}>About</h2>
        <Field label="Policy name" autoFocus name="name" component={TextField} required fullWidth rounded validate={this.validateField} />
        <Field label="Policy description" name="description" component={TextArea} fullWidth rounded validate={this.validateField} />
        <hr />

        {/* Loan detail section */}
        <h2>Loans</h2>
        {/* loanable: boolean determining visibility of all subsequent elements */}
        <Field
          label="Loanable"
          id="loanable"
          name="loanable"
          component={Checkbox}
          normalize={v => !!v}
        />
        {/* loan profile. Value affects visibility of several subsequent elements */}
        { policy.loanable &&
          <Field
            label="Loan profile"
            name="loansPolicy.profileId"
            component={Select}
            dataOptions={loanProfileTypes}
            validate={this.validateField}
          />
        }
        {/* loan period - only appears when profile is "rolling" */}
        { (policy.loanable && policy.loansPolicy.profileId === '2') &&
          <div>
            <p>Loan period</p>
            <Row>
              <Col xs={2}>
                <Field label="" name="loansPolicy.period.duration" component={TextField} rounded validate={this.validateField} />
              </Col>
              <Col>
                <Field
                  label=""
                  name="loansPolicy.period.intervalId"
                  component={Select}
                  placeholder="Select interval"
                  dataOptions={intervalPeriods}
                  validate={this.validateField}
                />
              </Col>
            </Row>
          </div>
        }
        {/* fixed due date schedule - appears when profile is "fixed" or "rolling",
            but with different labels */}
        { (policy.loanable && policy.loansPolicy && policy.loansPolicy.profileId !== '3') &&
          <Field
            label={dueDateScheduleFieldLabel}
            name="loansPolicy.fixedDueDateSchedule"
            component={Select}
            placeholder="Select schedule"
            dataOptions={schedules}
          />
        }
        {/* closed library due date management - Select */}
        { policy.loanable &&
          <Field
            label="Closed library due date management"
            name="loansPolicy.closedLibraryDueDateManagementId"
            component={Select}
            dataOptions={dueDateManagementOptions}
            validate={this.validateField}
          />
        }
        {/* skip closed dates - boolean */}
        { policy.loanable &&
          <Field
            label="Skip closed dates in intervening period"
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
            <p>Alternate loan period for items with existing requests</p>
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
                  placeholder="Select interval"
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
            <p>Grace period</p>
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
                  placeholder="Select interval"
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
            <legend>Renewals</legend>

            {/*
              renewable (bool) - affects visibility of most subsequent fields
              (The normalize function used is needed to deal with an annoying behavior
              in current versions of redux-form in which values of 'false' are
              not handled properly -- see https://github.com/erikras/redux-form/issues/1993)
            */}
            <Field
              label="Renewable"
              name="renewable"
              component={Checkbox}
              id="renewable"
              validate={this.validateField}
              normalize={v => !!v}
            />
            {/* unlimited renewals (bool) */}
            { policy.renewable &&
              <Field
                label="Unlimited renewals"
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
                <p>Number of renewals allowed</p>
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
                label="Renew from"
                name="renewalsPolicy.renewFromId"
                component={Select}
                dataOptions={renewFromOptions}
                validate={this.validateField}
              />
            }
            {/* different renewal period (bool) */}
            { policy.renewable &&
              <Field
                label="Renewal period different from original loan"
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
              policy.loansPolicy.profileId === '2' &&
              <div>
                <p>Alternate loan period for renewals</p>
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
                      placeholder="Select interval"
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
              policy.loansPolicy.profileId !== '3' &&
              <Field
                label={altRenewalScheduleLabel}
                name="renewalsPolicy"       // TODO: Need to hook this up with the right schema component when it's ready
                component={Select}
                placeholder="Select schedule"
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
