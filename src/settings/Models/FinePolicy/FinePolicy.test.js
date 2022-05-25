import FinePolicy from './FinePolicy';

describe('FinePolicy', () => {
  const policy = {
    id: 'id',
    name: 'name',
    description: 'description',
    overdueFine: {},
    countClosed: 0,
    maxOverdueFine: '0.00',
    forgiveOverdueFine: 1,
    overdueRecallFine: {
      quantity: 1,
      intervalId: 'id',
    },
    gracePeriodRecall: 5,
    maxOverdueRecallFine: '5.00',
  };

  const finePolicyInstance = new FinePolicy(policy);

  it('"hasValue" should return true if required value more than 0', () => {
    expect(finePolicyInstance.hasValue('maxOverdueRecallFine')).toEqual(true);
  });

  it('"hasValue" should return false if required value less than 0', () => {
    expect(finePolicyInstance.hasValue('countClosed')).toEqual(false);
  });

  it('"hasNonZeroValue" should return true if it is possible to parse value', () => {
    expect(finePolicyInstance.hasNonZeroValue('maxOverdueRecallFine')).toEqual(true);
  });

  it('"hasNonZeroValue" should return false if it is not possible to parse value', () => {
    expect(finePolicyInstance.hasNonZeroValue('name')).toEqual(false);
  });

  it('"isIntervalSelected" should return true if it is possible to get value', () => {
    expect(finePolicyInstance.isIntervalSelected('overdueRecallFine.intervalId')).toEqual(true);
  });

  it('"isIntervalSelected" should return false if it is not possible to get value', () => {
    expect(finePolicyInstance.isIntervalSelected('overdueFine.intervalId')).toEqual(false);
  });

  it('"isOverdueFine" should return true if required value more than 0', () => {
    const finePolicy = new FinePolicy({
      ...policy,
      overdueFine: {
        quantity: 1,
      },
    });
    expect(finePolicy.isOverdueFine()).toEqual(true);
  });

  it('"isOverdueFine" should return false if required value less than 0', () => {
    expect(finePolicyInstance.isOverdueFine()).toEqual(false);
  });

  it('"isOverdueRecallFine" should return true if required value more than 0', () => {
    expect(finePolicyInstance.isOverdueRecallFine()).toEqual(true);
  });

  it('"isOverdueRecallFine" should return false if required value less than 0', () => {
    const finePolicy = new FinePolicy({
      ...policy,
      overdueRecallFine: {},
    });

    expect(finePolicy.isOverdueRecallFine()).toEqual(false);
  });

  it('"defaultFinePolicy" should return correct data', () => {
    const expectedPolicy = {
      countClosed: true,
      forgiveOverdueFine: true,
      gracePeriodRecall: true,
      overdueFine: { quantity: 0, intervalId: '' },
      maxOverdueFine: 0,
      maxOverdueRecallFine: 0,
      overdueRecallFine: { quantity: 0, intervalId: '' },
    };

    expect(FinePolicy.defaultFinePolicy()).toEqual(expectedPolicy);
  });
});
