import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { IfPermission } from '@folio/stripes/core';
import {
  Button,
  Icon,
  Pane,
} from '@folio/stripes/components';

import {
  CancelButton,
  SaveButton,
} from '../../../components';

class HeaderPane extends React.Component {
  static propTypes = {
    editMode: PropTypes.bool.isRequired,
    entryTitle: PropTypes.string,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    permissions: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    entryTitle: '',
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
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.createEntryLabel" />;
  };

  renderActionMenuItems = ({ onToggle }) => {
    const {
      permissions,
      onCancel,
      onRemove,
    } = this.props;

    const handleDeleteClick = () => {
      onRemove(true);
      onToggle();
    };

    const handleCancelClick = (e) => {
      onCancel(e);
      onToggle();
    };

    return (
      <React.Fragment>
        <Button
          data-test-cancel-loan-policy-form-action
          buttonStyle="dropdownItem"
          id="dropdown-clickable-cancel-item"
          onClick={handleCancelClick}
        >
          <Icon icon="times">
            <FormattedMessage id="ui-circulation.settings.common.cancel" />
          </Icon>
        </Button>
        <IfPermission perm={permissions.delete}>
          <Button
            data-test-delete-loan-policy-form-action
            buttonStyle="dropdownItem"
            id="dropdown-clickable-delete-item"
            onClick={handleDeleteClick}
          >
            <Icon icon="trash">
              <FormattedMessage id="ui-circulation.settings.common.delete" />
            </Icon>
          </Button>
        </IfPermission>
      </React.Fragment>
    );
  };

  render() {
    const {
      children,
      editMode,
    } = this.props;

    return (
      <Pane
        defaultWidth="100%"
        firstMenu={this.renderCancelButton()}
        lastMenu={this.renderSaveButton()}
        paneTitle={this.renderPanelTitle()}
        {... editMode ? { actionMenu: this.renderActionMenuItems } : {}}
      >
        {children}
      </Pane>
    );
  }
}

export default HeaderPane;
