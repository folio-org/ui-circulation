import React from 'react';
import { render } from '@testing-library/react';
import { omit } from 'lodash';

import '../../../test/jest/__mock__';

import { ConfigManager } from '@folio/stripes/smart-components';

import CheckoutSettings, {
  DEFAULT_INITIAL_CONFIG,
  getInitialValues,
  normalize,
} from './CheckoutSettings';
import CheckoutSettingsForm from './CheckoutSettingsForm';

describe('CheckoutSettings', () => {
  const labelIds = {
    otherSettings: 'ui-circulation.settings.index.otherSettings',
  };
  const mockedStripes = {
    connect: jest.fn(component => component),
  };

  beforeEach(() => {
    render(
      <CheckoutSettings
        stripes={mockedStripes}
      />
    );
  });

  it('should execute `ConfigManager` with passed props', () => {
    const expectedResult = {
      label: labelIds.otherSettings,
      moduleName: 'CHECKOUT',
      configName: 'other_settings',
      getInitialValues,
      configFormComponent: CheckoutSettingsForm,
      stripes: mockedStripes,
      onBeforeSave: normalize,
    };

    expect(ConfigManager).toHaveBeenCalledWith(expectedResult, {});
  });
});

describe('getInitialValues', () => {
  const defaultExpectedConfig = {
    ...omit(DEFAULT_INITIAL_CONFIG, 'prefPatronIdentifier'),
    identifiers: {
      custom: [],
    },
  };

  it('should return default expected config if `settings` is empty', () => {
    expect(getInitialValues([])).toEqual(defaultExpectedConfig);
  });

  it('should return default expected config if invalid settings are passed', () => {
    expect(getInitialValues([{ value: "{'settings':'testSettings'}" }])).toEqual(defaultExpectedConfig);
  });

  it('should correctly process passed `prefPatronIdentifier` field', () => {
    const customField = 'customFields.testCustomField';
    const commonField = 'testIdentifier';
    const mockedConfigValue = {
      prefPatronIdentifier: `${customField},${commonField}`,
    };
    const configForTest = [{
      value: JSON.stringify(mockedConfigValue),
    }];
    const expectedResult = {
      ...defaultExpectedConfig,
      identifiers: {
        custom: [
          { value: customField },
        ],
        [commonField]: true,
      },
    };

    expect(getInitialValues(configForTest)).toEqual(expectedResult);
  });

  it('should correctly pass fields from `settings`', () => {
    const mockedConfig = {
      audioAlertsEnabled: 'testAudioAlertsEnabled',
      audioTheme: 'testAudioTheme',
      checkoutTimeout: 'testCheckoutTimeout',
      checkoutTimeoutDuration: 'testCheckoutTimeoutDuration',
      useCustomFieldsAsIdentifiers: 'testUseCustomFieldsAsIdentifiers',
    };
    const configForTest = [{
      value: JSON.stringify(mockedConfig),
    }];
    const expectedResult = {
      ...mockedConfig,
      identifiers: {
        custom: [],
      },
    };

    expect(getInitialValues(configForTest)).toEqual(expectedResult);
  });
});

describe('normalize', () => {
  it('should correctly process passed `identifiers` field', () => {
    const identifiers = {
      custom: [
        { value: 'firstCustomIdentifire' },
        { value: 'secondCustomIdentifire' },
      ],
      firstDefaultIdentifire: false,
      secondDefaultIdentifire: true,
    };
    const expectedResult = [
      'secondDefaultIdentifire',
      'firstCustomIdentifire',
      'secondCustomIdentifire',
    ];
    const result = normalize({ identifiers });

    expect(JSON.parse(result)).toEqual(expect.objectContaining({ prefPatronIdentifier: expectedResult.join(',') }));
  });

  it('should correctly normalize `checkoutTimeoutDuration` field', () => {
    const identifiers = {
      custom: [],
    };
    const expectedResult = {
      useCustomFieldsAsIdentifiers: '24',
    };
    const testConfig = {
      ...expectedResult,
      identifiers,
    };
    const result = normalize(testConfig);

    expect(JSON.parse(result)).toEqual(expect.objectContaining(expectedResult));
  });

  it('should pass values as is', () => {
    const identifiers = {
      custom: [],
    };
    const expectedResult = {
      audioAlertsEnabled: false,
      audioTheme: 'testTheme',
      checkoutTimeout: 20,
      useCustomFieldsAsIdentifiers: true,
    };
    const testConfig = {
      ...expectedResult,
      identifiers,
    };
    const result = normalize(testConfig);

    expect(JSON.parse(result)).toEqual(expect.objectContaining(expectedResult));
  });
});
