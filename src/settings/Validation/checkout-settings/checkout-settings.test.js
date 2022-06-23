import checkoutSettingsValidator, {
  config as checkoutConfig,
} from './checkout-settings';

jest.mock('../engine/FormValidator', () => jest.fn((config) => ({
  validate: (settings) => ({
    config,
    settings,
  }),
})));
jest.mock('./patron-identifiers', () => jest.fn((settings, validationResult) => ({
  settings,
  validationResult,
})));

describe('checkoutSettingsValidator', () => {
  it('should correctly process passed data', () => {
    const settings = {
      test: 'test',
    };
    const expectedResult = {
      settings,
      validationResult: {
        config: { ...checkoutConfig },
        settings,
      },
    };

    expect(checkoutSettingsValidator(settings)).toEqual(expectedResult);
  });
});
