import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { isEmpty } from 'lodash';

import {
  Button,
  Modal,
} from '@folio/stripes/components';

import css from './TokensModal.css';

const tokensReducer = (tokens, action) => {
  switch (action.type) {
    case 'add':
      return [...tokens, action.payload];
    case 'remove':
      return tokens.filter((token) => token !== action.payload);
    case 'reset':
      return [];
    default:
      return tokens;
  }
};

const TokensModal = (props) => {
  const {
    isOpen,
    tokens,
    list: List,
    onCancel,
    onAdd,
  } = props;

  const [selectedTokens, dispatch] = useReducer(tokensReducer, []);

  const onSelect = (value, checked) => {
    const action = checked ? 'add' : 'remove';
    dispatch({ type: action, payload: value });
  };

  const onClose = () => {
    onCancel();
    dispatch({ type: 'reset' });
  };

  const onAddTokens = () => {
    onClose();
    onAdd(selectedTokens);
  };

  const footer = (
    <div className={css.footer}>
      <Button
        data-test-close-tokens-modal
        marginBottom0
        onClick={onClose}
      >
        <FormattedMessage id="ui-circulation.settings.common.cancel" />
      </Button>
      <Button
        data-test-add-tokens
        disabled={isEmpty(selectedTokens)}
        buttonStyle="primary"
        marginBottom0
        onClick={onAddTokens}
      >
        <FormattedMessage id="ui-circulation.settings.patronNotices.addToken" />
      </Button>
    </div>
  );

  return (
    <Modal
      data-test-template-editor-tokens-modal
      open={isOpen}
      label={<FormattedMessage id="ui-circulation.settings.patronNotices.addToken" />}
      size="large"
      footer={footer}
    >
      <List
        tokens={tokens}
        onSelect={onSelect}
      />
    </Modal>
  );
};

TokensModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  tokens: PropTypes.object.isRequired,
  list: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default TokensModal;
