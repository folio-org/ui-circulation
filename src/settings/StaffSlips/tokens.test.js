import getTokens from './tokens';
import {
  DATE_FORMAT_WITH_TIME,
} from '../PatronNotices/utils/constantsForMoment';

jest.mock('../PatronNotices/utils', () => ({
  generatePreviewDateValue: jest.fn((locale, format = 'll') => ({
    locale,
    format,
  })),
}));

describe('getTokens', () => {
  const testLocale = 'testLocale';
  const expectedDateResult = {
    locale: testLocale,
    format: DATE_FORMAT_WITH_TIME,
  };
  const fieldsForCheck = [
    {
      category: 'item',
      name: 'item.displaySummary',
      expectedResult: 'no.1-2v. 121948-1962 (Board)',
    },
    {
      category: 'item',
      name: 'item.lastCheckedInDateTime',
      expectedResult: expectedDateResult,
    },
    {
      category: 'request',
      name: 'request.requestExpirationDate',
      expectedResult: expectedDateResult,
    },
    {
      category: 'request',
      name: 'request.requestDate',
      expectedResult: expectedDateResult,
    },
    {
      category: 'request',
      name: 'request.holdShelfExpirationDate',
      expectedResult: expectedDateResult,
    },
    {
      category: 'requester',
      name: 'requester.patronGroup',
      expectedResult: 'Undergraduate',
    },
    {
      category: 'staffSlip',
      name: 'staffSlip.currentDateTime',
      expectedResult: '3/18/22, 11:59 AM',
    },
    {
      category: 'borrower',
      name: 'borrower.firstName',
      expectedResult: 'John',
    },
    {
      category: 'loan',
      name: 'loan.dueDate',
      expectedResult: expectedDateResult,
    },
    {
      category: 'effectiveLocation',
      name: 'item.effectiveLocationPrimaryServicePointName',
      expectedResult: 'Circulation Desk',
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
      if (name === 'loan.dueDate') {
        console.log('tokenForCheck ', tokenForCheck);
        console.log('category ', result[category]);
      }

      expect(tokenForCheck.previewValue).toEqual(expectedResult);
    });
  };

  fieldsForCheck.forEach(tokenTest);
});
