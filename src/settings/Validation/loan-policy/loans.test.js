import buildPeriodValidationConfig from './utils';
import loans from './loans';

jest.mock('./utils');

describe('loans', () => {
  const loanPolicy = {
    isLoanable: jest.fn().mockReturnValue(true),
    isProfileRolling: jest.fn().mockReturnValue(true),
    isProfileFixed: jest.fn().mockReturnValue(true),
    isOpeningTimeOffsetActive: jest.fn().mockReturnValue(true),
  };
  const mockedValidationConfig = {
    test: 'test',
  };
  let result;

  beforeAll(() => {
    buildPeriodValidationConfig.mockReturnValue(mockedValidationConfig);
    result = loans(loanPolicy);
  });

  it('should trigger "isLoanable" twice', () => {
    expect(loanPolicy.isLoanable).toHaveBeenCalledTimes(2);
  });

  it('should trigger "isProfileRolling" twice', () => {
    expect(loanPolicy.isProfileRolling).toHaveBeenCalledTimes(2);
  });

  it('should trigger "isProfileFixed" once', () => {
    expect(loanPolicy.isProfileFixed).toHaveBeenCalledTimes(1);
  });

  it('should trigger "isOpeningTimeOffsetActive" twice', () => {
    expect(loanPolicy.isOpeningTimeOffsetActive).toHaveBeenCalledTimes(2);
  });

  it('should trigger "buildPeriodValidationConfig" with correct "policy" and "path"', () => {
    const path = 'loansPolicy.gracePeriod';

    expect(buildPeriodValidationConfig).toHaveBeenCalledWith(loanPolicy, path);
  });

  it('should return correct loan policy info', () => {
    const expectedResult = {
      'loansPolicy.profileId': {
        rules: ['isNotEmpty'],
        shouldValidate: true,
      },
      'loansPolicy.closedLibraryDueDateManagementId': {
        rules: ['isNotEmpty'],
        shouldValidate: true,
      },
      'loansPolicy.period.duration': {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
        shouldValidate: true,
      },
      'loansPolicy.period.intervalId': {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      'loansPolicy.fixedDueDateScheduleId': {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      'loansPolicy.openingTimeOffset.duration': {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero'],
        shouldValidate: true,
      },
      'loansPolicy.openingTimeOffset.intervalId': {
        rules: ['isNotEmpty'],
        shouldValidate: true,
      },
      'loansPolicy.itemLimit': {
        rules: ['isItemLimitIsInInterval'],
        shouldValidate: true,
      },
      ...mockedValidationConfig,
    };

    expect(result).toEqual(expectedResult);
  });
});
