import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { TokensSection } from '@folio/stripes-template-editor';

class TokensList extends React.Component {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    tokens: PropTypes.object.isRequired,
    onLoopSelect: PropTypes.func.isRequired,
    onSectionInit: PropTypes.func.isRequired,
    onTokenSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.loansLoopConfig = {
      enabled: true,
      label: <FormattedMessage id="ui-circulation.settings.patronNotices.multipleLoans" />,
      tag: 'loans',
    };
  }

  render() {
    const {
      selectedCategory,
      tokens,
      onLoopSelect,
      onSectionInit,
      onTokenSelect,
    } = this.props;

    return (
      <Row>
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="item"
                selectedCategory={selectedCategory}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.itemTokenHeader" />}
                tokens={tokens.item}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="effectiveLocation"
                selectedCategory={selectedCategory}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.effectiveLocationTokenHeader" />}
                tokens={tokens.effectiveLocation}
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
                section="loan"
                selectedCategory={selectedCategory}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.loanTokenHeader" />}
                tokens={tokens.loan}
                loopConfig={this.loansLoopConfig}
                onLoopSelect={onLoopSelect}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="request"
                selectedCategory={selectedCategory}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.requestTokenHeader" />}
                tokens={tokens.request}
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
                section="user"
                selectedCategory={selectedCategory}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.userTokenHeader" />}
                tokens={tokens.user}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="feeFineCharge"
                selectedCategory={selectedCategory}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.feeFineChargeTokenHeader" />}
                tokens={tokens.feeFineCharge}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section="feeFineAction"
                selectedCategory={selectedCategory}
                header={<FormattedMessage id="ui-circulation.settings.patronNotices.feeFineActionTokenHeader" />}
                tokens={tokens.feeFineAction}
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
