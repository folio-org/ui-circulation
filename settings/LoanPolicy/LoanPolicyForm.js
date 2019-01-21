import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getFormValues } from 'redux-form';
import { sortBy } from 'lodash';

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
import normalizeLoanPolicyForm from './utils/normalizeLoanPolicyForm';

import {
  HeaderPane,
  DeleteEntry,
  AboutSection,
  LoansSection,
  RenewalsSection,
  RequestManagementSection,
} from './components';

import { Metadata } from '../components';

class LoanPolicyForm extends React.Component {
  static propTypes = {
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
      holdsSection: true,
      pagesSection: true,
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
      parentResources: {
        fixedDueDateSchedules: {
          records = [],
        } = {},
      },
    } = this.props;

    const sortedSchedules = sortBy(records, ['name']);
    return sortedSchedules.map(({ id, name }) => (<option key={id} value={id}>{name}</option>));
  };

  saveForm = (loanPolicy) => {
    const normalizedForm = normalizeLoanPolicyForm(loanPolicy);
    this.props.onSave(normalizedForm);
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
      <form onSubmit={handleSubmit(this.saveForm)}>
        <Paneset isRoot>
          <HeaderPane
            editMode={editMode}
            pristine={pristine}
            submitting={submitting}
            onCancel={onCancel}
          >
            <React.Fragment>
              <Row end="xs">
                <Col xs>
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
                <Metadata
                  connect={stripes.connect}
                  metadata={policy.metadata}
                />
                <AboutSection />
                <LoansSection
                  policy={policy}
                  schedules={schedules}
                  change={change}
                />
                <RenewalsSection
                  policy={policy}
                  schedules={schedules}
                  change={change}
                />
                <RequestManagementSection
                  policy={policy}
                  holdsSectionOpen={sections.holdsSection}
                  pagesSectionOpen={sections.pagesSection}
                  recallsSectionOpen={sections.recallsSection}
                  accordionOnToggle={this.handleSectionToggle}
                  change={change}
                />
              </Accordion>
              {editMode &&
                <DeleteEntry
                  isOpen={confirmDelete}
                  policyName={policy.name}
                  initialValues={initialValues}
                  perm={permissions}
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
  policy: new LoanPolicy(getFormValues('entryForm')(state)),
});

const connectedLoanPolicyForm = connect(mapStateToProps)(LoanPolicyForm);

export default stripesForm({
  form: 'entryForm',
  navigationCheck: true,
  enableReinitialize: false,
})(connectedLoanPolicyForm);
