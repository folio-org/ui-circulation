import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  Row,
  Paneset,
  ExpandAllButton,
} from '@folio/stripes/components';

import NoticePolicy from '../Models/NoticePolicy';
import { DeleteConfirmationModal } from '../components';
import {
  HeaderPane,
  GeneralSection,
  LoanNoticesSection,
  FeeFineNoticesSection,
  RequestNoticesSection,
} from './components';

class NoticePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    policy: PropTypes.object,
    initialValues: PropTypes.object,
    permissions: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
    initialValues: {},
  };

  state = {
    showDeleteConfirmation: false,
    sections: {
      general: true,
      loanNotices: false,
      feeFineNotices: false,
      requestNotices: false,
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

  saveForm = (noticePolicy) => {
    this.props.onSave(noticePolicy);
  };

  changeDeleteState = (showDeleteConfirmation) => {
    this.setState({ showDeleteConfirmation });
  }

  render() {
    const {
      pristine,
      policy,
      initialValues,
      stripes,
      submitting,
      handleSubmit,
      onCancel,
      onRemove,
      permissions,
    } = this.props;

    const {
      sections,
      showDeleteConfirmation,
    } = this.state;

    const editMode = Boolean(policy.id);

    return (
      <form onSubmit={handleSubmit(this.saveForm)}>
        <Paneset isRoot>
          <HeaderPane
            editMode={editMode}
            submitting={submitting}
            permissions={permissions}
            pristine={pristine}
            entryTitle={policy.name}
            onCancel={onCancel}
            onRemove={this.changeDeleteState}
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
              <GeneralSection
                isOpen={sections.general}
                metadata={policy.metadata}
                connect={stripes.connect}
                onToggle={this.handleSectionToggle}
              />
              <LoanNoticesSection
                isOpen={sections.loanNotices}
                onToggle={this.handleSectionToggle}
              />
              <FeeFineNoticesSection
                isOpen={sections.feeFineNotices}
                onToggle={this.handleSectionToggle}
              />
              <RequestNoticesSection
                isOpen={sections.requestNotices}
                onToggle={this.handleSectionToggle}
              />
              {editMode &&
                <DeleteConfirmationModal
                  isOpen={showDeleteConfirmation}
                  policyName={policy.name}
                  deleteEntityKey="ui-circulation.settings.noticePolicy.deleteLoanPolicy"
                  initialValues={initialValues}
                  onCancel={this.changeDeleteState}
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
  policy: new NoticePolicy(getFormValues('noticePolicyForm')(state)),
});

const connectedLoanPolicyForm = connect(mapStateToProps)(NoticePolicyForm);

export default stripesForm({
  form: 'noticePolicyForm',
  navigationCheck: true,
  enableReinitialize: false,
})(connectedLoanPolicyForm);
