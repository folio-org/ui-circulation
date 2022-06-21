import LoanPolicy from './LoanPolicy';
import RenewalsPolicy from './RenewalsPolicy';
import RequestManagement from './RequestManagement';
import LoansPolicy from './LoansPolicy';
import { Metadata } from '../common';
import {
  intervalIdsMap,
  loanProfileMap,
  BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
} from '../../../constants';

describe('LoanPolicy', () => {
  const basicPolicy = {
    id: 'id',
    name: 'name',
    description: 'description',
    loanable: true,
    renewable: true,
  };
  const fullPolicy = {
    ...basicPolicy,
    loansPolicy: {},
    renewalsPolicy: {
      numberAllowed: 5,
      period: {
        intervalId: 'id',
        duration: 0,
      },
    },
    requestManagement: {},
    metadata: {},
  };
  const loanPolicy = new LoanPolicy(fullPolicy);

  it('should have correct properties', () => {
    expect(loanPolicy).toEqual(expect.objectContaining(basicPolicy));
  });

  it('"loansPolicy" property should be instance of "LoansPolicy"', () => {
    expect(loanPolicy.loansPolicy).toBeInstanceOf(LoansPolicy);
  });

  it('"requestManagement" property should be instance of "RequestManagement"', () => {
    expect(loanPolicy.requestManagement).toBeInstanceOf(RequestManagement);
  });

  it('"renewalsPolicy" property should be instance of "RenewalsPolicy"', () => {
    expect(loanPolicy.renewalsPolicy).toBeInstanceOf(RenewalsPolicy);
  });

  it('"metadata" property should be instance of "Metadata"', () => {
    expect(loanPolicy.metadata).toBeInstanceOf(Metadata);
  });

  it('should have correct properties when "policy" is not provided', () => {
    const loanPolicyInstance = new LoanPolicy();
    const expectedResult = {
      id: undefined,
      name: undefined,
      description: undefined,
      loanable: false,
      renewable: false,
    };

    expect(loanPolicyInstance).toEqual(expect.objectContaining(expectedResult));
  });

  it('"defaultLoanPolicy" should return correct data', () => {
    expect(LoanPolicy.defaultLoanPolicy()).toEqual({
      loanable: true,
      renewable: true,
    });
  });

  it('"isLoanable" should return "loanable" property', () => {
    expect(loanPolicy.isLoanable()).toEqual(basicPolicy.loanable);
  });

  it('"isRenewable" should return "renewable" property', () => {
    expect(loanPolicy.isLoanable()).toEqual(basicPolicy.renewable);
  });

  it('"isDifferentPeriod" should return "differentPeriod" when "renewable" is true', () => {
    const differentPeriod = true;
    const policy = {
      ...fullPolicy,
      renewalsPolicy: {
        differentPeriod,
      },
    };
    const loanPolicyInstance = new LoanPolicy(policy);

    expect(loanPolicyInstance.isDifferentPeriod()).toEqual(differentPeriod);
  });

  it('"isUnlimitedRenewals" should return "unlimited" property', () => {
    const unlimited = true;
    const policy = {
      ...fullPolicy,
      renewalsPolicy: {
        unlimited,
      },
    };
    const loanPolicyInstance = new LoanPolicy(policy);

    expect(loanPolicyInstance.isUnlimitedRenewals()).toEqual(unlimited);
  });

  describe('hasValue', () => {
    it('should return true if value is number', () => {
      expect(loanPolicy.hasValue('renewalsPolicy.numberAllowed')).toEqual(true);
    });

    it('should return false if value is not number', () => {
      expect(loanPolicy.hasValue('name')).toEqual(false);
    });
  });

  describe('isIntervalSelected', () => {
    it('should return true if value is number', () => {
      expect(loanPolicy.isIntervalSelected('renewalsPolicy.period.intervalId')).toEqual(true);
    });

    it('should return false if value is not number', () => {
      expect(loanPolicy.isIntervalSelected('loansPolicy.period.intervalId')).toEqual(false);
    });
  });

  describe('isShortTermLoan', () => {
    it('should return true when "intervalId" equal "Minutes"', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
          period: {
            intervalId: intervalIdsMap.MINUTES,
          },
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isShortTermLoan()).toEqual(true);
    });

    it('should return true when "intervalId" equal "Hours"', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
          period: {
            intervalId: intervalIdsMap.HOURS,
          },
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isShortTermLoan()).toEqual(true);
    });
  });

  describe('isOpeningTimeOffsetActive', () => {
    it('should return true if there is correct dueDateManagementId', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
          period: {
            intervalId: intervalIdsMap.HOURS,
          },
          closedLibraryDueDateManagementId: BEGINNING_OF_THE_NEXT_OPEN_SERVICE_POINT_HOURS,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isOpeningTimeOffsetActive()).toEqual(true);
    });

    it('should return false if there is not correct dueDateManagementId', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
          period: {
            intervalId: intervalIdsMap.HOURS,
          },
          closedLibraryDueDateManagementId: 'test_id',
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isOpeningTimeOffsetActive()).toEqual(false);
    });
  });

  describe('isProfileFixed', () => {
    it('should return true when "profileId" equals "Fixed"', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.FIXED,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isProfileFixed()).toEqual(true);
    });

    it('should return false when "profileId" is not equal "Fixed"', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isProfileFixed()).toEqual(false);
    });
  });

  describe('isProfileRolling', () => {
    it('should return true when "profileId" equals "Rolling"', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isProfileRolling()).toEqual(true);
    });

    it('should return false when "profileId" is not equal "Rolling"', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.FIXED,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isProfileRolling()).toEqual(false);
    });
  });

  describe('isNumberOfRenewalsAllowedActive', () => {
    it('should return true when "unlimited" is false', () => {
      const unlimited = false;
      const policy = {
        ...fullPolicy,
        renewalsPolicy: {
          unlimited,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isNumberOfRenewalsAllowedActive()).toEqual(!unlimited);
    });

    it('should return false when "unlimited" is true', () => {
      const unlimited = true;
      const policy = {
        ...fullPolicy,
        renewalsPolicy: {
          unlimited,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isNumberOfRenewalsAllowedActive()).toEqual(!unlimited);
    });
  });

  describe('isAlternateFixedDueDateScheduleIdRequired', () => {
    it('should return true when differentPeriod is true', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.FIXED,
        },
        renewalsPolicy: {
          differentPeriod: true,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isAlternateFixedDueDateScheduleIdRequired()).toEqual(true);
    });

    it('should return false when differentPeriod is false', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.FIXED,
        },
        renewalsPolicy: {
          differentPeriod: false,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isAlternateFixedDueDateScheduleIdRequired()).toEqual(false);
    });
  });

  describe('isRenewalsPolicyPeriodRequired', () => {
    it('should return true when differentPeriod is true', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
        },
        renewalsPolicy: {
          differentPeriod: true,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isRenewalsPolicyPeriodRequired()).toEqual(true);
    });

    it('should return false when differentPeriod is false', () => {
      const policy = {
        ...fullPolicy,
        loansPolicy: {
          profileId: loanProfileMap.ROLLING,
        },
        renewalsPolicy: {
          differentPeriod: false,
        },
      };
      const loanPolicyInstance = new LoanPolicy(policy);

      expect(loanPolicyInstance.isRenewalsPolicyPeriodRequired()).toEqual(false);
    });
  });
});
