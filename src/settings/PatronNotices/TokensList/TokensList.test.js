import React from 'react';

import {
  screen,
  render,
  within,
} from '@testing-library/react';

import '../../../../test/jest/__mock__';

import TokensList from './TokensList';
import getTokensProps from '../tokens';

import { LOCALE_FOR_TESTS } from '../utils/constantsForMoment';

jest.mock('@folio/stripes-template-editor', () => ({
  TokensSection: jest.fn(({
    selectedCategory,
    header,
    tokens = [],
    loopConfig = {
      enabled: true,
      label: 'label',
      tag: 'tag',
    },
    section,
    onLoopSelect = jest.fn(),
    // eslint-disable-next-line no-unused-vars
    onSectionInit = jest.fn(),
    onTokenSelect = jest.fn(),
    ...rest
  }) => (
    <div section={section} {...rest}>
      <div data-testid={`headerFor${section}`}>{header}</div>
      <ul data-testid="availableTokens">
        {tokens.map(({ token, allowedFor }) => {
          const disabled = selectedCategory && !allowedFor.includes(selectedCategory);

          return (
            <li key={token}>
              <input
                data-testid={token}
                type="checkbox"
                value={token}
                label={token}
                disabled={disabled}
                onChange={onTokenSelect}
              />
            </li>
          );
        })}
        { loopConfig.enabled && (
          <>
            <hr />
            <input
              data-testid="multipleTokens"
              type="checkbox"
              value={loopConfig.tag}
              label={<strong>{loopConfig.label}</strong>}
              onChange={onLoopSelect}
            />
          </>
        )}
      </ul>
    </div>
  )),
}));

const tokensProps = getTokensProps(LOCALE_FOR_TESTS);

const testTokensSection = (sectionTestId) => {
  describe(`View ${sectionTestId} TokensSection`, () => {
    it(`should render ${sectionTestId} section`, () => {
      const sectionTestIdValue = screen.getByTestId(sectionTestId);

      expect(sectionTestIdValue).toBeVisible();
      expect(sectionTestIdValue).toHaveAttribute('section', sectionTestId);
      expect(within(screen
        .getByTestId(`headerFor${sectionTestId}`))
        .getByText(`ui-circulation.settings.patronNotices.${sectionTestId}TokenHeader`))
        .toBeVisible();
    });

    tokensProps[sectionTestId].forEach(({ token }) => (
      it(`should render checkbox for ${token}`, () => {
        expect(screen.getByTestId(token)).toHaveAttribute('label', token);
        expect(screen.getByTestId(token)).toHaveAttribute('value', token);
      })
    ));
  });
};

describe('View TokensList', () => {
  const defaultProps = {
    onLoopSelect: jest.fn(),
    onSectionInit: jest.fn(),
    onTokenSelect: jest.fn(),
    selectedCategory: 'Loan',
    tokens: tokensProps,
  };

  describe('with default props', () => {
    beforeEach(() => {
      render(<TokensList {...defaultProps} />);
    });

    it('should render TokensList component', () => {
      expect(screen.getByTestId('tokenListWrapper')).toBeVisible();
    });

    testTokensSection('item');
    testTokensSection('effectiveLocation');
    testTokensSection('loan');
    testTokensSection('request');
    testTokensSection('user');
    testTokensSection('feeFineCharge');
    testTokensSection('feeFineAction');
  });
});
