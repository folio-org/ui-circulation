import loanExceptions from './loan-exceptions';

import { closingTypesMap } from '../../../constants';

describe('loanExceptions', () => {
  describe('when "closingType" contains section by passed key', () => {
    const testSectionKey = 'testSectionKey';
    const closingType = {
      [testSectionKey]: [
        closingTypesMap.INTERVAL,
        closingTypesMap.NEVER,
      ],
    };
    const testData = {
      [testSectionKey]: [
        'firstTestItem',
        'secondTestItem',
      ],
      closingType,
    };
    const result = loanExceptions(testData, testSectionKey);

    describe('"shouldValidate"', () => {
      closingType[testSectionKey].forEach((type, index) => {
        const paymentMethodKey = `${testSectionKey}[${index}].paymentMethod`;
        const durationKey = `${testSectionKey}[${index}].duration`;
        const intervalIdKey = `${testSectionKey}[${index}].intervalId`;
        const expectedShouldValidateValue = type === closingTypesMap.INTERVAL;

        it(`should be false for ${paymentMethodKey} key`, () => {
          expect(result[paymentMethodKey].shouldValidate).toBe(false);
        });

        it(`should be ${expectedShouldValidateValue} for ${durationKey} key`, () => {
          expect(result[durationKey].shouldValidate).toBe(expectedShouldValidateValue);
        });

        it(`should be ${expectedShouldValidateValue} for ${intervalIdKey} key`, () => {
          expect(result[intervalIdKey].shouldValidate).toBe(expectedShouldValidateValue);
        });
      });
    });
  });

  describe('when "closingType" do not contains section by passed key', () => {
    const testSectionKey = 'testSectionKey';
    const testData = {
      [testSectionKey]: ['firstTestItem'],
      closingType: {},
    };
    const result = loanExceptions(testData, testSectionKey);

    describe('"shouldValidate"', () => {
      testData[testSectionKey].forEach((item, index) => {
        const durationKey = `${testSectionKey}[${index}].duration`;
        const intervalIdKey = `${testSectionKey}[${index}].intervalId`;

        it(`should be undefined for ${durationKey} key`, () => {
          expect(result[durationKey].shouldValidate).toBeUndefined();
        });

        it(`should be undefined for ${intervalIdKey} key`, () => {
          expect(result[intervalIdKey].shouldValidate).toBeUndefined();
        });
      });
    });
  });
});
