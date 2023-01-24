import buildPeriodValidationConfig from './utils';

describe('buildPeriodValidationConfig', () => {
  const loanPolicy = {
    hasValue: jest.fn().mockReturnValue(false),
    isIntervalSelected: jest.fn().mockReturnValue(true),
  };
  const testPath = 'testPath';
  let result;

  beforeAll(() => {
    result = buildPeriodValidationConfig(loanPolicy, testPath);
  });

  it('should trigger "hasValue" twice with correct "path"', () => {
    const path = `${testPath}.duration`;

    expect(loanPolicy.hasValue).toHaveBeenNthCalledWith(1, path);
    expect(loanPolicy.hasValue).toHaveBeenNthCalledWith(2, path);
  });

  it('should trigger "isIntervalSelected" with correct "path"', () => {
    const path = `${testPath}.intervalId`;

    expect(loanPolicy.isIntervalSelected).toHaveBeenCalledWith(path);
  });

  it('should return correct config', () => {
    const expectedResult = {
      [`${testPath}.duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
        shouldValidate: true,
      },
      [`${testPath}.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: false,
      },
    };

    expect(result).toEqual(expectedResult);
  });

  describe('when "hasValue" and "isIntervalSelected" return true', () => {
    const policy = {
      hasValue: () => true,
      isIntervalSelected: () => true,
    };

    it('should return correct "shouldValidate" property for "duration" field', () => {
      const config = buildPeriodValidationConfig(policy, testPath);

      expect(config[`${testPath}.duration`].shouldValidate).toBe(true);
    });
  });

  describe('when "hasValue" and "isIntervalSelected" return false', () => {
    const policy = {
      hasValue: () => false,
      isIntervalSelected: () => false,
    };

    it('should return correct "shouldValidate" property for "duration" field', () => {
      const config = buildPeriodValidationConfig(policy, testPath);

      expect(config[`${testPath}.duration`].shouldValidate).toBe(false);
    });
  });

  describe('when "hasValue" returns true and "isIntervalSelected" returns false', () => {
    const policy = {
      hasValue: () => true,
      isIntervalSelected: () => false,
    };

    it('should return correct "shouldValidate" property for "duration" field', () => {
      const config = buildPeriodValidationConfig(policy, testPath);

      expect(config[`${testPath}.duration`].shouldValidate).toBe(true);
    });
  });
});
