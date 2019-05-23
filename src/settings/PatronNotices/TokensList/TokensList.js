import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

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
        <Col xs={4}>
          <TokensSection
            header={<FormattedMessage id="ui-circulation.settings.patronNotices.itemTokenHeader" />}
            tokens={tokens}
            onSelect={onSelect}
          />
        </Col>
        <Col xs={4}><br /></Col>
        <Col xs={4}><br /></Col>
      </Row>
    );
  }
}

export default TokensList;
