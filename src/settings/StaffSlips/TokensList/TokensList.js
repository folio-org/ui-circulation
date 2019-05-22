import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { TokensSection } from '../../components';

class TokensList extends React.Component {
  static propTypes = {
    tokens: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  render() {
    const {
      tokens,
      onSelect,
    } = this.props;

    return (
      <Row>
        <Col xs={12}>
          <TokensSection
            tokens={tokens}
            onSelect={onSelect}
          />
        </Col>
      </Row>
    );
  }
}

export default TokensList;
