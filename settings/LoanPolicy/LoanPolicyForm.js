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
  noop,
} from 'lodash';

import stripesForm from '@folio/stripes/form';
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
  IconButton,
  PaneMenu,
  Button,
  Pane,
  Paneset,
} from '@folio/stripes/components';

import { PolicyPropertySetter } from './components';

import {
  loanProfileTypes,
  intervalPeriods,
  renewFromOptions,
  loanProfileMap,
  shortTermLoansOptions,
  longTermLoansOptions,
  CURRENT_DUE_DATE_TIME,
  CURRENT_DUE_DATE,
} from '../../constants';

import LoanPolicy from '../Models/LoanPolicy';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    policy: PropTypes.object,
    // initialValues: PropTypes.object,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    change: PropTypes.func.isRequired,
    // validate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
    // initialValues: {},
    onSave: noop,
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

  isValidDueDateManagementIdSelected = (options, selectedId) => {
    return some(options, ({ id }) => id === selectedId);
  };

  setCorrectDueDateManagementSelectedValue = () => {
    const isShortTermLoan = this.props.policy.isShortTermLoan();
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
    return this.props.policy.isShortTermLoan()
      ? shortTermLoansOptions
      : longTermLoansOptions;
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

  addFirstMenu = () => {
    const { onCancel } = this.props;

    return (
      <PaneMenu>
        <FormattedMessage id="ui-circulation.settings.fDDSform.closeLabel">
          {ariaLabel => (
            <IconButton
              icon="closeX"
              size="medium"
              iconClassName="closeIcon"
              aria-label={ariaLabel}
              onClick={onCancel}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  saveLastMenu = () => {
    const {
      pristine,
      submitting,
    } = this.props;

    return (
      <PaneMenu>
        <Button
          id="clickable-save-fixedDueDateSchedule"
          type="submit"
          disabled={(pristine || submitting)}
          marginBottom0
        >
          <FormattedMessage id="ui-circulation.settings.loanPolicy.saveAndClose" />
        </Button>
      </PaneMenu>
    );
  }

  renderPaneTitle = () => {
    const { policy } = this.props;

    return policy.id
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.editEntryLabel" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.createEntryLabel" />;
  };

  normalizeForm = (loanPolicy) => {
    if (!loanPolicy.loanable) {
      return {
        id: loanPolicy.id,
        name: loanPolicy.name,
        description: loanPolicy.description,
        loanable: false,
        renewable: false,
        metadata: loanPolicy.metadata,
      };
    }

    return loanPolicy;
  };

  saveForm = (loanPolicy) => {
    const normalizedLoanPolicy = this.normalizeForm(loanPolicy);
    this.props.onSave(normalizedLoanPolicy);
  };

  render() {
    const {
      policy,
      change,
      handleSubmit,
    } = this.props;
    const { sections } = this.state;

    const schedules = this.generateScheduleOptions();
    const isOpeningTimeOffsetActive = policy.isOpeningTimeOffsetActive();

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
      <form id="form-fixedDueDateSchedule" onSubmit={handleSubmit(this.saveForm)}>
        <Paneset isRoot>
          <Pane
            defaultWidth="100%"
            firstMenu={this.addFirstMenu()}
            lastMenu={this.saveLastMenu()}
            paneTitle={this.renderPaneTitle()}
          >
            <React.Fragment>
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
                {isOpeningTimeOffsetActive &&
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
                <hr />

                {/* ************ renewals section ************* */}
                { policy.loanable &&
                  <React.Fragment>
                    <h2>
                      <FormattedMessage id="ui-circulation.settings.loanPolicy.renewals" />
                    </h2>
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
                  </React.Fragment>
                }
              </Accordion>
            </React.Fragment>
          </Pane>
        </Paneset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: new LoanPolicy(getFormValues('entryForm')(state)),
});

const connectedLoanPolicyForm = connect(mapStateToProps)(LoanPolicyForm);

export default stripesForm({
  form: 'entryForm',
  navigationCheck: true,
  enableReinitialize: false,
})(connectedLoanPolicyForm);
