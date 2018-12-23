import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  IconButton,
  PaneMenu,
} from '@folio/stripes/components';

const CancelButton = ({ onCancel }) => (
  <PaneMenu>
    <FormattedMessage id="ui-circulation.settings.fDDSform.closeLabel">
      {ariaLabel => (
        <IconButton
          icon="times"
          size="medium"
          iconClassName="closeIcon"
          aria-label={ariaLabel}
          onClick={onCancel}
        />
      )}
    </FormattedMessage>
  </PaneMenu>
);

CancelButton.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default CancelButton;
