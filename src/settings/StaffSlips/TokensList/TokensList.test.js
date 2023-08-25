import React from 'react';
import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../test/jest/__mock__';

import { TokensSection } from '@folio/stripes-template-editor';
import TokensList from './TokensList';

jest.mock('@folio/stripes-template-editor', () => ({
  TokensSection: jest.fn(() => null),
}));

describe('TokensList', () => {
  const mockedTokens = {
    item: 'testItem',
    effectiveLocation: 'testEffectiveLocation',
    staffSlip: 'testStaffSlip',
    request: 'testRequest',
    requestDeliveryAddress: 'testRequestDeliveryAddress',
    requester: 'testRequester',
  };
  const mockedOnSectionInit = jest.fn();
  const mockedOnTokenSelect = jest.fn();

  const sectionNamesForTest = [
    'item',
    'effectiveLocation',
    'staffSlip',
    'request',
    'requestDeliveryAddress',
    'requester',
  ];

  const tokensSectionTest = (name, index) => {
    it(`should execute "TokensSection" in "${name}" section with passed props`, () => {
      const number = index + 1;
      const expectedResult = {
        section: name,
        header: `ui-circulation.settings.staffSlips.${name}TokenHeader`,
        tokens: mockedTokens[name],
        onSectionInit: mockedOnSectionInit,
        onTokenSelect: mockedOnTokenSelect,
      };

      expect(TokensSection).toHaveBeenNthCalledWith(number, expectedResult, {});
    });
  };

  beforeEach(() => {
    render(
      <TokensList
        tokens={mockedTokens}
        onSectionInit={mockedOnSectionInit}
        onTokenSelect={mockedOnTokenSelect}
      />
    );
  });

  afterEach(() => {
    TokensSection.mockClear();
  });

  sectionNamesForTest.forEach(tokensSectionTest);
});
