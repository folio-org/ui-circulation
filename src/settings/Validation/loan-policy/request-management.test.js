import buildPeriodValidationConfig from './utils';
import requests, {
  recalls,
  holds,
} from './request-management';

jest.mock('./utils');

describe('request management', () => {
  const loanPolicy = {};
  const mockedValidationConfig = {
    test: 'test',
  };

  describe('recalls', () => {
    let result;

    beforeAll(() => {
      buildPeriodValidationConfig.mockReturnValue(mockedValidationConfig);
      result = recalls(loanPolicy);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should trigger "buildPeriodValidationConfig" 3 times with correct arguments', () => {
      expect(buildPeriodValidationConfig).toHaveBeenNthCalledWith(1, loanPolicy, 'requestManagement.recalls.recallReturnInterval');
      expect(buildPeriodValidationConfig).toHaveBeenNthCalledWith(2, loanPolicy, 'requestManagement.recalls.minimumGuaranteedLoanPeriod');
      expect(buildPeriodValidationConfig).toHaveBeenNthCalledWith(3, loanPolicy, 'requestManagement.recalls.alternateRecallReturnInterval');
    });

    it('should return correct config', () => {
      const expectedResult = {
        ...mockedValidationConfig,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('holds', () => {
    let result;

    beforeAll(() => {
      buildPeriodValidationConfig.mockReturnValue(mockedValidationConfig);
      result = holds(loanPolicy);
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should trigger "buildPeriodValidationConfig" twice with correct arguments', () => {
      expect(buildPeriodValidationConfig).toHaveBeenNthCalledWith(1, loanPolicy, 'requestManagement.holds.alternateCheckoutLoanPeriod');
      expect(buildPeriodValidationConfig).toHaveBeenNthCalledWith(2, loanPolicy, 'requestManagement.holds.alternateRenewalLoanPeriod');
    });

    it('should return correct config', () => {
      const expectedResult = {
        ...mockedValidationConfig,
      };

      expect(result).toEqual(expectedResult);
    });
  });

  describe('requests', () => {
    buildPeriodValidationConfig.mockReturnValue(mockedValidationConfig);

    it('should return correct config', () => {
      const expectedResult = {
        ...mockedValidationConfig,
      };

      expect(requests(loanPolicy)).toEqual(expectedResult);
    });
  });
});
