import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  TitleManager,
} from '@folio/stripes/core';

import CheckoutSettings, {
  getInitialValues,
  normalize,
} from './CheckoutSettings';
import CheckoutSettingsForm from './CheckoutSettingsForm';

import {
  CirculationSettingsConfig,
} from '../components';

import {
  CONFIG_NAMES,
} from '../../constants';

jest.mock('@folio/stripes/core', () => ({
  TitleManager: jest.fn(({ children }) => <>{children}</>),
}));
jest.mock('./CheckoutSettingsForm', () => jest.fn(() => null));
jest.mock('../components', () => ({
  CirculationSettingsConfig: jest.fn(() => null),
}));

const labelIds = {
  generalTitle: 'ui-circulation.settings.title.general',
  otherSettingsTitle: 'ui-circulation.settings.title.otherSettings',
  paneTitle: 'ui-circulation.settings.index.otherSettings',
};

describe('CheckoutSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<CheckoutSettings />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render TitleManager with correct props', () => {
    expect(TitleManager).toHaveBeenCalledWith(
      expect.objectContaining({
        page: labelIds.generalTitle,
        record: labelIds.otherSettingsTitle,
      }),
      {}
    );
  });

  it('should render CirculationSettingsConfig with correct props', () => {
    expect(CirculationSettingsConfig).toHaveBeenCalledWith(
      expect.objectContaining({
        label: labelIds.paneTitle,
        configName: CONFIG_NAMES.OTHER_SETTINGS,
        configFormComponent: CheckoutSettingsForm,
        getInitialValues,
        onBeforeSave: normalize,
      }),
      {}
    );
  });
});

describe('getInitialValues', () => {
  it('should returns default config when input is empty', () => {
    expect(getInitialValues()).toEqual({
      audioAlertsEnabled: false,
      audioTheme: 'classic',
      checkoutTimeout: true,
      checkoutTimeoutDuration: 3,
      identifiers: { custom: [] },
      useCustomFieldsAsIdentifiers: false,
      wildcardLookupEnabled: false,
    });

    expect(getInitialValues({})).toEqual({
      audioAlertsEnabled: false,
      audioTheme: 'classic',
      checkoutTimeout: true,
      checkoutTimeoutDuration: 3,
      identifiers: { custom: [] },
      useCustomFieldsAsIdentifiers: false,
      wildcardLookupEnabled: false,
    });
  });

  it('should merges provided settings with defaults', () => {
    const custom = {
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: 10,
      prefPatronIdentifier: 'barcode,customFields.cf1',
      useCustomFieldsAsIdentifiers: true,
      wildcardLookupEnabled: true,
    };

    expect(getInitialValues(custom)).toEqual({
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: 10,
      identifiers: {
        barcode: true,
        custom: [{ value: 'customFields.cf1' }],
      },
      useCustomFieldsAsIdentifiers: true,
      wildcardLookupEnabled: true,
    });
  });
});

describe('normalize', () => {
  it('should normalizes identifiers to prefPatronIdentifier string', () => {
    const input = {
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: '7',
      identifiers: {
        barcode: true,
        username: true,
        custom: [{ value: 'customFields.cf1' }, { value: 'customFields.cf2' }],
      },
      useCustomFieldsAsIdentifiers: true,
      wildcardLookupEnabled: true,
    };

    expect(normalize(input)).toEqual({
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: 7,
      prefPatronIdentifier: 'barcode,username,customFields.cf1,customFields.cf2',
      useCustomFieldsAsIdentifiers: true,
      wildcardLookupEnabled: true,
    });
  });

  it('should handles empty identifiers', () => {
    const input = {
      audioAlertsEnabled: false,
      audioTheme: 'classic',
      checkoutTimeout: true,
      checkoutTimeoutDuration: 3,
      identifiers: { custom: [] },
      useCustomFieldsAsIdentifiers: false,
      wildcardLookupEnabled: false,
    };

    expect(normalize(input)).toEqual({
      audioAlertsEnabled: false,
      audioTheme: 'classic',
      checkoutTimeout: true,
      checkoutTimeoutDuration: 3,
      prefPatronIdentifier: '',
      useCustomFieldsAsIdentifiers: false,
      wildcardLookupEnabled: false,
    });
  });

  it('should not include custom field identifiers when useCustomFieldsAsIdentifiers is false', () => {
    const input = {
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: '5',
      identifiers: {
        barcode: true,
        custom: [{ value: 'customFields.cf1' }, { value: 'customFields.cf2' }],
      },
      useCustomFieldsAsIdentifiers: false,
      wildcardLookupEnabled: true,
    };

    expect(normalize(input)).toEqual({
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: 5,
      prefPatronIdentifier: 'barcode',
      useCustomFieldsAsIdentifiers: false,
      wildcardLookupEnabled: true,
    });
  });

  it('should include custom field identifiers when useCustomFieldsAsIdentifiers is true', () => {
    const input = {
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: '5',
      identifiers: {
        barcode: true,
        custom: [{ value: 'customFields.cf1' }, { value: 'customFields.cf2' }],
      },
      useCustomFieldsAsIdentifiers: true,
      wildcardLookupEnabled: true,
    };

    expect(normalize(input)).toEqual({
      audioAlertsEnabled: true,
      audioTheme: 'modern',
      checkoutTimeout: false,
      checkoutTimeoutDuration: 5,
      prefPatronIdentifier: 'barcode,customFields.cf1,customFields.cf2',
      useCustomFieldsAsIdentifiers: true,
      wildcardLookupEnabled: true,
    });
  });
});
