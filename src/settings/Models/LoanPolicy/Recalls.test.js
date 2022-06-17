import Recalls from './Recalls';
import { Period } from '../common';

describe('Recalls', () => {
  const recall = {
    allowRecallsToExtendOverdueLoans: true,
    recallReturnInterval: {
      duration: 1,
      intervalId: 'id',
    },
    minimumGuaranteedLoanPeriod: {
      duration: 2,
      intervalId: 'id_2',
    },
    alternateRecallReturnInterval: {
      duration: 3,
      intervalId: 'id_3',
    },
  };

  const recalls = new Recalls(recall);

  it('"Recalls" should have correct properties', () => {
    expect(recalls).toEqual(expect.objectContaining(recall));
  });

  it('"recallReturnInterval" property should be instance of "Period"', () => {
    expect(recalls.recallReturnInterval).toBeInstanceOf(Period);
  });

  it('"minimumGuaranteedLoanPeriod" property should be instance of "Period"', () => {
    expect(recalls.minimumGuaranteedLoanPeriod).toBeInstanceOf(Period);
  });

  it('"alternateRecallReturnInterval" property should be instance of "Period"', () => {
    expect(recalls.alternateRecallReturnInterval).toBeInstanceOf(Period);
  });

  it('"Recalls" should have correct properties if there is no "recall"', () => {
    const expectedResult = {
      allowRecallsToExtendOverdueLoans: undefined,
      recallReturnInterval: {
        duration: undefined,
        intervalId: undefined,
      },
      minimumGuaranteedLoanPeriod: {
        duration: undefined,
        intervalId: undefined,
      },
      alternateRecallReturnInterval: {
        duration: undefined,
        intervalId: undefined,
      },
    };
    const recallInstance = new Recalls();

    expect(recallInstance).toEqual(expectedResult);
  });
});
