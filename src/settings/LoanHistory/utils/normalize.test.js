import normalize from './normalize';

const mockedData = {
  closingType: {
    loan: 'interval',
    loanExceptions: [
      'interval',
    ]
  },
  loanExceptions: [
    { testData: 'testData' },
  ],
  loan: {
    testData: 'testData',
  },
};

describe('LoanHistory normalize function', () => {
  it('should normalize key with string data', () => {
    const dataForChange = {
      ...mockedData,
      closingType: {
        ...mockedData.closingType,
        loan: 'not interval',
      },
    };
    const expectedData = {
      ...dataForChange,
      loan: {},
    };

    expect(normalize(dataForChange)).toEqual(expectedData);
  });

  it('should normalize key with array data', () => {
    const dataForChange = {
      ...mockedData,
      closingType: {
        ...mockedData.closingType,
        loanExceptions: [
          'not interval',
        ]
      },
    };
    const expectedData = {
      ...dataForChange,
      loanExceptions: [
        {},
      ]
    };

    expect(normalize(dataForChange)).toEqual(expectedData);
  });

  it('should not normalize data', () => {
    expect(normalize(mockedData)).toEqual(mockedData);
  });
});
