import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { ConfirmationModal } from '@folio/stripes/components';

class DeleteConfirmationModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    policyName: PropTypes.string.isRequired,
    deleteEntityKey: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    onCancel: PropTypes.func.isRequired,
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
    this.props.onCancel(false);
  };

  render() {
    const {
      isOpen,
      policyName,
      deleteEntityKey
    } = this.props;

    const confirmationMessage = (
      <FormattedMessage
        id="ui-circulation.settings.common.deleteMessage"
        values={{
          name: <strong>{policyName}</strong>,
          removed: <strong><FormattedMessage id="ui-circulation.settings.common.removed" /></strong>,
        }}
      />
    );

    return (
      <ConfirmationModal
        id="delete-item-confirmation"
        open={isOpen}
        heading={<FormattedMessage id={deleteEntityKey} />}
        message={confirmationMessage}
        confirmLabel={<FormattedMessage id="ui-circulation.settings.common.delete" />}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
      />
    );
  }
}

export default DeleteConfirmationModal;
