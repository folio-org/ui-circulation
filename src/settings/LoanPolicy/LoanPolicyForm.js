import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import {
  sortBy,
  get,
} from 'lodash';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';

import {
  Accordion,
  ExpandAllButton,
  Col,
  Row,
  Paneset,
} from '@folio/stripes/components';

import LoanPolicy from '../Models/LoanPolicy';
import { normalize } from './utils/normalize';

import {
  HeaderPane,
  DeleteEntry,
} from './components';

import {
  AboutSection,
  LoansSection,
  RenewalsSection,
  RequestManagementSection,
} from './components/EditSections';

import { Metadata } from '../components';

class LoanPolicyForm extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    parentResources: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    policy: PropTypes.object,
    initialValues: PropTypes.object,
    permissions: PropTypes.object.isRequired,
    change: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
    initialValues: {},
  };

  state = {
    confirmDelete: false,
    sections: {
      generalSection: true,
      recallsSection: true,
      holdsSection: false,
    },
  };

  handleSectionToggle = ({ id }) => {
    this.setState((state) => {
      const sections = { ...state.sections };
      sections[id] = !sections[id];
      return { sections };
    });
  };

  handleExpandAll = (sections) => {
    this.setState({ sections });
  };

  generateScheduleOptions = () => {
    const {
      intl: {
        formatMessage,
      },
    } = this.props;
    const records = get(this.props, 'parentResources.fixedDueDateSchedules.records', []);
    const sortedSchedules = sortBy(records, ['name']);

    const placeholder = (
      <option value="" key="x">
        {formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectSchedule' })}
      </option>
    );

    const schedules = sortedSchedules.map(({ id, name }) => {
      return (
        <option
          value={id}
          key={id}
        >
          {name}
        </option>
      );
    });

    return [placeholder, ...schedules];
  };

  saveForm = (loanPolicy) => {
    const policy = normalize(loanPolicy);
    this.props.onSave(policy);
  };

  changeDeleteState = (confirmDelete) => {
    this.setState({ confirmDelete });
  };

  render() {
    const {
      pristine,
      policy,
      permissions,
      initialValues,
      stripes,
      submitting,
      handleSubmit,
      change,
      onCancel,
      onRemove,
    } = this.props;

    const {
      sections,
      confirmDelete,
    } = this.state;

    const editMode = Boolean(policy.id);
    const schedules = this.generateScheduleOptions();

    return (
      <form
        data-test-loan-policy-form
        onSubmit={handleSubmit(this.saveForm)}
      >
        <Paneset isRoot>
          <HeaderPane
            editMode={editMode}
            pristine={pristine}
            submitting={submitting}
            onCancel={onCancel}
          >
            <React.Fragment>
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
                id="generalSection"
                open={sections.generalSection}
                label={<FormattedMessage id="ui-circulation.settings.loanPolicy.generalInformation" />}
                onToggle={this.handleSectionToggle}
              >
                <div>
                  <Metadata
                    connect={stripes.connect}
                    metadata={policy.metadata}
                  />
                </div>
                <AboutSection />
                <LoansSection
                  policy={policy}
                  schedules={schedules}
                  change={change}
                />
                {/* <RenewalsSection
                  policy={policy}
                  schedules={schedules}
                  change={change}
                />
                <RequestManagementSection
                  policy={policy}
                  holdsSectionOpen={sections.holdsSection}
                  recallsSectionOpen={sections.recallsSection}
                  accordionOnToggle={this.handleSectionToggle}
                  change={change}
                /> */}
              </Accordion>
              {editMode &&
                <DeleteEntry
                  isOpen={confirmDelete}
                  policyName={policy.name}
                  initialValues={initialValues}
                  perm={permissions.delete}
                  deleteEntityKey="ui-circulation.settings.loanPolicy.deleteLoanPolicy"
                  onRemoveStatusChange={this.changeDeleteState}
                  onRemove={onRemove}
                />
              }
            </React.Fragment>
          </HeaderPane>
        </Paneset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: new LoanPolicy(getFormValues('loanPolicyForm')(state)),
});

const connectedLoanPolicyForm = connect(mapStateToProps)(injectIntl(LoanPolicyForm));

export default stripesForm({
  form: 'loanPolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
})(connectedLoanPolicyForm);
