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
    onSectionInit: PropTypes.func.isRequired,
    onTokenSelect: PropTypes.func.isRequired,
  };

  render() {
    const {
      tokens,
      onSectionInit,
      onTokenSelect,
    } = this.props;

    return (
      <Row>
        <Col xs={4}>
          <TokensSection
            section="item"
            header={<FormattedMessage id="ui-circulation.settings.staffSlips.itemTokenHeader" />}
            tokens={Object.keys(tokens.item)}
            onSectionInit={onSectionInit}
            onTokenSelect={onTokenSelect}
          />
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="effectiveLocation"
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.effectiveLocationTokenHeader" />}
                tokens={Object.keys(tokens.effectiveLocation)}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="staffSlip"
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.staffSlipTokenHeader" />}
                tokens={Object.keys(tokens.staffSlip)}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="request"
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.requestTokenHeader" />}
                tokens={Object.keys(tokens.request)}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="requester"
                header={<FormattedMessage id="ui-circulation.settings.staffSlips.requesterTokenHeader" />}
                tokens={Object.keys(tokens.requester)}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default TokensList;
