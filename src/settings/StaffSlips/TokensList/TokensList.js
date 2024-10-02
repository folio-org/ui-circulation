import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';
import { TokensSection } from '@folio/stripes-template-editor';

class TokensList extends React.Component {
  static propTypes = {
    tokens: PropTypes.object.isRequired,
    onSectionInit: PropTypes.func.isRequired,
    onTokenSelect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  render() {
    const {
      tokens,
      onSectionInit,
      onTokenSelect,
      intl,
    } = this.props;
    const { formatMessage } = intl;

    return (
      <Row>
        <Col xs={4}>
          <TokensSection
            section="item"
            header={formatMessage({ id: 'ui-circulation.settings.staffSlips.itemTokenHeader' })}
            tokens={tokens.item}
            onSectionInit={onSectionInit}
            onTokenSelect={onTokenSelect}
          />
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="effectiveLocation"
                header={formatMessage({ id: 'ui-circulation.settings.staffSlips.effectiveLocationTokenHeader' })}
                tokens={tokens.effectiveLocation}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="staffSlip"
                header={formatMessage({ id: 'ui-circulation.settings.staffSlips.staffSlipTokenHeader' })}
                tokens={tokens.staffSlip}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="borrower"
                header={formatMessage({ id: 'ui-circulation.settings.staffSlips.borrowerTokenHeader' })}
                tokens={tokens.borrower}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="loan"
                header={formatMessage({ id: 'ui-circulation.settings.staffSlips.loanTokenHeader' })}
                tokens={tokens.loan}
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
                header={formatMessage({ id: 'ui-circulation.settings.staffSlips.requestTokenHeader' })}
                tokens={tokens.request}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="requestDeliveryAddress"
                header={formatMessage({ id: 'ui-circulation.settings.staffSlips.requestDeliveryAddressTokenHeader' })}
                tokens={tokens.requestDeliveryAddress}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="requester"
                header={formatMessage({ id: 'ui-circulation.settings.staffSlips.requesterTokenHeader' })}
                tokens={tokens.requester}
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

export default injectIntl(TokensList);
