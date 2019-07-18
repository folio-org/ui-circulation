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
    tokens: PropTypes.object.isRequired,
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
            header={<FormattedMessage id="ui-circulation.settings.staffSlips.itemTokenHeader" />}
            tokens={Object.keys(tokens.item)}
            onSelect={onSelect}
          />
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.effectiveLocationTokenHeader" />}
                tokens={Object.keys(tokens.effectiveLocation)}
                onSelect={onSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.staffSlipTokenHeader" />}
                tokens={Object.keys(tokens.staffSlip)}
                onSelect={onSelect}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.requestTokenHeader" />}
                tokens={Object.keys(tokens.request)}
                onSelect={onSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.requesterTokenHeader" />}
                tokens={Object.keys(tokens.requester)}
                onSelect={onSelect}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default TokensList;
