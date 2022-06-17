import RenewalsPolicy from './RenewalsPolicy';
import { Period } from '../common';

describe('RenewalsPolicy', () => {
  const period = {
    duration: 1,
    intervalId: 'id',
  };

  const basicPolicy = {
    numberAllowed: 10,
    renewFromId: 'renewFromId',
    alternateFixedDueDateScheduleId: 'alternateFixedDueDateScheduleId',
    unlimited: true,
    differentPeriod: 2,
  };

  const fullPolicy = {
    ...basicPolicy,
    period,
  };

  const renewalsPolicy = new RenewalsPolicy(fullPolicy);

  it('"RenewalsPolicy" should have correct properties when "policy" has all data', () => {
    expect(renewalsPolicy).toEqual(expect.objectContaining(fullPolicy));
  });

  it('"period" property should be instance of "Period"', () => {
    expect(renewalsPolicy.period).toBeInstanceOf(Period);
  });

  it('"RenewalsPolicy" should have correct properties when "policy" does not have all data', () => {
    const expectedResult = {
      ...fullPolicy,
      unlimited: false,
      differentPeriod: false,
    };

    const renewalsPolicyInstance = new RenewalsPolicy({
      ...fullPolicy,
      unlimited: undefined,
      differentPeriod: undefined,
    });

    expect(renewalsPolicyInstance).toEqual(expect.objectContaining(expectedResult));
  });

  it('"RenewalsPolicy" should have correct properties if there is no "policy"', () => {
    const expectedResult = {
      numberAllowed: undefined,
      renewFromId: undefined,
      alternateFixedDueDateScheduleId: undefined,
      unlimited: false,
      differentPeriod: false,
      period: {
        duration: undefined,
        intervalId: undefined,
      },
    };

    const renewalsPolicyInstance = new RenewalsPolicy();

    expect(renewalsPolicyInstance).toEqual(expect.objectContaining(expectedResult));
  });
});
