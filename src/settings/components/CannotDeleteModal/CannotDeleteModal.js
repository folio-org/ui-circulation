import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Modal, Button } from '@folio/stripes/components';

class CannotDeleteModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    messageKey: PropTypes.string.isRequired,
    labelKey: PropTypes.string.isRequired,
  };

  render() {
    const {
      isOpen,
      onConfirm,
      labelKey,
      messageKey,
    } = this.props;

    return (
      <Modal
        id="cannot-delete-modal"
        data-test-cannot-delete-modal
        label={<FormattedMessage id={labelKey} />}
        open={isOpen}
        footer={
          <Button
            data-test-cannot-delete-modal-close
            onClick={onConfirm}
          >
            <FormattedMessage id="stripes-core.button.back" />
          </Button>
        }
      >
        <FormattedMessage id={messageKey} />
      </Modal>
    );
  }
}

export default CannotDeleteModal;
