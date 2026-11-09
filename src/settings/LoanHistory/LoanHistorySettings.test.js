import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  TitleManager,
} from '@folio/stripes/core';

import LoanHistoryForm from './LoanHistoryForm';
import LoanHistorySettings, {
  getInitialValues,
  normalizeData,
} from './LoanHistorySettings';
import {
  CirculationSettingsConfig,
} from '../components';
import normalize from './utils/normalize';

import {
  CONFIG_NAMES,
} from '../../constants';

jest.mock('@folio/stripes/core', () => ({
  TitleManager: jest.fn(({ children }) => <>{children}</>),
}));
jest.mock('./LoanHistoryForm', () => jest.fn(() => null));
jest.mock('../components', () => ({
  CirculationSettingsConfig: jest.fn(() => null),
}));
jest.mock('./utils/normalize', () => jest.fn(v => ({
  closingType: { loan: 'l', feeFine: 'f', loanExceptions: ['e'], userSpecific: 'u' },
  loan: { a: 1 },
  feeFine: { b: 2 },
  userSpecific: { c: 3 },
  loanExceptions: ['e'],
  treatEnabled: v?.treatEnabled ?? false,
})));

const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
  loanHistorySettingsTitle: 'ui-circulation.settings.title.loanAnonymization',
  paneTitle: 'ui-circulation.settings.index.loanAnonymization',
};

describe('LoanHistorySettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<LoanHistorySettings />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render TitleManager with correct props', () => {
    expect(TitleManager).toHaveBeenCalledWith(
      expect.objectContaining({
        page: labelIds.generalTitle,
        record: labelIds.loanHistorySettingsTitle,
      }),
      {}
    );
  });

  it('should render CirculationSettingsConfig with correct props', () => {
    expect(CirculationSettingsConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        label: labelIds.paneTitle,
        configName: CONFIG_NAMES.LOAN_HISTORY,
        configFormComponent: LoanHistoryForm,
        getInitialValues,
        onBeforeSave: normalizeData,
      }),
      {}
    );
  });
});

describe('getInitialValues', () => {
  it('should returns default config when input is empty', () => {
    expect(getInitialValues()).toEqual({
      closingType: { loan: 'never', feeFine: null, loanExceptions: [], userSpecific: 'disabled' },
      loan: {},
      feeFine: {},
      userSpecific: {},
      loanExceptions: [],
      treatEnabled: false,
    });
    expect(getInitialValues({})).toEqual({
      closingType: { loan: 'never', feeFine: null, loanExceptions: [], userSpecific: 'disabled' },
      loan: {},
      feeFine: {},
      userSpecific: {},
      loanExceptions: [],
      treatEnabled: false,
    });
  });

  it('should merges provided settings with defaults', () => {
    const custom = { treatEnabled: true, loan: { a: 1 } };

    expect(getInitialValues(custom)).toEqual({
      closingType: { loan: 'never', feeFine: null, loanExceptions: [], userSpecific: 'disabled' },
      loan: { a: 1 },
      feeFine: {},
      userSpecific: {},
      loanExceptions: [],
      treatEnabled: true,
    });
  });

  it('should treat a missing or null user-specific closing type as disabled', () => {
    const closingType = { loan: 'immediately', feeFine: null, loanExceptions: [] };

    expect(getInitialValues({ closingType }).closingType).toEqual({
      ...closingType,
      userSpecific: 'disabled',
    });
    expect(getInitialValues({ closingType: { ...closingType, userSpecific: null } }).closingType).toEqual({
      ...closingType,
      userSpecific: 'disabled',
    });
  });

  it('should treat a missing or null library closing type as never, like the backend', () => {
    const closingType = { feeFine: null, loanExceptions: [], userSpecific: 'interval' };

    expect(getInitialValues({ closingType }).closingType).toEqual({
      ...closingType,
      loan: 'never',
    });
    expect(getInitialValues({ closingType: { ...closingType, loan: null } }).closingType).toEqual({
      ...closingType,
      loan: 'never',
    });
  });

  it('should keep a stored user-specific closing type and period', () => {
    const settings = {
      closingType: { loan: 'interval', feeFine: null, loanExceptions: [], userSpecific: 'interval' },
      userSpecific: { duration: 7, intervalId: 'Days' },
    };

    expect(getInitialValues(settings)).toEqual(expect.objectContaining(settings));
  });
});

describe('normalizeData', () => {
  beforeEach(() => {
    normalize.mockClear();
  });

  it('should returns normalized data with feeFine if treatEnabled is true', () => {
    const input = { treatEnabled: true };
    const result = normalizeData(input);

    expect(result).toEqual({
      closingType: { loan: 'l', feeFine: 'f', loanExceptions: ['e'], userSpecific: 'u' },
      loan: { a: 1 },
      feeFine: { b: 2 },
      userSpecific: { c: 3 },
      loanExceptions: ['e'],
      treatEnabled: true,
    });
    expect(normalize).toHaveBeenCalledWith(input);
  });

  it('should sets closingType.feeFine to null if treatEnabled is false', () => {
    const input = { treatEnabled: false };
    const result = normalizeData(input);

    expect(result.closingType.feeFine).toBeNull();
    expect(result.treatEnabled).toBe(false);
  });
});
