/* eslint-disable max-classes-per-file */
import loanHistoryValidator from './loan-history';

jest.mock('../../Models/LoanHistoryModel', () => (class {
  constructor(data) {
    this.data = data;
  }
}));
jest.mock('../engine/FormValidator', () => (class {
  constructor(data) {
    this.data = data;
  }

  validate(formData) {
    return {
      config: this.data,
      formData,
    };
  }
}));
jest.mock('./general', () => (formData) => ({ formData }));
jest.mock('./loan-exceptions', () => (formData, sectionKey) => ({
  formData,
  sectionKey,
}));

describe('loanHistoryValidator', () => {
  it('should correctly process passed data', () => {
    const testData = {
      key: 'testData',
    };
    const expectedResult = {
      config: {
        formData: {
          data: {
            key: 'testData',
          },
        },
        sectionKey: 'loanExceptions',
      },
      formData: {
        data: {
          key: 'testData',
        },
      },
    };

    expect(loanHistoryValidator(testData)).toEqual(expectedResult);
  });
});
