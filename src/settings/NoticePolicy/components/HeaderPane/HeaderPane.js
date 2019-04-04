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
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    entryTitle: '',
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
          data-test-cancel-user-form-action
          buttonStyle="dropdownItem"
          onClick={handleCancelClick}
        >
          <Icon icon="times">
            <FormattedMessage id="ui-circulation.settings.common.cancel" />
          </Icon>
        </Button>
        <IfPermission perm={permissions.delete}>
          <Button
            data-test-delete-user-form-action
            buttonStyle="dropdownItem"
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
        textKey="ui-circulation.settings.noticePolicy.saveAndClose"
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
      : <FormattedMessage id="ui-circulation.settings.noticePolicy.createEntryLabel" />;
  };

  render() {
    const {
      editMode,
      children,
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
