import LoansPolicy from './LoansPolicy';
import { Period } from '../common';
import helpers from './utils';

jest.mock('./utils');

describe('LoansPolicy', () => {
  const basicPolicy = {
    profileId: 'profileId',
    closedLibraryDueDateManagementId: 'closedLibraryDueDateManagementId',
    fixedDueDateScheduleId: 'fixedDueDateScheduleId',
  };
  const fullPolicy = {
    ...basicPolicy,
    period: {
      duration: 1,
      intervalId: 'id',
    },
    gracePeriod: {
      duration: 2,
      intervalId: 'id_2',
    },
    openingTimeOffset: {
      duration: 3,
      intervalId: 'id_3',
    },
  };
  const loansPolicy = new LoansPolicy(fullPolicy);

  it('should have correct properties', () => {
    expect(loansPolicy).toEqual(expect.objectContaining(fullPolicy));
  });

  it('"period" property should be instance of "Period"', () => {
    expect(loansPolicy.period).toBeInstanceOf(Period);
  });

  it('"gracePeriod" property should be instance of "Period"', () => {
    expect(loansPolicy.gracePeriod).toBeInstanceOf(Period);
  });

  it('"openingTimeOffset" property should be instance of "Period"', () => {
    expect(loansPolicy.openingTimeOffset).toBeInstanceOf(Period);
  });

  it('should have correct properties if there is no "policy"', () => {
    const expectedResult = {
      profileId: undefined,
      closedLibraryDueDateManagementId: undefined,
      fixedDueDateScheduleId: undefined,
      period: {
        duration: undefined,
        intervalId: undefined,
      },
      gracePeriod: {
        duration: undefined,
        intervalId: undefined,
      },
      openingTimeOffset: {
        duration: undefined,
        intervalId: undefined,
      },
    };
    const loansPolicyInstance = new LoansPolicy();

    expect(loansPolicyInstance).toEqual(expect.objectContaining(expectedResult));
  });

  describe('setDueDateManagementId', () => {
    it('should change class data when "isShortTermLoan" is true', () => {
      helpers.isValidItemSelected.mockImplementation(() => false);
      const loansPolicyInstance = new LoansPolicy(fullPolicy);

      loansPolicyInstance.setDueDateManagementId(true);

      expect(loansPolicyInstance.closedLibraryDueDateManagementId).toEqual('');
    });

    it('should change class data when "isShortTermLoan" is false', () => {
      helpers.isValidItemSelected.mockImplementation(() => false);
      const loansPolicyInstance = new LoansPolicy(fullPolicy);

      loansPolicyInstance.setDueDateManagementId(false);

      expect(loansPolicyInstance.closedLibraryDueDateManagementId).toEqual('');
    });

    it('should not change class data', () => {
      helpers.isValidItemSelected.mockImplementation(() => true);
      const loansPolicyInstance = new LoansPolicy(fullPolicy);

      loansPolicyInstance.setDueDateManagementId(true);

      expect(loansPolicyInstance.closedLibraryDueDateManagementId).toEqual(fullPolicy.closedLibraryDueDateManagementId);
    });
  });
});
