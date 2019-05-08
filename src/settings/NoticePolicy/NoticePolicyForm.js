import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import {
  get,
  noop,
} from 'lodash';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  Row,
  Paneset,
  ExpandAllButton,
} from '@folio/stripes/components';

import normalize from './utils/normalize';
import getTemplates from './utils/get-templates';
import { NoticePolicy } from '../Models/NoticePolicy';
import { DeleteConfirmationModal } from '../components';
import {
  HeaderPane,
  GeneralSection,
  LoanNoticesSection,
  FeeFineNoticesSection,
  RequestNoticesSection,
} from './components';

import EntityInUseModal from '../components/EntityInUseModal';

class NoticePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    policy: PropTypes.object,
    initialValues: PropTypes.object,
    isEntryInUse: PropTypes.func,
    parentResources: PropTypes.shape({
      templates: PropTypes.object,
    }).isRequired,
    permissions: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    policy: {},
    initialValues: {},
    isEntryInUse: noop,
  };

  state = {
    showEntityInUseModal: false,
    showDeleteConfirmation: false,
    sections: {
      general: true,
      loanNotices: true,
      requestNotices: true,
      feeFineNotices: false,
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
    const policy = normalize(noticePolicy);
    this.props.onSave(policy);
  };

  changeDeleteState = (showDeleteConfirmation) => {
    this.setState({ showDeleteConfirmation });
  };

  changeEntityInUseState = (showEntityInUseModal) => {
    this.setState({ showEntityInUseModal });
  };

  render() {
    const {
      pristine,
      policy,
      initialValues,
      stripes,
      permissions,
      submitting,
      isEntryInUse,
      handleSubmit,
      onCancel,
      onRemove,
    } = this.props;

    const patronNoticeTemplates = get(this.props, 'parentResources.templates.records', []);

    const {
      sections,
      showDeleteConfirmation,
      showEntityInUseModal,
    } = this.state;

    const editMode = Boolean(policy.id);
    const isPolicyInUse = isEntryInUse(policy.id);

    return (
      <form
        data-test-notice-policy-form
        onSubmit={handleSubmit(this.saveForm)}
      >
        <Paneset isRoot>
          <HeaderPane
            editMode={editMode}
            policyInUse={isPolicyInUse}
            submitting={submitting}
            permissions={permissions}
            pristine={pristine}
            entryTitle={policy.name}
            onCancel={onCancel}
            showDeleteConfirmationModal={this.changeDeleteState}
            showEntityInUseModal={this.changeEntityInUseState}
          >
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
            <GeneralSection
              isOpen={sections.general}
              metadata={policy.metadata}
              connect={stripes.connect}
              onToggle={this.handleSectionToggle}
            />
            <LoanNoticesSection
              isOpen={sections.loanNotices}
              policy={policy}
              templates={getTemplates(patronNoticeTemplates, 'Loan')}
              onToggle={this.handleSectionToggle}
            />
            <RequestNoticesSection
              isOpen={sections.requestNotices}
              policy={policy}
              templates={getTemplates(patronNoticeTemplates, 'Request')}
              onToggle={this.handleSectionToggle}
            />
            <FeeFineNoticesSection
              isOpen={sections.feeFineNotices}
              onToggle={this.handleSectionToggle}
            />
            { editMode &&
              <DeleteConfirmationModal
                isOpen={showDeleteConfirmation}
                policyName={policy.name}
                deleteEntityKey="ui-circulation.settings.noticePolicy.deleteLoanPolicy"
                initialValues={initialValues}
                onCancel={this.changeDeleteState}
                onRemove={onRemove}
              />
            }
            { editMode &&
              <EntityInUseModal
                isOpen={showEntityInUseModal}
                labelTranslationKey="ui-circulation.settings.noticePolicy.denyDelete.header"
                contentTranslationKey="ui-circulation.settings.noticePolicy.denyDelete.body"
                onClose={this.changeEntityInUseState}
              />
            }
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
