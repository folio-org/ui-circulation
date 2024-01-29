import { render } from '@folio/jest-config-stripes/testing-library/react';

import { ConfigManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

import LoanHistorySettings, {
  getInitialValues,
  normalizeData,
} from './LoanHistorySettings';
import LoanHistoryForm from './LoanHistoryForm';

jest.mock('./LoanHistoryForm', () => jest.fn(() => null));

describe('LoanHistorySettings', () => {
  const labelIds = {
    loanAnonymization: 'ui-circulation.settings.index.loanAnonymization',
    generalTitle: 'ui-circulation.settings.title.general',
    loanAnonymizationTitle: 'ui-circulation.settings.title.loanAnonymization',
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
    beforeEach(() => {
      render(
        <LoanHistorySettings
          {...testDefaultProps}
        />
      );
    });

    it('should render "EntryManager" component', () => {
      expect(ConfigManager).toHaveBeenCalledWith(expect.objectContaining({
        label: labelIds.loanAnonymization,
        moduleName: 'LOAN_HISTORY',
        configName: 'loan_history',
        configFormComponent: LoanHistoryForm,
        stripes: testStripes,
        getInitialValues,
        onBeforeSave: normalizeData,
      }), {});
    });

    it('should trigger TitleManager with correct props', () => {
      const expectedProps = {
        page: labelIds.generalTitle,
        record: labelIds.loanAnonymizationTitle,
      };

      expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
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
