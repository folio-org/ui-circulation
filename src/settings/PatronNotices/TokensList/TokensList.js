import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import { TokensSection } from '@folio/stripes-template-editor';

import {
  patronNoticeCategoryIds,
} from '../../../constants';

export const TOKEN_SECTION = {
  ITEM: 'item',
  EFFECTIVE_LOCATION: 'effectiveLocation',
  LOAN: 'loan',
  REQUEST: 'request',
  USER: 'user',
  FEE_FINE_CHARGE: 'feeFineCharge',
  FEE_FINE_ACTION: 'feeFineAction',
};
export const LOAN_TAG = 'loans';
export const FEE_FINE_CHARGE_TAG = 'feeCharges';
export const isDisabledLoop = (selectedCategory, tag, disableLoop) => (
  tag === FEE_FINE_CHARGE_TAG
    ? selectedCategory !== patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE
    : disableLoop
);

class TokensList extends React.Component {
  static propTypes = {
    selectedCategory: PropTypes.string.isRequired,
    tokens: PropTypes.object.isRequired,
    onLoopSelect: PropTypes.func.isRequired,
    onSectionInit: PropTypes.func.isRequired,
    onTokenSelect: PropTypes.func.isRequired,
    intl: PropTypes.object.isRequired,
  };

  render() {
    const {
      selectedCategory,
      tokens,
      onLoopSelect,
      onSectionInit,
      onTokenSelect,
      intl: {
        formatMessage,
      },
    } = this.props;
    const loansLoopConfig = {
      enabled: true,
      label: formatMessage({ id: 'ui-circulation.settings.patronNotices.multipleLoans' }),
      tag: LOAN_TAG,
      isDisabledLoop: null,
    };
    const feeFineChargeLoopConfig = {
      enabled: true,
      label: formatMessage({ id: 'ui-circulation.settings.patronNotices.multipleFeeFineCharges' }),
      tag: FEE_FINE_CHARGE_TAG,
      isDisabledLoop,
    };

    return (
      <Row data-testid="tokenListWrapper">
        <Col xs={4}>
          <Row>
            <Col xs={12}>
              <TokensSection
                section={TOKEN_SECTION.ITEM}
                selectedCategory={selectedCategory}
                header={formatMessage({ id: 'ui-circulation.settings.patronNotices.itemTokenHeader' })}
                tokens={tokens[TOKEN_SECTION.ITEM]}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section={TOKEN_SECTION.EFFECTIVE_LOCATION}
                selectedCategory={selectedCategory}
                header={formatMessage({ id: 'ui-circulation.settings.patronNotices.effectiveLocationTokenHeader' })}
                tokens={tokens[TOKEN_SECTION.EFFECTIVE_LOCATION]}
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
                section={TOKEN_SECTION.LOAN}
                selectedCategory={selectedCategory}
                header={formatMessage({ id: 'ui-circulation.settings.patronNotices.loanTokenHeader' })}
                tokens={tokens[TOKEN_SECTION.LOAN]}
                loopConfig={loansLoopConfig}
                onLoopSelect={onLoopSelect}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section={TOKEN_SECTION.REQUEST}
                selectedCategory={selectedCategory}
                header={formatMessage({ id: 'ui-circulation.settings.patronNotices.requestTokenHeader' })}
                tokens={tokens[TOKEN_SECTION.REQUEST]}
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
                section={TOKEN_SECTION.USER}
                selectedCategory={selectedCategory}
                header={formatMessage({ id: 'ui-circulation.settings.patronNotices.userTokenHeader' })}
                tokens={tokens[TOKEN_SECTION.USER]}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section={TOKEN_SECTION.FEE_FINE_CHARGE}
                selectedCategory={selectedCategory}
                header={formatMessage({ id: 'ui-circulation.settings.patronNotices.feeFineChargeTokenHeader' })}
                tokens={tokens[TOKEN_SECTION.FEE_FINE_CHARGE]}
                loopConfig={feeFineChargeLoopConfig}
                onLoopSelect={onLoopSelect}
                onSectionInit={onSectionInit}
                onTokenSelect={onTokenSelect}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <TokensSection
                section={TOKEN_SECTION.FEE_FINE_ACTION}
                selectedCategory={selectedCategory}
                header={formatMessage({ id: 'ui-circulation.settings.patronNotices.feeFineActionTokenHeader' })}
                tokens={tokens[TOKEN_SECTION.FEE_FINE_ACTION]}
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
