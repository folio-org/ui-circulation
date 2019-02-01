import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { ConfirmationModal } from '@folio/stripes/components';

import setSubmitSucceededAction from './actions/setSubmitSucceeded';

class DeleteConfirmationModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    triggerSubmitSucceeded: PropTypes.bool,
    formName: PropTypes.string,
    policyName: PropTypes.string.isRequired,
    deleteEntityKey: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    setSubmitSucceeded: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  static defaultProps = {
    triggerSubmitSucceeded: false,
    formName: '',
  };

  onConfirm = () => {
    const {
      initialValues,
      formName,
      triggerSubmitSucceeded,
      setSubmitSucceeded,
      onRemove,
    } = this.props;

    if (triggerSubmitSucceeded) {
      setSubmitSucceeded(formName);
    }

    onRemove(initialValues);
  };

  onCancel = () => {
    this.props.onCancel(false);
  };

  render() {
    const {
      isOpen,
      policyName,
      deleteEntityKey
    } = this.props;

    const confirmationMessage = (
      <FormattedMessage
        id="ui-circulation.settings.common.deleteMessage"
        values={{
          name: <strong>{policyName}</strong>,
          removed: <strong><FormattedMessage id="ui-circulation.settings.common.removed" /></strong>,
        }}
      />
    );

    return (
      <ConfirmationModal
        id="delete-item-confirmation"
        open={isOpen}
        heading={<FormattedMessage id={deleteEntityKey} />}
        message={confirmationMessage}
        confirmLabel={<FormattedMessage id="ui-circulation.settings.common.delete" />}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSubmitSucceeded: (formName) => dispatch(setSubmitSucceededAction(formName)),
});

export default connect(null, mapDispatchToProps)(DeleteConfirmationModal);
