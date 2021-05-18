import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  IconButton,
  PaneMenu,
} from '@folio/stripes/components';

const CancelButton = ({
  onCancel,
  labelKey,
}) => (
  <PaneMenu data-test-cancel-pane-menu>
    <FormattedMessage id={labelKey}>
      {ariaLabel => (
        <IconButton
          data-test-cancel-icon-button
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
  labelKey: PropTypes.string,
};

CancelButton.defaultProps = {
  labelKey: 'ui-circulation.settings.common.closeEntryDialog',
};

export default CancelButton;
