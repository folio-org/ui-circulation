import Holds from './Holds';
import { Period } from '../common';

describe('Holds', () => {
  const hold = {
    renewItemsWithRequest: true,
    alternateCheckoutLoanPeriod: {
      duration: 1,
      intervalId: 'id',
    },
    alternateRenewalLoanPeriod: {
      duration: 2,
      intervalId: 'id_2',
    },
  };

  const holds = new Holds(hold);

  it('"Holds" should have correct properties', () => {
    expect(holds).toEqual(expect.objectContaining(hold));
  });

  it('"alternateCheckoutLoanPeriod" should be instance of "Period"', () => {
    expect(holds.alternateCheckoutLoanPeriod).toBeInstanceOf(Period);
  });

  it('"alternateCheckoutLoanPeriod" should be instance of "Period"', () => {
    expect(holds.alternateRenewalLoanPeriod).toBeInstanceOf(Period);
  });

  it('"Holds" should have correct properties if there is no "hold"', () => {
    const expectedResult = {
      alternateCheckoutLoanPeriod: {
        duration: undefined,
        intervalId: undefined,
      },
      alternateRenewalLoanPeriod: {
        duration: undefined,
        intervalId: undefined,
      },
      renewItemsWithRequest: undefined,
    };

    const holdInstance = new Holds();

    expect(holdInstance).toEqual(expect.objectContaining(expectedResult));
  });
});
