import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Col,
  Modal,
  Row,
} from '@folio/stripes/components';

import TokensSection from '../TokensSection';

// import css from './TokensModal.css';

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
    itemTokens,
    onCancel,
    onAdd,
  } = props;

  const [tokens, dispatch] = useReducer(tokensReducer, []);

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
    onAdd(tokens);
  };

  const footer = (
    <React.Fragment>
      <Button
        buttonStyle="primary"
        marginBottom0
        onClick={onAddTokens}
      >
        <FormattedMessage id="ui-circulation.settings.patronNotices.addToken" />
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        marginBottom0
        onClick={onClose}
      >
        <FormattedMessage id="ui-circulation.settings.common.cancel" />
      </Button>
    </React.Fragment>
  );

  return (
    <Modal
      dismissible
      open={isOpen}
      label={<FormattedMessage id="ui-circulation.settings.patronNotices.addToken" />}
      onClose={onClose}
      footer={footer}
    >
      <Row>
        <Col xs={4}>
          <TokensSection
            header={<FormattedMessage id="ui-circulation.settings.patronNotices.itemTokenHeader" />}
            tokens={itemTokens}
            onSelect={onSelect}
          />
        </Col>
        <Col xs={4}><br /></Col>
        <Col xs={4}><br /></Col>
      </Row>
    </Modal>
  );
};

TokensModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  itemTokens: PropTypes.arrayOf(PropTypes.string),
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default TokensModal;
