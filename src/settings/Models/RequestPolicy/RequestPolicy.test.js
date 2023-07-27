import RequestPolicy from './RequestPolicy';
import { Metadata } from '../common';

describe('RequestPolicy', () => {
  const policy = {
    id: 'id',
    name: 'name',
    description: 'description',
    requestTypes: 'type',
    allowedServicePoints: {
      Hold: ['holdId']
    },
    metadata: {
      createdByUserId: 'id',
      createdDate: 'date',
      updatedByUserId: 'id_2',
      updatedDate: 'date_2',
    },
  };
  const requestPolicy = new RequestPolicy(policy);

  it('should have correct properties', () => {
    expect(requestPolicy).toEqual(expect.objectContaining(policy));
  });

  it('should have correct properties if policy is not provided', () => {
    const expectedResult = {
      id: undefined,
      name: undefined,
      description: undefined,
      requestTypes: undefined,
      allowedServicePoints: undefined,
      metadata: {
        createdByUserId: undefined,
        createdDate: undefined,
        updatedByUserId: undefined,
        updatedDate: undefined,
      },
    };
    const requestPolicyInstance = new RequestPolicy();

    expect(requestPolicyInstance).toEqual(expect.objectContaining(expectedResult));
  });

  it('should return correct data for "defaultPolicy"', () => {
    expect(RequestPolicy.defaultPolicy()).toEqual({
      requestTypes: [],
    });
  });

  describe('"metadata" property', () => {
    it('should be instance of "Metadata"', () => {
      expect(requestPolicy.metadata).toBeInstanceOf(Metadata);
    });
  });
});
