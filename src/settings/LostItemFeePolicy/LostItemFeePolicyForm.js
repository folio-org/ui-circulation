import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';

import {
  Accordion,
  ExpandAllButton,
  Col,
  Row,
  Paneset,
} from '@folio/stripes/components';

import LostItemFeePolicy from '../Models/LostItemFeePolicy';
import { checkInvalid } from './utils/normalize';

import {
  LostItemFeeAboutSection,
  LostItemFeeSection,
} from './components/EditSections';

import {
  DeleteConfirmationModal,
  HeaderPane,
  Metadata,
} from '../components';

import css from './LostItemFee.css';

class LostItemFeePolicyForm extends React.Component {
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
    confirmDeleteLostItemFee: false,
    sections: {
      lostItemFeegeneralSection: true,
      LostItemFeeSection: true,
      lostItemFeeSectionOpen: true,
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

  saveForm = (lostItemFeePolicy) => {
    const lostItemFee = checkInvalid(lostItemFeePolicy);
    this.props.onSave(lostItemFee);
  };

  changeDeleteState = (confirmDeleteLostItemFee) => {
    this.setState({ confirmDeleteLostItemFee });
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
      confirmDeleteLostItemFee,
    } = this.state;

    const editModeLostItemFee = Boolean(policy.id);


    return (

      <form
        noValidate
        data-test-lost-item-fee-policy-form
        onSubmit={handleSubmit(this.saveForm)}
      >

        <Paneset isRoot>
          <HeaderPane
            id="header-pane-lost-item-fee"
            editMode={editModeLostItemFee}
            entryTitle={
              <FormattedMessage
                id="ui-circulation.settings.lostItemFee.editLabel"
                values={{ name: policy.name }}
              />}
            pristine={pristine}
            submitting={submitting}
            permissions={permissions}
            onCancel={onCancel}
            onRemove={this.changeDeleteState}
            createEntryLabel={<FormattedMessage id="ui-circulation.settings.lostItemFee.entryLabel" />}
          >
            <React.Fragment>
              <div className={css.accordionSection}>
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
                  id="lostItemFeegeneralSection"
                  onToggle={this.handleSectionToggle}
                  open={sections.lostItemFeegeneralSection}
                  label={<FormattedMessage id="ui-circulation.settings.lostItemFee.generalInformation" />}
                >
                  <Metadata
                    connect={stripes.connect}
                    metadata={policy.metadata}
                  />
                  <LostItemFeeAboutSection />
                  <LostItemFeeSection
                    policy={policy}
                    change={change}
                    initialValues={initialValues}
                    accordionOnToggle={this.handleSectionToggle}
                    lostItemFeeSectionOpen={sections.lostItemFeeSectionOpen}
                  />
                </Accordion>
                {editModeLostItemFee &&
                  <DeleteConfirmationModal
                    isOpen={confirmDeleteLostItemFee}
                    triggerSubmitSucceeded
                    policyName={policy.name}
                    formName="loanPolicyForm"
                    deleteEntityKey="ui-circulation.settings.lostItemFee.deleteFeePolicy"
                    initialValues={initialValues}
                    onCancel={this.changeDeleteState}
                    onRemove={onRemove}
                  />
                }
              </div>
            </React.Fragment>
          </HeaderPane>
        </Paneset>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  policy: new LostItemFeePolicy(getFormValues('LostItemFeePolicyForm')(state)),
});

const connectedLostItemFeePolicyForm = connect(mapStateToProps)(injectIntl(LostItemFeePolicyForm));

export default stripesForm({
  form: 'LostItemFeePolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
})(connectedLostItemFeePolicyForm);
