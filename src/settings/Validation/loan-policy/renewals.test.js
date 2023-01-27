import renewals from './renewals';

describe('renewals', () => {
  const loanPolicy = {
    isAlternateFixedDueDateScheduleIdRequired: jest.fn().mockReturnValue(true),
    isRenewalsPolicyPeriodRequired: jest.fn().mockReturnValue(true),
    isLoanable: jest.fn().mockReturnValue(true),
    isNumberOfRenewalsAllowedActive: jest.fn().mockReturnValue(true),
    isRenewable: jest.fn().mockReturnValue(true),
    isProfileRolling: jest.fn().mockReturnValue(true),
  };
  let result;

  beforeAll(() => {
    result = renewals(loanPolicy);
  });

  it('should trigger "isAlternateFixedDueDateScheduleIdRequired" once', () => {
    expect(loanPolicy.isAlternateFixedDueDateScheduleIdRequired).toHaveBeenCalledTimes(1);
  });

  it('should trigger "isRenewalsPolicyPeriodRequired" twice', () => {
    expect(loanPolicy.isRenewalsPolicyPeriodRequired).toHaveBeenCalledTimes(2);
  });

  it('should trigger "isLoanable" once', () => {
    expect(loanPolicy.isLoanable).toHaveBeenCalledTimes(1);
  });

  it('should trigger "isNumberOfRenewalsAllowedActive" once', () => {
    expect(loanPolicy.isNumberOfRenewalsAllowedActive).toHaveBeenCalledTimes(1);
  });

  it('should trigger "isRenewable" once', () => {
    expect(loanPolicy.isRenewable).toHaveBeenCalledTimes(1);
  });

  it('should trigger "isProfileRolling" once', () => {
    expect(loanPolicy.isProfileRolling).toHaveBeenCalledTimes(1);
  });

  it('should return correct config', () => {
    const expectedResult = {
      'renewalsPolicy.alternateFixedDueDateScheduleId': {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      'renewalsPolicy.period.duration': {
        rules: ['isNotEmpty'],
        shouldValidate: true,
      },
      'renewalsPolicy.period.intervalId': {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      'renewalsPolicy.numberAllowed': {
        rules: ['isNotEmpty'],
        shouldValidate: true,
      },
      'renewalsPolicy.renewFromId': {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
    };

    expect(result).toEqual(expectedResult);
  });

  describe('when "isLoanable" and "isNumberOfRenewalsAllowedActive" return false', () => {
    const policy = {
      ...loanPolicy,
      isLoanable: () => false,
      isNumberOfRenewalsAllowedActive: () => false,
    };

    it('should return correct "shouldValidate" property for "renewalsPolicy.numberAllowed" field', () => {
      const config = renewals(policy);

      expect(config['renewalsPolicy.numberAllowed'].shouldValidate).toBe(false);
    });
  });

  describe('when "isLoanable" returns true and "isNumberOfRenewalsAllowedActive" returns false', () => {
    const policy = {
      ...loanPolicy,
      isNumberOfRenewalsAllowedActive: () => false,
    };

    it('should return correct "shouldValidate" property for "renewalsPolicy.numberAllowed" field', () => {
      const config = renewals(policy);

      expect(config['renewalsPolicy.numberAllowed'].shouldValidate).toBe(false);
    });
  });

  describe('when "isLoanable" returns false and "isNumberOfRenewalsAllowedActive" returns true', () => {
    const policy = {
      ...loanPolicy,
      isLoanable: () => false,
    };

    it('should return correct "shouldValidate" property for "renewalsPolicy.numberAllowed" field', () => {
      const config = renewals(policy);

      expect(config['renewalsPolicy.numberAllowed'].shouldValidate).toBe(false);
    });
  });

  describe('when "isRenewable" and "isProfileRolling" return false', () => {
    const policy = {
      ...loanPolicy,
      isRenewable: () => false,
      isProfileRolling: () => false,
    };

    it('should return correct "shouldValidate" property for "renewalsPolicy.numberAllowed" field', () => {
      const config = renewals(policy);

      expect(config['renewalsPolicy.renewFromId'].shouldValidate).toBe(false);
    });
  });

  describe('when "isRenewable" returns true and "isProfileRolling" returns false', () => {
    const policy = {
      ...loanPolicy,
      isProfileRolling: () => false,
    };

    it('should return correct "shouldValidate" property for "renewalsPolicy.numberAllowed" field', () => {
      const config = renewals(policy);

      expect(config['renewalsPolicy.renewFromId'].shouldValidate).toBe(false);
    });
  });

  describe('when "isRenewable" returns false and "isProfileRolling" returns true', () => {
    const policy = {
      ...loanPolicy,
      isRenewable: () => false,
    };

    it('should return correct "shouldValidate" property for "renewalsPolicy.numberAllowed" field', () => {
      const config = renewals(policy);

      expect(config['renewalsPolicy.renewFromId'].shouldValidate).toBe(false);
    });
  });
});
