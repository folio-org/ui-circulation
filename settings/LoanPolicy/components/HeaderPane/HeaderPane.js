import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Pane } from '@folio/stripes/components';

import {
  CancelButton,
  SaveButton,
} from '../../../components';

class HeaderPane extends React.Component {
  static propTypes = {
    editMode: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  renderCancelButton = () => {
    const { onCancel } = this.props;

    return <CancelButton onCancel={onCancel} />;
  };

  renderSaveButton = () => {
    const {
      pristine,
      submitting,
    } = this.props;

    return (
      <SaveButton
        pristine={pristine}
        submitting={submitting}
      />
    );
  };

  renderPanelTitle = () => {
    const { editMode } = this.props;

    return editMode
      ? <FormattedMessage id="ui-circulation.settings.loanPolicy.editEntryLabel" />
      : <FormattedMessage id="ui-circulation.settings.loanPolicy.createEntryLabel" />;
  };

  render() {
    const { children } = this.props;

    return (
      <Pane
        defaultWidth="100%"
        firstMenu={this.renderCancelButton()}
        lastMenu={this.renderSaveButton()}
        paneTitle={this.renderPanelTitle()}
      >
        {children}
      </Pane>
    );
  }
}

export default HeaderPane;
