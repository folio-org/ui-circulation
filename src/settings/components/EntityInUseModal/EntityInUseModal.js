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

  const footer = (
    <React.Fragment>
      <Button
        buttonStyle="primary"
        marginBottom0
        onClick={handleClose}
      >
        <FormattedMessage id={closeTranslationKey} />
      </Button>
    </React.Fragment>
  );

  return (
    <Modal
      open={isOpen}
      id="entity-in-use-modal"
      label={<FormattedMessage id={labelTranslationKey} />}
      size="medium"
      footer={footer}
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
