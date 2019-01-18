import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Button } from '@folio/stripes/components';
import { IfPermission } from '@folio/stripes/core';

import { DeleteConfirmationModal } from '../../../components';

class DeleteEntity extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    perm: PropTypes.string.isRequired,
    policyName: PropTypes.string.isRequired,
    deleteEntityKey: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    onRemoveStatusChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  openConfirmationModal = () => {
    this.props.onRemoveStatusChange(true);
  };

  render() {
    const {
      isOpen,
      policyName,
      perm,
      deleteEntityKey,
      initialValues,
      onRemove,
      onRemoveStatusChange,
    } = this.props;

    return (
      <React.Fragment>
        <IfPermission perm={perm}>
          <Button
            id="clickable-delete-entry"
            disabled={isOpen}
            onClick={this.openConfirmationModal}
          >
            <FormattedMessage id={deleteEntityKey} />
          </Button>
        </IfPermission>
        <DeleteConfirmationModal
          isOpen={isOpen}
          policyName={policyName}
          deleteEntityKey="ui-circulation.settings.noticePolicy.deleteLoanPolicy"
          initialValues={initialValues}
          onCancel={onRemoveStatusChange}
          onRemove={onRemove}
        />
      </React.Fragment>
    );
  }
}

export default DeleteEntity;
