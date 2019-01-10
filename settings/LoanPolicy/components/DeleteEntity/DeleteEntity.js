import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  ConfirmationModal,
} from '@folio/stripes/components';

import { IfPermission } from '@folio/stripes/core';

class DeleteEntity extends React.Component {
  static propTypes = {
    policyName: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    confirmDelete: PropTypes.bool.isRequired,
    changeDeleteState: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  onConfirm = () => {
    const {
      initialValues,
      onRemove,
    } = this.props;

    onRemove(initialValues);
  };

  onCancel = () => {
    this.props.changeDeleteState(false);
  };

  openConfirmationModal = () => {
    this.props.changeDeleteState(true);
  };

  render() {
    const {
      confirmDelete,
      policyName,
    } = this.props;

    const confirmationMessage = (
      <FormattedMessage
        id="ui-circulation.settings.loanPolicy.deleteMessage"
        values={{
          name: <strong>{policyName}</strong>,
          removed: <strong><FormattedMessage id="ui-circulation.settings.loanPolicy.removed" /></strong>,
        }}
      />
    );

    return (
      <React.Fragment>
        <IfPermission perm="ui-circulation.settings.loan-policies">
          <Button
            id="clickable-delete-entry"
            disabled={confirmDelete}
            onClick={this.openConfirmationModal}
          >
            <FormattedMessage id="ui-circulation.settings.loanPolicy.deleteLoanPolicy" />
          </Button>
        </IfPermission>
        <ConfirmationModal
          id="delete-item-confirmation"
          open={confirmDelete}
          heading={<FormattedMessage id="ui-circulation.settings.loanPolicy.deleteLoanPolicy" />}
          message={confirmationMessage}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          confirmLabel={<FormattedMessage id="ui-circulation.settings.loanPolicy.delete" />}
          buttonStyle="primary"
        />
      </React.Fragment>
    );
  }
}

export default DeleteEntity;
