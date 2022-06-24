import general from './general';

import { closedLoansRules } from '../../../constants';

describe('general', () => {
  describe('data methods', () => {
    const isClosingTypeIntervalSelected = jest.fn(() => true);
    const isAnyClosingTypeSelected = jest.fn(() => true);
    const testData = {
      isClosingTypeIntervalSelected,
      isAnyClosingTypeSelected,
    };

    beforeEach(() => {
      general(testData);
    });

    afterEach(() => {
      isClosingTypeIntervalSelected.mockClear();
      isAnyClosingTypeSelected.mockClear();
    });

    Object.values(closedLoansRules).forEach(rule => {
      describe(`for ${rule}`, () => {
        it('should call isClosingTypeIntervalSelected with correct props', () => {
          expect(isClosingTypeIntervalSelected).toHaveBeenCalledWith(rule);
        });

        it('should call isClosingTypeIntervalSelected twice', () => {
          const callNumber = isClosingTypeIntervalSelected.mock.calls
            .filter(item => item[0] === rule)
            .length;

          expect(callNumber).toBe(2);
        });

        it('should call isAnyClosingTypeSelected with correct props', () => {
          expect(isAnyClosingTypeSelected).toHaveBeenCalledWith(rule);
        });
      });
    });
  });

  describe('when "isClosingTypeIntervalSelected" in passed "data" returns true and "isAnyClosingTypeSelected" return false', () => {
    const testData = {
      isClosingTypeIntervalSelected: () => true,
      isAnyClosingTypeSelected: () => false,
    };
    const result = general(testData);

    describe('"shouldValidate"', () => {
      Object.values(closedLoansRules).forEach(rule => {
        it(`should be true for ${rule}.duration`, () => {
          expect(result[`${rule}.duration`].shouldValidate).toBe(true);
        });

        it(`should be true for ${rule}.intervalId`, () => {
          expect(result[`${rule}.intervalId`].shouldValidate).toBe(true);
        });

        it(`should be false for ${rule}Selected`, () => {
          expect(result[`${rule}Selected`].shouldValidate).toBe(false);
        });
      });
    });
  });

  describe('when "isClosingTypeIntervalSelected" in passed "data" returns false and "isAnyClosingTypeSelected" return true', () => {
    const testData = {
      isClosingTypeIntervalSelected: () => false,
      isAnyClosingTypeSelected: () => true,
    };
    const result = general(testData);

    describe('"shouldValidate"', () => {
      Object.values(closedLoansRules).forEach(rule => {
        it(`should be false for ${rule}.duration`, () => {
          expect(result[`${rule}.duration`].shouldValidate).toBe(false);
        });

        it(`should be false for ${rule}.intervalId`, () => {
          expect(result[`${rule}.intervalId`].shouldValidate).toBe(false);
        });

        it(`should be true for ${rule}Selected`, () => {
          expect(result[`${rule}Selected`].shouldValidate).toBe(true);
        });
      });
    });
  });
});
