import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Modal,
} from '@folio/stripes/components';

const EntityInUseModal = ({
  isOpen,
  closeTranslationKey,
  labelTranslationKey,
  contentTranslationKey,
  onClose,
}) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Modal
      open={isOpen}
      id="entity-in-use-modal"
      data-test-entity-in-use-modal
      label={<FormattedMessage id={labelTranslationKey} />}
      size="medium"
      footer={(
        <Button
          buttonStyle="primary"
          marginBottom0
          data-test-entity-in-use-modal-close
          onClick={handleClose}
        >
          <FormattedMessage id={closeTranslationKey} />
        </Button>
      )}
    >
      <FormattedMessage id={contentTranslationKey} />
    </Modal>
  );
};

EntityInUseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeTranslationKey: PropTypes.string,
  labelTranslationKey: PropTypes.string.isRequired,
  contentTranslationKey: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

EntityInUseModal.defaultProps = {
  closeTranslationKey: 'ui-circulation.settings.common.close',
};

export default EntityInUseModal;
