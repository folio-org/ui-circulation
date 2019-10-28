import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import {
  Accordion,
  ExpandAllButton,
  Col,
  Row,
  Paneset,
} from '@folio/stripes/components';

import FinePolicy from '../Models/FinePolicy';

import {
  FinesSection,
  OverdueAboutSection,
} from './components/EditSections';

import {
  DeleteConfirmationModal,
  HeaderPane,
  Metadata,
} from '../components';

class FinePolicyForm extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
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
      overdueGeneralSection: true,
      fineSection: true,
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

  saveForm = (finePolicy) => {
    if ((finePolicy.overdueFine !== undefined && Number(finePolicy.overdueFine.quantity) === 0) ||
      (finePolicy.overdueFine !== undefined && finePolicy.overdueFine.quantity === '')) {
      delete finePolicy.overdueFine;
    }
    if ((finePolicy.overdueRecallFine !== undefined && Number(finePolicy.overdueRecallFine.quantity) === 0) ||
      (finePolicy.overdueRecallFine !== undefined && finePolicy.overdueRecallFine.quantity === '')) {
      delete finePolicy.overdueRecallFine;
    }
    this.props.onSave(finePolicy);
  };

  changeOverdueDeleteState = (confirmDelete) => {
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

    const overdueEditMode = Boolean(policy.id);

    return (
      <form
        noValidate
        data-test-fine-policy-form
        onSubmit={handleSubmit(this.saveForm)}
      >
        <Paneset isRoot>
          <HeaderPane
            editMode={overdueEditMode}
            entryTitle={policy.name}
            pristine={pristine}
            submitting={submitting}
            permissions={permissions}
            onCancel={onCancel}
            onRemove={this.changeOverdueDeleteState}
            createEntryLabel={<FormattedMessage id="ui-circulation.settings.finePolicy.createEntryLabel" />}
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
                id="overdueGeneralSection"
                label={<FormattedMessage id="ui-circulation.settings.finePolicy.generalInformation" />}
                open={sections.overdueGeneralSection}
                onToggle={this.handleSectionToggle}
              >
                <Metadata
                  connect={stripes.connect}
                  metadata={policy.metadata}
                />
                <OverdueAboutSection />
                <FinesSection
                  initialValues={initialValues}
                  policy
                  fineSectionOpen={sections.fineSection}
                  accordionOnToggle={this.handleSectionToggle}
                  change={change}
                />
              </Accordion>
              {overdueEditMode &&
                <DeleteConfirmationModal
                  isOpen={confirmDelete}
                  triggerSubmitSucceeded
                  policyName={policy.name}
                  formName="finePolicyForm"
                  deleteEntityKey="ui-circulation.settings.finePolicy.deletefinePolicy"
                  initialValues={initialValues}
                  onCancel={this.changeOverdueDeleteState}
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
  policy: new FinePolicy(getFormValues('finePolicyForm')(state)),
});


const connectedFinePolicyForm = connect(mapStateToProps)(injectIntl(FinePolicyForm));

export default stripesForm({
  form: 'finePolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
})(connectedFinePolicyForm);
