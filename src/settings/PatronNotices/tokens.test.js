import getTokens from './tokens';
import {
  DATE_FORMAT_WITHOUT_TIME,
  DATE_FORMAT_WITH_TIME,
} from './utils/constantsForMoment';

jest.mock('./utils', () => ({
  generatePreviewDateValue: jest.fn((locale, format = 'll') => ({
    locale,
    format,
  })),
}));

describe('getTokens', () => {
  const testLocale = 'testLocale';
  const expectedShortResult = {
    locale: testLocale,
    format: DATE_FORMAT_WITHOUT_TIME,
  };
  const expectedLongResult = {
    locale: testLocale,
    format: DATE_FORMAT_WITH_TIME,
  };
  const fieldsForCheck = [
    {
      category: 'request',
      name: 'request.requestExpirationDate',
      expectedResult: expectedShortResult,
    },
    {
      category: 'request',
      name: 'request.requestExpirationDateTime',
      expectedResult: expectedLongResult,
    },
    {
      category: 'request',
      name: 'request.holdShelfExpirationDate',
      expectedResult: expectedShortResult,
    },
    {
      category: 'request',
      name: 'request.holdShelfExpirationDateTime',
      expectedResult: expectedLongResult,
    },
    {
      category: 'loan',
      name: 'loan.dueDate',
      expectedResult: expectedShortResult,
    },
    {
      category: 'loan',
      name: 'loan.dueDateTime',
      expectedResult: expectedLongResult,
    },
    {
      category: 'loan',
      name: 'loan.initialBorrowDate',
      expectedResult: expectedShortResult,
    },
    {
      category: 'loan',
      name: 'loan.initialBorrowDateTime',
      expectedResult: expectedLongResult,
    },
    {
      category: 'loan',
      name: 'loan.checkedInDate',
      expectedResult: expectedShortResult,
    },
    {
      category: 'loan',
      name: 'loan.checkedInDateTime',
      expectedResult: expectedLongResult,
    },
    {
      category: 'feeFineCharge',
      name: 'feeCharge.chargeDate',
      expectedResult: expectedShortResult,
    },
    {
      category: 'feeFineCharge',
      name: 'feeCharge.chargeDateTime',
      expectedResult: expectedLongResult,
    },
    {
      category: 'feeFineAction',
      name: 'feeAction.actionDate',
      expectedResult: expectedShortResult,
    },
    {
      category: 'feeFineAction',
      name: 'feeAction.actionDateTime',
      expectedResult: expectedLongResult,
    },
  ];
  const result = getTokens(testLocale);
  const tokenTest = ({
    category,
    name,
    expectedResult,
  }) => {
    it(`should have correctly preview value for ${name} token`, () => {
      const tokenForCheck = result[category].find(element => element.token === name);

      expect(tokenForCheck.previewValue).toEqual(expectedResult);
    });
  };

  fieldsForCheck.forEach(tokenTest);
});
