import RequestManagement from './RequestManagement';
import Recalls from './Recalls';
import Holds from './Holds';

describe('RequestManagement', () => {
  const recalls = {
    allowRecallsToExtendOverdueLoans: true,
    recallReturnInterval: {
      duration: 1,
      intervalId: 'id',
    },
    minimumGuaranteedLoanPeriod: {
      duration: 1,
      intervalId: 'id_2',
    },
    alternateRecallReturnInterval: {
      duration: 1,
      intervalId: 'id_3',
    },
  };

  const holds = {
    renewItemsWithRequest: true,
    alternateCheckoutLoanPeriod: {
      duration: 1,
      intervalId: 'id',
    },
    alternateRenewalLoanPeriod: {
      duration: 1,
      intervalId: 'id_2',
    },
  };

  const requestManagement = new RequestManagement({
    recalls,
    holds,
  });

  it('"RequestManagement" should have correct properties', () => {
    expect(requestManagement).toEqual(expect.objectContaining({
      holds,
      recalls,
    }));
  });

  it('"recalls" property should be instance of "Recalls"', () => {
    expect(requestManagement.recalls).toBeInstanceOf(Recalls);
  });

  it('"holds" property should be instance of "Holds"', () => {
    expect(requestManagement.holds).toBeInstanceOf(Holds);
  });
});
