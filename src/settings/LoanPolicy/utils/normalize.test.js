import {
  checkInvalidPeriods,
  checkFixedProfile,
  checkUnlimitedRenewals,
  checkDifferentRenewalPeriod,
  checkOpeningTimeOffset,
  checkLoanable,
  checkRenewable,
  checkRequestManagementSection,
  checkRenewFrom,
  checkSchedules,
  normalize,
} from './normalize';

import LoanPolicy from '../../Models/LoanPolicy';

import { loanProfileMap } from '../../../constants';

const testData = 'testData';
const periodTestData = {
  duration: 1,
  intervalId: 'testId',
};
const reusableCommonData = {
  id: 'testId',
  name: 'testName',
  description: 'testDescription',
  metadata: 'testMetadata',
  loanable: true,
  renewable: false,
};

describe('LoanPolicy/utils functions', () => {
  describe('checkInvalidPeriods', () => {
    it('should validate periods correctly', () => {
      const mockedData = {
        loansPolicy: {
          period: {
            intervalId: 'testId',
          },
          openingTimeOffset: {
            duration: 1,
          },
          gracePeriod: {
            duration: '1',
            intervalId: 'testId',
          },
        },
        renewalsPolicy: {
          period: {
            duration: 1,
            intervalId: '',
          },
        },
        requestManagement: {
          recalls: {
            recallReturnInterval: {
              duration: 1,
            },
            minimumGuaranteedLoanPeriod: {},
            alternateRecallReturnInterval: {
              duration: false,
              intervalId: 'testId',
            },
          },
          holds: {
            alternateCheckoutLoanPeriod: {
              duration: 1,
              intervalId: true,
            },
            alternateRenewalLoanPeriod: {
              duration: 'true',
              intervalId: null,
            },
          }
        },
        testData,
      };
      const expectedResult = {
        loansPolicy: {},
        renewalsPolicy: {},
        requestManagement: {
          recalls: {},
          holds: {},
        },
        testData,
      };

      expect(checkInvalidPeriods(mockedData)).toEqual(expectedResult);
    });
  });

  describe('checkFixedProfile', () => {
    const mockedData = {
      loansPolicy: {
        period: periodTestData,
        profileId: loanProfileMap.FIXED,
      }
    };

    it('should remove period', () => {
      const expectedResult = {
        ...mockedData,
        loansPolicy: {
          profileId: loanProfileMap.FIXED,
        }
      };

      expect(checkFixedProfile(mockedData)).toEqual(expectedResult);
    });

    it('should not remove period', () => {
      const dataForTest = {
        loansPolicy: {
          ...mockedData.loansPolicy,
          profileId: 'not fixed',
        }
      };

      expect(checkFixedProfile(dataForTest)).toEqual(dataForTest);
    });
  });

  describe('checkUnlimitedRenewals', () => {
    const mockedData = {
      renewalsPolicy: {
        unlimited: true,
        numberAllowed: 'testData',
      },
    };

    it('should remove numberAllowed field correctly', () => {
      const expectedResult = {
        renewalsPolicy: {
          unlimited: true,
        },
      };

      expect(checkUnlimitedRenewals(mockedData)).toEqual(expectedResult);
    });

    it('should not remove numberAllowed field', () => {
      const dataForTest = {
        renewalsPolicy: {
          ...mockedData.renewalsPolicy,
          unlimited: false,
        },
      };

      expect(checkUnlimitedRenewals(dataForTest)).toEqual(dataForTest);
    });
  });

  describe('checkDifferentRenewalPeriod', () => {
    const mockedData = {
      renewalsPolicy: {
        differentPeriod: false,
        alternateFixedDueDateScheduleId: 'testData',
        period: 'testData',
      }
    };

    it('should remove fields associated with period', () => {
      const expectedResult = {
        renewalsPolicy: {
          differentPeriod: false,
        }
      };

      expect(checkDifferentRenewalPeriod(mockedData)).toEqual(expectedResult);
    });

    it('should not remove fields associated with period', () => {
      const dataForTest = {
        renewalsPolicy: {
          ...mockedData.renewalsPolicy,
          differentPeriod: true,
        }
      };

      expect(checkDifferentRenewalPeriod(dataForTest)).toEqual(dataForTest);
    });
  });

  describe('checkOpeningTimeOffset', () => {
    afterAll(() => {
      jest.spyOn(LoanPolicy.prototype, 'isOpeningTimeOffsetActive').mockClear();
    });

    const mockedData = {
      loansPolicy: {
        openingTimeOffset: 'testData',
      },
      testData,
    };

    it('should remove openingTimeOffset field correctly', () => {
      const expectedResult = {
        loansPolicy: {},
        testData,
      };

      jest.spyOn(LoanPolicy.prototype, 'isOpeningTimeOffsetActive').mockImplementation(() => false);

      expect(checkOpeningTimeOffset(mockedData)).toEqual(expectedResult);
    });

    it('should not remove openingTimeOffset field', () => {
      jest.spyOn(LoanPolicy.prototype, 'isOpeningTimeOffsetActive').mockImplementation(() => true);

      expect(checkOpeningTimeOffset(mockedData)).toEqual(mockedData);
    });
  });

  describe('checkLoanable', () => {
    const expectedResult = {
      ...reusableCommonData,
      loanable: false,
    };
    const mockedData = {
      ...expectedResult,
      testData,
    };

    it('should remove any additional fields correctly', () => {
      expect(checkLoanable(mockedData)).toEqual(expectedResult);
    });

    it('should not remove additional fields', () => {
      const dataForTest = {
        ...mockedData,
        loanable: true,
      };

      expect(checkLoanable(dataForTest)).toEqual(dataForTest);
    });
  });

  describe('checkRenewable', () => {
    const mockedData = {
      renewable: true,
      renewalsPolicy: 'testData',
    };

    it('should remove renewalsPolicy field correctly', () => {
      const dataForTest = {
        renewable: false,
        renewalsPolicy: 'testData',
      };

      expect(checkRenewable(dataForTest)).toEqual({ renewable: false });
    });

    it('should not remove renewalsPolicy field', () => {
      expect(checkRenewable(mockedData)).toEqual(mockedData);
    });
  });

  describe('checkRequestManagementSection', () => {
    it('should remove holds section', () => {
      const expectedResult = {
        requestManagement: {
          recalls: {
            testData,
          },
          testData,
        }
      };
      const mockedData = {
        requestManagement: {
          ...expectedResult.requestManagement,
          holds: {},
        }
      };

      expect(checkRequestManagementSection(mockedData)).toEqual(expectedResult);
    });

    it('should remove recalls section', () => {
      const expectedResult = {
        requestManagement: {
          holds: {
            testData,
          },
          testData,
        }
      };
      const mockedData = {
        requestManagement: {
          ...expectedResult.requestManagement,
          recalls: {},
        }
      };

      expect(checkRequestManagementSection(mockedData)).toEqual(expectedResult);
    });

    it('should remove requestManagement section', () => {
      const mockedData = {
        requestManagement: {
          recalls: {},
          holds: {},
        }
      };

      expect(checkRequestManagementSection(mockedData)).toEqual({});
    });

    it('should remove associated fields', () => {
      const mockedData = {
        requestManagement: {
          recalls: {
            allowRecallsToExtendOverdueLoans: false,
            alternateRecallReturnInterval: 'testData',
          },
          holds: {
            renewItemsWithRequest: false,
            alternateRenewalLoanPeriod: 'testData',
          },
          testData,
        },
        testData,
      };
      const expectedResult = {
        requestManagement: {
          recalls: {
            allowRecallsToExtendOverdueLoans: false,
          },
          holds: {
            renewItemsWithRequest: false,
          },
          testData,
        },
        testData,
      };

      expect(checkRequestManagementSection(mockedData)).toEqual(expectedResult);
    });

    it('should not remove associated fields', () => {
      const mockedData = {
        requestManagement: {
          recalls: {
            allowRecallsToExtendOverdueLoans: true,
            alternateRecallReturnInterval: 'testData',
          },
          holds: {
            renewItemsWithRequest: true,
            alternateRenewalLoanPeriod: 'testData',
          },
          testData,
        },
        testData,
      };

      expect(checkRequestManagementSection(mockedData)).toEqual(mockedData);
    });
  });

  describe('checkRenewFrom', () => {
    const mockedData = {
      loansPolicy: {
        profileId: 'not fixed',
      },
      renewalsPolicy: {
        renewFromId: 'testData',
        period: 'testData',
      },
      testData,
    };

    it('should remove renewFromId and period fields from renewalsPolicy correctly', () => {
      const dataForTest = {
        ...mockedData,
        loansPolicy: {
          profileId: loanProfileMap.FIXED,
        }
      };
      const expectedResult = {
        ...dataForTest,
        renewalsPolicy: {},
      };

      expect(checkRenewFrom(dataForTest)).toEqual(expectedResult);
    });

    it('should not remove renewFromId and period fields from renewalsPolicy', () => {
      expect(checkRenewFrom(mockedData)).toEqual(mockedData);
    });
  });

  describe('checkSchedules', () => {
    const mockedData = {
      testData,
      loansPolicy: {
        fixedDueDateScheduleId: 'testId',
      },
      renewalsPolicy: {
        alternateFixedDueDateScheduleId: 'testId',
      },
    };

    it('should remove wrong fields from loansPolicy and renewalsPolicy', () => {
      const dataForTest = {
        ...mockedData,
        loansPolicy: {
          fixedDueDateScheduleId: 1,
        },
        renewalsPolicy: {
          alternateFixedDueDateScheduleId: true,
        },
      };
      const expectedResult = {
        testData,
        loansPolicy: {},
        renewalsPolicy: {},
      };

      expect(checkSchedules(dataForTest)).toEqual(expectedResult);
    });

    it('should not remove anything from loansPolicy and renewalsPolicy', () => {
      expect(checkSchedules(mockedData)).toEqual(mockedData);
    });
  });

  describe('normalize function', () => {
    const loansPolicy = {
      fixedDueDateScheduleId: 'testId',
      gracePeriod: periodTestData,
      profileId: loanProfileMap.FIXED,
    };
    const requestManagement = {
      recalls: {
        minimumGuaranteedLoanPeriod: periodTestData,
        recallReturnInterval: periodTestData,
      },
    };
    const mockedData = {
      ...reusableCommonData,
      loansPolicy: {
        ...loansPolicy,
        period: periodTestData,
        openingTimeOffset: {
          duration: 1,
        },
      },
      renewalsPolicy: {
        period: {
          duration: 1,
          intervalId: '',
        },
        unlimited: false,
        numberAllowed: 'testData',
        differentPeriod: true,
        alternateFixedDueDateScheduleId: 'testData',
        renewFromId: 'testData',
      },
      requestManagement: {
        recalls: {
          ...requestManagement.recalls,
          alternateRecallReturnInterval: periodTestData,
        },
        holds: {
          alternateCheckoutLoanPeriod: {
            duration: 1,
            intervalId: true,
          },
          alternateRenewalLoanPeriod: {
            duration: 'true',
            intervalId: null,
          },
        }
      },
      testData,
    };
    const expectedResult = {
      ...reusableCommonData,
      loansPolicy,
      requestManagement,
      testData
    };

    it('should process all fields correctly', () => {
      expect(normalize(mockedData)).toEqual(expectedResult);
    });
  });
});
