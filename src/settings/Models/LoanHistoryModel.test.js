import LoanHistory from './LoanHistoryModel';
import {
  closedLoansRules,
  closingTypesMap,
} from '../../constants';

describe('LoanHistory', () => {
  it('should return correct default data', () => {
    expect(LoanHistory.defaultLoanHistory()).toEqual({});
  });

  it('should have correct values when nothing was passed', () => {
    const loanHistory = new LoanHistory();

    expect(loanHistory).toEqual(expect.objectContaining({
      closingType: undefined,
      loan: {
        duration: undefined,
        intervalId: undefined,
      },
      feeFine: {
        duration: undefined,
        intervalId: undefined,
      },
      loanExceptions: [],
      treatEnabled: false,
    }));
  });

  it('should have correct values when data was passed', () => {
    const testData = {
      closingType: 'testClosingType',
      loan: {
        duration: 'testLoanDuration',
        intervalId: 'testLoanIntervalId',
      },
      feeFine: {
        duration: 'testFeeFineDuration',
        intervalId: 'testFeeFineIntervalId',
      },
      loanExceptions: ['testException'],
      treatEnabled: true,
    };
    const loanHistory = new LoanHistory(testData);

    expect(loanHistory).toEqual(expect.objectContaining(testData));
  });

  describe('isClosingTypeIntervalSelected', () => {
    const testIntevalKey = 'testIntervalKey';
    const testNonIntevalKey = 'testNonIntervalKey';
    const testData = {
      closingType: {
        [testIntevalKey]: closingTypesMap.INTERVAL,
        [testNonIntevalKey]: closingTypesMap.NEVER,
      },
    };
    const loanHistory = new LoanHistory(testData);

    it(`should return true when "closingType" by key contains value equal to "${closingTypesMap.INTERVAL}"`, () => {
      expect(loanHistory.isClosingTypeIntervalSelected(testIntevalKey)).toBe(true);
    });

    it(`should return false when "closingType" by key contains value that not equal to "${closingTypesMap.INTERVAL}"`, () => {
      expect(loanHistory.isClosingTypeIntervalSelected(testNonIntevalKey)).toBe(false);
    });

    it('should return false when "closingType" by key do not contains any value', () => {
      expect(loanHistory.isClosingTypeIntervalSelected('unexistedKey')).toBe(false);
    });
  });

  describe('isAnyClosingTypeSelected', () => {
    describe('when "treatEnabled" is true', () => {
      const testDefaultKey = closedLoansRules.DEFAULT;
      const testNonDefaultKey = closedLoansRules.WITH_FEES_FINES;
      const testData = {
        closingType: {
          [testDefaultKey]: 'testValue',
          [testNonDefaultKey]: 'testValue',
        },
        treatEnabled: true,
      };
      const loanHistory = new LoanHistory(testData);

      it(`should return false when "${closedLoansRules.DEFAULT}" is passed and it is present in loanHistory`, () => {
        expect(loanHistory.isAnyClosingTypeSelected(testDefaultKey)).toBe(false);
      });

      it(`should return false when passed value is not "${closedLoansRules.DEFAULT}" but it present in loanHistory`, () => {
        expect(loanHistory.isAnyClosingTypeSelected(testNonDefaultKey)).toBe(false);
      });

      it('should return true when there is no passed value in loanHistory', () => {
        expect(loanHistory.isAnyClosingTypeSelected('nonExistedValue')).toBe(true);
      });
    });

    describe('when "treatEnabled" is false', () => {
      describe(`when "${closedLoansRules.DEFAULT}" is present in loanHistory`, () => {
        const testData = {
          closingType: {
            [closedLoansRules.DEFAULT]: 'testValue',
          },
        };
        const loanHistory = new LoanHistory(testData);

        it(`should return false when "${closedLoansRules.DEFAULT}" is passed`, () => {
          expect(loanHistory.isAnyClosingTypeSelected(closedLoansRules.DEFAULT)).toBe(false);
        });

        it('should return false when there is no passed value in loanHistory', () => {
          expect(loanHistory.isAnyClosingTypeSelected('nonExistedValue')).toBe(false);
        });
      });

      describe(`when there is no "${closedLoansRules.DEFAULT}" in loanHistory`, () => {
        const testData = {
          closingType: {},
        };
        const loanHistory = new LoanHistory(testData);

        it(`should return true when "${closedLoansRules.DEFAULT}" is passed`, () => {
          expect(loanHistory.isAnyClosingTypeSelected(closedLoansRules.DEFAULT)).toBe(true);
        });
      });
    });
  });
});
