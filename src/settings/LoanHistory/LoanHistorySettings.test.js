import React from 'react';
import { render } from '@testing-library/react';

import '../../../test/jest/__mock__';

import { ConfigManager } from '@folio/stripes/smart-components';

import LoanHistorySettings, {
  getInitialValues,
  normalizeData,
} from './LoanHistorySettings';
import LoanHistoryForm from './LoanHistoryForm';

jest.mock('./LoanHistoryForm', () => jest.fn(() => null));

describe('LoanHistorySettings', () => {
  const labelIds = {
    loanHistory: 'ui-circulation.settings.index.loanHistory',
  };

  const testStripes = {
    connect: jest.fn((Component) => Component),
  };

  const testDefaultProps = {
    stripes: testStripes,
  };

  afterEach(() => {
    ConfigManager.mockClear();
  });

  describe('with default props', () => {
    it('should render "EntryManager" component', () => {
      render(
        <LoanHistorySettings {...testDefaultProps} />
      );

      expect(ConfigManager).toHaveBeenCalledWith(expect.objectContaining({
        label: labelIds.loanHistory,
        moduleName: 'LOAN_HISTORY',
        configName: 'loan_history',
        configFormComponent: LoanHistoryForm,
        stripes: testStripes,
        getInitialValues,
        onBeforeSave: normalizeData,
      }), {});
    });
  });

  describe('getInitialValues method', () => {
    const defaultConfig = {
      closingType: {
        loan: null,
        feeFine: null,
        loanExceptions: [],
      },
      loan: {},
      feeFine: {},
      loanExceptions: [],
      treatEnabled: false,
    };

    it('should get initial values when settings are not passed', () => {
      expect(getInitialValues()).toEqual(defaultConfig);
    });

    it('should get initial values when settings are passed and settings are empty object', () => {
      expect(getInitialValues({})).toEqual(defaultConfig);
    });

    it('should get initial values when settings are passed and settings are not empty object', () => {
      const value = {
        a: 'a',
        b: 'b',
      };
      const expectedResult = {
        ...defaultConfig,
        ...value,
      };

      expect(getInitialValues([{ value: JSON.stringify(value) }])).toEqual(expectedResult);
    });
  });
});
