import React from 'react';
import {
  screen,
  render,
} from '@testing-library/react';

import '../../../../test/jest/__mock__';

import { TokensSection } from '@folio/stripes-template-editor';

import TokensList, {
  LOAN_TAG,
  FEE_FINE_CHARGE_TAG,
  isDisabledLoop,
  TOKEN_SECTION,
} from './TokensList';
import getTokensProps from '../tokens';
import { LOCALE_FOR_TESTS } from '../utils/constantsForMoment';
import { patronNoticeCategoryIds } from '../../../constants';

jest.mock('@folio/stripes-template-editor', () => ({
  TokensSection: jest.fn(() => null),
}));

const TOKEN_SECTION_LIST = [
  TOKEN_SECTION.ITEM,
  TOKEN_SECTION.EFFECTIVE_LOCATION,
  TOKEN_SECTION.LOAN,
  TOKEN_SECTION.REQUEST,
  TOKEN_SECTION.USER,
  TOKEN_SECTION.USER_ADDRESS,
  TOKEN_SECTION.FEE_FINE_CHARGE,
  TOKEN_SECTION.FEE_FINE_ACTION,
];
const testIds = {
  tokenListWrapper: 'tokenListWrapper',
};

describe('View TokensList', () => {
  const tokensProps = getTokensProps(LOCALE_FOR_TESTS);
  const mockedOnLoopSelect = jest.fn();
  const mockedOnSectionInit = jest.fn();
  const mockedOnTokenSelect = jest.fn();
  const selectedCategory = 'Loan';
  const defaultProps = {
    selectedCategory,
    tokens: tokensProps,
    onLoopSelect: mockedOnLoopSelect,
    onSectionInit: mockedOnSectionInit,
    onTokenSelect: mockedOnTokenSelect,
  };

  const tokensSectionTest = (name, index) => {
    describe(`Tokens section ${name}`, () => {
      it(`should execute TokensSection for ${name} with passed props`, () => {
        const number = index + 1;
        const expectedResult = {
          section: name,
          selectedCategory,
          header: `ui-circulation.settings.patronNotices.${name}TokenHeader`,
          tokens: tokensProps[name],
          onSectionInit: mockedOnSectionInit,
          onTokenSelect: mockedOnTokenSelect,
        };

        if (name === TOKEN_SECTION.LOAN) {
          expectedResult.onLoopSelect = mockedOnLoopSelect;
          expectedResult.loopConfig = {
            enabled: true,
            label: 'ui-circulation.settings.patronNotices.multipleLoans',
            tag: LOAN_TAG,
            isDisabledLoop: null,
          };
        }

        if (name === TOKEN_SECTION.FEE_FINE_CHARGE) {
          expectedResult.onLoopSelect = mockedOnLoopSelect;
          expectedResult.loopConfig = {
            enabled: true,
            label: 'ui-circulation.settings.patronNotices.multipleFeeFineCharges',
            tag: FEE_FINE_CHARGE_TAG,
            isDisabledLoop,
          };
        }

        expect(TokensSection).toHaveBeenNthCalledWith(number, expect.objectContaining(expectedResult), {});
      });
    });
  };

  beforeEach(() => {
    render(
      <TokensList {...defaultProps} />
    );
  });

  afterEach(() => {
    TokensSection.mockClear();
  });

  it('should render TokensList component', () => {
    expect(screen.getByTestId(testIds.tokenListWrapper)).toBeVisible();
  });

  TOKEN_SECTION_LIST.forEach(tokensSectionTest);

  describe('isDisabledLoop', () => {
    it(`should return true for category not equal to ${patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE}`, () => {
      expect(isDisabledLoop(patronNoticeCategoryIds.LOAN, FEE_FINE_CHARGE_TAG, true)).toBeTruthy();
    });

    it(`should return true for tag not equal to ${FEE_FINE_CHARGE_TAG}`, () => {
      expect(isDisabledLoop(patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE, LOAN_TAG, true)).toBeTruthy();
    });

    it(`should return false for category ${patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE} and tag ${FEE_FINE_CHARGE_TAG}`, () => {
      expect(isDisabledLoop(patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE, FEE_FINE_CHARGE_TAG, true)).toBeFalsy();
    });
  });
});
