import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { get } from 'lodash';

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
  CannotDeleteModal,
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
    parentResources: PropTypes.object,
  };

  static defaultProps = {
    policy: {},
    initialValues: {},
  };

  state = {
    showDeleteConfirmation: false,
    showCannotDeleteModal: false,
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

  isDeletionAllowed() {
    const { parentResources, policy } = this.props;
    const circulationRules = get(parentResources, 'circulationRules.records[0].rulesAsText', '');

    return !circulationRules.match(policy.id);
  }

  changeDeleteState = (showDeleteConfirmation) => {
    if (showDeleteConfirmation && !this.isDeletionAllowed()) {
      return this.setState({ showCannotDeleteModal: true });
    }

    return this.setState({ showDeleteConfirmation });
  };

  hideCannotDeleteModal = () => {
    this.setState({ showCannotDeleteModal: false });
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
      showCannotDeleteModal,
    } = this.state;

    const editMode = Boolean(policy.id);

    return (
      <form
        data-test-request-policy-form
        onSubmit={handleSubmit(this.saveForm)}
      >
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

              {editMode &&
                <CannotDeleteModal
                  isOpen={showCannotDeleteModal}
                  onConfirm={this.hideCannotDeleteModal}
                  labelKey="ui-circulation.settings.requestPolicy.cannotDelete.label"
                  messageKey="ui-circulation.settings.requestPolicy.cannotDelete.message"
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
