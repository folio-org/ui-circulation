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
}) => (
  <PaneMenu>
    <Button
      id="clickable-save-fixedDueDateSchedule"
      type="submit"
      disabled={(pristine || submitting)}
      marginBottom0
    >
      <FormattedMessage id="ui-circulation.settings.loanPolicy.saveAndClose" />
    </Button>
  </PaneMenu>
);

SaveButton.propTypes = {
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default SaveButton;
