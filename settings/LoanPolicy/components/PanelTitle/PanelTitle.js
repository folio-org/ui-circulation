import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const PanelTitle = ({ editMode }) => (
  editMode
    ? <FormattedMessage id="ui-circulation.settings.loanPolicy.editEntryLabel" />
    : <FormattedMessage id="ui-circulation.settings.loanPolicy.createEntryLabel" />
);

PanelTitle.propTypes = {
  editMode: PropTypes.bool.isRequired,
};

export default PanelTitle;
