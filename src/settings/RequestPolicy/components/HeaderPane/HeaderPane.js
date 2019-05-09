import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { IfPermission } from '@folio/stripes/core';
import {
  Pane,
  Button,
  Icon,
} from '@folio/stripes/components';

import {
  CancelButton,
  SaveButton,
} from '../../../components';

class HeaderPane extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    editMode: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    entryTitle: PropTypes.string,
    permissions: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
    policyInUse: PropTypes.bool.isRequired,
    showDeleteConfirmationModal: PropTypes.func.isRequired,
    showEntityInUseModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    entryTitle: '',
  };

  renderActionMenuItems = ({ onToggle }) => {
    const {
      permissions,
      onCancel,
      editMode,
      policyInUse,
      showDeleteConfirmationModal,
      showEntityInUseModal,

    } = this.props;

    const handleClick = () => {
      if (policyInUse) {
        showEntityInUseModal(true);
      } else {
        showDeleteConfirmationModal(true);
      }
      onToggle();
    };

    const handleCancel = (e) => {
      onCancel(e);
      onToggle();
    };

    return (
      <IfPermission perm={permissions.delete}>
        {editMode &&
          <Button
            data-test-delete-user-form-action
            buttonStyle="dropdownItem"
            onClick={handleClick}
          >
            <Icon icon="trash">
              <FormattedMessage id="ui-circulation.settings.common.delete" />
            </Icon>
          </Button>
        }

        <Button
          data-test-cancel-user-form-action
          buttonStyle="dropdownItem"
          onClick={handleCancel}
        >
          <Icon icon="times">
            <FormattedMessage id="ui-circulation.settings.common.cancel" />
          </Icon>
        </Button>
      </IfPermission>
    );
  };

  renderCancelButton = () => {
    const { onCancel } = this.props;

    return <CancelButton onCancel={onCancel} />;
  };

  renderSaveButton = () => {
    const {
      pristine,
      submitting,
    } = this.props;

    return (
      <SaveButton
        pristine={pristine}
        submitting={submitting}
        textKey="ui-circulation.settings.requestPolicy.saveAndClose"
        buttonStyle="primary"
      />
    );
  };

  renderPanelTitle = () => {
    const {
      editMode,
      entryTitle,
    } = this.props;

    return editMode
      ? entryTitle
      : <FormattedMessage id="ui-circulation.settings.requestPolicy.createEntryLabel" />;
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <Pane
        defaultWidth="100%"
        firstMenu={this.renderCancelButton()}
        lastMenu={this.renderSaveButton()}
        paneTitle={this.renderPanelTitle()}
        actionMenu={this.renderActionMenuItems}
      >
        {children}
      </Pane>
    );
  }
}

export default HeaderPane;
