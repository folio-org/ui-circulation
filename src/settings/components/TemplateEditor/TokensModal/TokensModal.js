import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  every,
  isEmpty,
  omitBy,
} from 'lodash';

import {
  Button,
  Modal,
} from '@folio/stripes/components';

import {
  ADD_TOKEN,
  REMOVE_TOKEN,
  RESET_TOKENS,
  SETUP_SECTION,
  TOGGLE_LOOP,
  tokensReducer,
} from './store';

import css from './TokensModal.css';

const TokensModal = (props) => {
  const {
    isOpen,
    tokens,
    list: List,
    onCancel,
    onAdd,
  } = props;

  const [selectedTokens, dispatch] = useReducer(tokensReducer, {});

  const onTokenSelect = (token, checked, section) => {
    const type = checked ? ADD_TOKEN : REMOVE_TOKEN;
    const payload = { token, section };

    dispatch({ type, payload });
  };

  const onLoopSelect = (section, isLoopSelected) => {
    dispatch({ type: TOGGLE_LOOP, payload: { section, isLoopSelected } });
  };

  const onSectionInit = (section, tag = null) => {
    dispatch({ type: SETUP_SECTION, payload: { section, tag } });
  };

  const onClose = () => {
    onCancel();
    dispatch({ type: RESET_TOKENS });
  };

  const onAddTokens = () => {
    onClose();
    onAdd(omitBy(selectedTokens, section => isEmpty(section.tokens)));
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
        disabled={every(selectedTokens, section => isEmpty(section.tokens))}
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
        onLoopSelect={onLoopSelect}
        onSectionInit={onSectionInit}
        onTokenSelect={onTokenSelect}
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
