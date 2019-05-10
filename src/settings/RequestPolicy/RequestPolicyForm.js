import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { noop } from 'lodash';

import stripesForm from '@folio/stripes/form';
import { stripesShape } from '@folio/stripes/core';
import {
  Col,
  Row,
  Paneset,
  ExpandAllButton,
} from '@folio/stripes/components';

import RequestPolicy from '../Models/RequestPolicy';
import {
  DeleteConfirmationModal,
  EntityInUseModal,
} from '../components';
import {
  HeaderPane,
  GeneralSection,
} from './components';
import asyncValidate from '../Validation/request-policy/unique-name';
import { requestPolicyTypes } from '../../constants';

class RequestPolicyForm extends React.Component {
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
    isEntryInUse: PropTypes.func,
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

  saveForm = (data) => {
    const requestTypes = data.requestTypes.reduce((acc, type, index) => {
      if (type) acc.push(requestPolicyTypes[index]);
      return acc;
    }, []);

    this.props.onSave({ ...data, requestTypes });
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
      submitting,
      handleSubmit,
      onCancel,
      onRemove,
      permissions,
      isEntryInUse,
    } = this.props;

    const {
      sections,
      showDeleteConfirmation,
      showEntityInUseModal,
    } = this.state;

    const editMode = Boolean(policy.id);
    const isPolicyInUse = isEntryInUse(policy.id);

    return (
      <form
        data-test-request-policy-form
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

              {editMode &&
                <DeleteConfirmationModal
                  isOpen={showDeleteConfirmation}
                  policyName={policy.name}
                  deleteEntityKey="ui-circulation.settings.requestPolicy.deletPolicy"
                  initialValues={initialValues}
                  onCancel={this.changeDeleteState}
                  onRemove={onRemove}
                />
              }

              { editMode &&
                <EntityInUseModal
                  isOpen={showEntityInUseModal}
                  labelTranslationKey="ui-circulation.settings.requestPolicy.cannotDelete.label"
                  contentTranslationKey="ui-circulation.settings.requestPolicy.cannotDelete.message"
                  onClose={this.changeEntityInUseState}
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
  policy: new RequestPolicy(getFormValues('requestPolicyForm')(state)),
});

const connectedRequestPolicyForm = connect(mapStateToProps)(RequestPolicyForm);

export default stripesForm({
  form: 'requestPolicyForm',
  navigationCheck: true,
  enableReinitialize: true,
  asyncValidate,
  asyncBlurFields: ['name'],
})(connectedRequestPolicyForm);
