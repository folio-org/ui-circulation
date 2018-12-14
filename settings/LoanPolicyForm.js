import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  Field,
  getFormValues,
} from 'redux-form';

import {
  cloneDeep,
  sortBy,
  some,
  get,
} from 'lodash';

import { ViewMetaData } from '@folio/stripes/smart-components';
import { stripesShape } from '@folio/stripes/core';
import {
  Accordion,
  Checkbox,
  ExpandAllButton,
  Select,
  TextArea,
  TextField,
  Col,
  Row,
} from '@folio/stripes/components';

import { PolicyPropertySetter } from './components';

import {
  loanProfileTypes,
  intervalPeriods,
  renewFromOptions,
  intervalIdsMap,
  loanProfileMap,
  shortTermLoansOptions,
  longTermLoansOptions,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
  CURRENT_DUE_DATE_TIME,
  CURRENT_DUE_DATE,
} from '../constants';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    policy: PropTypes.object,
    change: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
  };

  constructor(props) {
    super(props);

    this.cViewMetaData = props.stripes.connect(ViewMetaData);

    this.state = {
      sections: {
        generalSection: true,
      },
    };
  }

  componentDidUpdate() {
    this.setCorrectDueDateManagementSelectedValue();
  }

  isShortTermLoan = () => {
    const {
      loanable,
      loansPolicy: {
        profileId,
        period: {
          intervalId,
        } = {},
      } = {},
    } = this.props.policy;

    const isProfileRolling = profileId === loanProfileMap.ROLLING;
    const isShortTermPeriod = intervalId === intervalIdsMap.MINUTES || intervalId === intervalIdsMap.HOURS;

    return loanable && isProfileRolling && isShortTermPeriod;
  };

  isValidDueDateManagementIdSelected = (options, selectedId) => {
    return some(options, ({ id }) => id === selectedId);
  };

  setCorrectDueDateManagementSelectedValue = () => {
    const isShortTermLoan = this.isShortTermLoan();
    const selectedId = get(this.props.policy, 'loansPolicy.closedLibraryDueDateManagementId');
    const invalidShortTermLoanValue = !this.isValidDueDateManagementIdSelected(shortTermLoansOptions, selectedId);
    const invalidLongTermLoanValue = !this.isValidDueDateManagementIdSelected(longTermLoansOptions, selectedId);

    if (isShortTermLoan && invalidShortTermLoanValue) {
      /* Set default value for short term loan if long term load item was selected */
      this.props.change('loansPolicy.closedLibraryDueDateManagementId', CURRENT_DUE_DATE_TIME);
    }

    if (!isShortTermLoan && invalidLongTermLoanValue) {
      /* Set default value for long term loan if short term load item was selected */
      this.props.change('loansPolicy.closedLibraryDueDateManagementId', CURRENT_DUE_DATE);
    }
  };

  getDueDateManagementOptions = () => {
    return this.isShortTermLoan()
      ? shortTermLoansOptions
      : longTermLoansOptions;
  };

  isOpeningTimeOffsetVisible = () => {
    const isShortTermMode = this.isShortTermLoan();
    const dueDateManagementId = get(this.props.policy, 'loansPolicy.closedLibraryDueDateManagementId');
    return isShortTermMode && dueDateManagementId === BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS;
  };

  handleSectionToggle = ({ id }) => {
    this.setState((curState) => {
      const newState = cloneDeep(curState);
      newState.sections[id] = !newState.sections[id];
      return newState;
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  getOptions(options, id) {
    return options.map(({ value, label }) => (
      <option value={value} key={`${id}-${value}`}>
        {label}
      </option>
    ));
  }

  generateScheduleOptions = () => {
    const {
      parentResources: {
        fixedDueDateSchedules: {
          records = [],
        } = {},
      },
    } = this.props;

    const sortedSchedules = sortBy(records, ['name']);
    return sortedSchedules.map(({ id, name }) => (<option key={id} value={id}>{name}</option>));
  };

  render() {
    const {
      policy,
      change,
    } = this.props;
    const { sections } = this.state;

    const schedules = this.generateScheduleOptions();
    const isOpeningTimeOffsetVisible = this.isOpeningTimeOffsetVisible();

    // Conditional field labels
    let dueDateScheduleFieldLabel = <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDS" />;
    let altRenewalScheduleLabel = <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSforRenewals" />;
    if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) {
      dueDateScheduleFieldLabel = <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSlimit" />;
      altRenewalScheduleLabel = <FormattedMessage id="ui-circulation.settings.loanPolicy.altFDDSDueDateLimit" />;
    } else if (policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.FIXED) {
      dueDateScheduleFieldLabel = <FormattedMessage id="ui-circulation.settings.loanPolicy.fDDSRequired" />;
    }

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
          label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
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
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyName" />}
            autoFocus
            name="name"
            id="input_policy_name"
            component={TextField}
            required
            fullWidth
          />
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.policyDescription" />}
            name="description"
            component={TextArea}
            fullWidth
          />
          <hr />

          {/* Loan detail section */}
          <h2>
            <FormattedMessage id="ui-circulation.settings.loanPolicy.loans" />
          </h2>
          {/* loanable: boolean determining visibility of all subsequent elements */}
          <Field
            label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanable" />}
            id="loanable"
            name="loanable"
            component={Checkbox}
            type="checkbox"
            normalize={v => !!v}
          />
          {/* loan profile. Value affects visibility of several subsequent elements */}
          { policy.loanable &&
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.loanProfile" />}
              name="loansPolicy.profileId"
              id="input_loan_profile"
              component={Select}
              dataOptions={loanProfileTypes}
            />
          }
          {/* loan period - only appears when profile is "rolling" */}
          { (policy.loanable && policy.loansPolicy && policy.loansPolicy.profileId === loanProfileMap.ROLLING) &&
            <PolicyPropertySetter
              fieldLabel="ui-circulation.settings.loanPolicy.loanPeriod"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="loansPolicy.period.duration"
              selectValuePath="loansPolicy.period.intervalId"
              changeFormValue={change}
              entity={policy}
              intervalPeriods={this.getOptions(intervalPeriods, 'period')}
            />
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
            >
              <FormattedMessage id="ui-circulation.settings.loanPolicy.selectSchedule">
                {(message) => <option value="" disabled>{message}</option>}
              </FormattedMessage>
              {schedules}
            </Field>
          }
          {/* closed library due date management - Select */}
          { policy.loanable &&
            <Field
              label={<FormattedMessage id="ui-circulation.settings.loanPolicy.closedDueDateMgmt" />}
              name="loansPolicy.closedLibraryDueDateManagementId"
              component={Select}
            >
              {this.getOptions(this.getDueDateManagementOptions(), 'dueDateManagement')}
            </Field>
          }
          {/* opening time offset */}
          {isOpeningTimeOffsetVisible &&
            <PolicyPropertySetter
              fieldLabel="ui-circulation.settings.loanPolicy.openingTimeOffset"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="loansPolicy.openingTimeOffset.duration"
              selectValuePath="loansPolicy.openingTimeOffset.intervalId"
              changeFormValue={change}
              entity={policy}
              intervalPeriods={this.getOptions(intervalPeriods.slice(0, 2).reverse(), 'openingTimeOffset')}
            />
          }
          {/* alternate loan period */}
          {policy.loanable &&
            <PolicyPropertySetter
              fieldLabel="ui-circulation.settings.loanPolicy.alternateLoanPeriodExisting"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="loansPolicy.existingRequestsPeriod.duration"
              selectValuePath="loansPolicy.existingRequestsPeriod.intervalId"
              changeFormValue={change}
              entity={policy}
              intervalPeriods={this.getOptions(intervalPeriods.slice(0, 3), 'existingRequestsPeriod')}
            />
          }
          {/* grace period */}
          {policy.loanable &&
            <PolicyPropertySetter
              fieldLabel="ui-circulation.settings.loanPolicy.gracePeriod"
              selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
              inputValuePath="loansPolicy.gracePeriod.duration"
              selectValuePath="loansPolicy.gracePeriod.intervalId"
              changeFormValue={change}
              entity={policy}
              intervalPeriods={this.getOptions(intervalPeriods, 'gracePeriod')}
            />
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
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewable" />}
                name="renewable"
                component={Checkbox}
                type="checkbox"
                id="renewable"
                normalize={v => !!v}
              />
              {/* unlimited renewals (bool) */}
              { policy.renewable &&
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.unlimitedRenewals" />}
                  name="renewalsPolicy.unlimited"
                  id="renewalsPolicy.unlimited"
                  component={Checkbox}
                  type="checkbox"
                  normalize={v => !!v}
                />
              }
              {/* number of renewals allowed */}
              {policy.renewable && policy.renewalsPolicy.unlimited === false &&
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
                        type="number"
                        min={0}
                        required
                      />
                    </Col>
                  </Row>
                </div>
              }
              {/* renew from */}
              { policy.renewable &&
                policy.loansPolicy.profileId === loanProfileMap.ROLLING &&
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewFrom" />}
                  name="renewalsPolicy.renewFromId"
                  id="select_renew_from"
                  component={Select}
                  dataOptions={renewFromOptions}
                />
              }
              {/* different renewal period (bool) */}
              { policy.renewable &&
                <Field
                  label={<FormattedMessage id="ui-circulation.settings.loanPolicy.renewalPeriodDifferent" />}
                  name="renewalsPolicy.differentPeriod"
                  id="renewalsPolicy.differentPeriod"
                  component={Checkbox}
                  type="checkbox"
                  normalize={v => !!v}
                />
              }
              {/* alternate loan period for renewals ("rolling" profile only) */}
              {policy.renewable &&
                policy.renewalsPolicy.differentPeriod &&
                policy.loansPolicy.profileId === loanProfileMap.ROLLING &&
                <Fragment>
                  <br />
                  <PolicyPropertySetter
                    fieldLabel="ui-circulation.settings.loanPolicy.alternateLoanPeriodRenewals"
                    selectPlaceholder="ui-circulation.settings.loanPolicy.selectInterval"
                    inputValuePath="renewalsPolicy.period.duration"
                    selectValuePath="renewalsPolicy.period.intervalId"
                    changeFormValue={change}
                    entity={this.props.policy}
                    intervalPeriods={this.getOptions(intervalPeriods, 'renuwalPeriod')}
                  />
                </Fragment>
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
                >
                  <FormattedMessage id="ui-circulation.settings.loanPolicy.selectSchedule">
                    {(message) => <option value="" disabled>{message}</option>}
                  </FormattedMessage>
                  {schedules}
                </Field>
              }
            </fieldset>
          }
        </Accordion>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: getFormValues('entryForm')(state),
});

export default connect(mapStateToProps)(LoanPolicyForm);
