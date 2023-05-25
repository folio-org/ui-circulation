import FinePolicy from './FinePolicy';
import { OverdueFine, Metadata } from '../common';
import { FINE_POLICY_PATH } from '../../../constants/Validation/fine-policy';

describe('FinePolicy', () => {
  const basicPolicy = {
    id: 'id',
    name: 'name',
    description: 'description',
    countClosed: 0,
    maxOverdueFine: '0.00',
    forgiveOverdueFine: 1,
    gracePeriodRecall: 5,
    maxOverdueRecallFine: '5.00',
  };

  const policy = {
    ...basicPolicy,
    overdueFine: {
      quantity: 1,
      intervalId: 'id',
    },
    overdueRecallFine: {
      quantity: 2,
      intervalId: 'id_2',
    },
    metadata: {
      createdByUserId: 'createdByUserId',
      createdDate: 'createdDate',
      updatedByUserId: 'updatedByUserId',
      updatedDate: 'updatedDate',
    },
    reminderFeesPolicy: {
      reminderSchedule: [
        {
          interval: 2,
          timeUnitId: 'day',
          reminderFee: 1,
          noticeMethodId: 'email',
          noticeTemplateId: 'c4f23e08-3b0d-4424-afc3-1e228240a8b0'
        },
      ]
    }
  };

  const finePolicyInstance = new FinePolicy(policy);

  it('"FinePolicy" should have correct properties', () => {
    expect(finePolicyInstance).toEqual(expect.objectContaining(policy));
  });

  it('"FinePolicy" should have correct properties if "policy" is not provided', () => {
    const finePolicy = new FinePolicy();

    expect(finePolicy).toEqual(expect.objectContaining({
      id: undefined,
      name: undefined,
      description: undefined,
      countClosed: undefined,
      maxOverdueFine: undefined,
      forgiveOverdueFine: undefined,
      gracePeriodRecall: undefined,
      maxOverdueRecallFine: undefined,
    }));
  });

  it('"overdueFine" property should be instance of "OverdueFine"', () => {
    expect(finePolicyInstance.overdueFine).toBeInstanceOf(OverdueFine);
  });

  it('"overdueRecallFine" property should be instance of "OverdueFine"', () => {
    expect(finePolicyInstance.overdueRecallFine).toBeInstanceOf(OverdueFine);
  });

  it('"metadata" property should be instance of "Metadata"', () => {
    expect(finePolicyInstance.metadata).toBeInstanceOf(Metadata);
  });

  it('"hasValue" should return true if required value more than 0', () => {
    expect(finePolicyInstance.hasValue(FINE_POLICY_PATH.MAX_OVERDUE_RECALL_FINE)).toEqual(true);
  });

  it('"hasValue" should return false if required value less or equal 0', () => {
    expect(finePolicyInstance.hasValue(FINE_POLICY_PATH.MAX_OVERDUE_FINE)).toEqual(false);
  });

  it('"hasNonZeroValue" should return true if it is possible to parse value and value is not equal 0', () => {
    expect(finePolicyInstance.hasNonZeroValue(FINE_POLICY_PATH.MAX_OVERDUE_RECALL_FINE)).toEqual(true);
  });

  it('"hasNonZeroValue" should return false if value equals 0', () => {
    expect(finePolicyInstance.hasNonZeroValue(FINE_POLICY_PATH.MAX_OVERDUE_FINE)).toEqual(false);
  });

  it('"hasNonZeroValue" should return false if it is not possible to parse value', () => {
    expect(finePolicyInstance.hasNonZeroValue(FINE_POLICY_PATH.NAME)).toEqual(false);
  });

  it('"isIntervalSelected" should return true if it is possible to get value', () => {
    expect(finePolicyInstance.isIntervalSelected(FINE_POLICY_PATH.OVERDUE_RECALL_FINE_INTERVAL_ID)).toEqual(true);
  });

  it('"isIntervalSelected" should return false if it is not possible to get value', () => {
    const finePolicy = new FinePolicy({
      ...policy,
      overdueFine: {},
    });

    expect(finePolicy.isIntervalSelected(FINE_POLICY_PATH.OVERDUE_FINE_INTERVAL_ID)).toEqual(false);
  });

  it('"isOverdueFine" should return true if required value more than 0', () => {
    expect(finePolicyInstance.isOverdueFine()).toEqual(true);
  });

  it('"isOverdueFine" should return false if required value less or equal 0', () => {
    const finePolicy = new FinePolicy({
      ...policy,
      overdueFine: {
        quantity: 0,
      },
    });

    expect(finePolicy.isOverdueFine()).toEqual(false);
  });

  it('"isOverdueRecallFine" should return true if required value more than 0', () => {
    expect(finePolicyInstance.isOverdueRecallFine()).toEqual(true);
  });

  it('"isOverdueRecallFine" should return false if required value less or equal 0', () => {
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
      reminderFeesPolicy: { reminderSchedule: [] }
    };

    expect(FinePolicy.defaultFinePolicy()).toEqual(expectedPolicy);
  });
});
