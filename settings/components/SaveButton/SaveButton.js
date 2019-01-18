import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  PaneMenu,
} from '@folio/stripes/components';

const SaveButton = ({
  pristine,
  submitting,
  textKey,
  buttonStyle
}) => (
  <PaneMenu>
    <Button
      id="clickable-save-entry"
      type="submit"
      buttonStyle={buttonStyle}
      disabled={(pristine || submitting)}
      marginBottom0
    >
      <FormattedMessage id={textKey} />
    </Button>
  </PaneMenu>
);

SaveButton.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  textKey: PropTypes.string,
  buttonStyle: PropTypes.string,
};

SaveButton.defaultProps = {
  textKey: 'ui-circulation.settings.common.saveAndClose',
  buttonStyle: 'default',
};

export default SaveButton;
