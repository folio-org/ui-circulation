import React from 'react';
import { isString } from 'lodash';
import {
  screen,
  render,
  within,
} from '@testing-library/react';

import '../../../../test/jest/__mock__';

import tokens from '../tokens';
import TokensList from './TokensList';

const testTokensSection = (sectionTestId) => {
  it(`should render 'TokensSection' for section ${sectionTestId}`, () => {
    const sectionTestIdValue = screen.getByTestId(sectionTestId);

    expect(sectionTestIdValue).toBeVisible();
    expect(sectionTestIdValue).toHaveAttribute('section', sectionTestId);
    expect(within(screen
      .getByTestId(`headerFor${sectionTestId}`))
      .getByText(`ui-circulation.settings.patronNotices.${sectionTestId}TokenHeader`))
      .toBeVisible();

    tokens[sectionTestId].map((token) => {
      if (isString(token)) {
        return (
          it(`should render checkbox for ${token}`, () => {
            expect(within(screen
              .getByTestId(token))
              .getByDisplayValue(token))
              .toBeVisible();

            expect(within(screen
              .getByTestId(token))
              .getByLabelText(token))
              .toBeVisible();
          })
        );
      } else {
        return null;
      }
    });
  });
};

describe('View TokensList', () => {
  const defaultProps = {
    onLoopSelect: jest.fn(),
    onSectionInit: jest.fn(),
    onTokenSelect: jest.fn(),
    selectedCategory: 'Loan',
    tokens,
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


