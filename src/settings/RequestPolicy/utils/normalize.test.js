import normalize from './normalize';
import {
  REQUEST_TYPE_RULES,
  requestPolicyTypes,
} from '../../../constants';

describe('normalize', () => {
  const holdRequestType = requestPolicyTypes[0];
  const basePolicy = {
    allowedServicePoints: {
      [holdRequestType]: [
        {
          value: REQUEST_TYPE_RULES.ALLOW_SOME,
        }
      ],
    },
    requestTypesRules: {
      [holdRequestType]: REQUEST_TYPE_RULES.ALLOW_SOME,
    },
    requestTypes: [holdRequestType],
  };

  describe('when "type" is a correct value', () => {
    it('should return object with not empty "requestTypes" field', () => {
      const expectedResult = {
        ...basePolicy,
        allowedServicePoints: {
          [holdRequestType]: [REQUEST_TYPE_RULES.ALLOW_SOME],
        },
        requestTypesRules: undefined,
      };

      expect(normalize(basePolicy)).toEqual(expectedResult);
    });
  });

  describe('when "type" is not a correct value', () => {
    const policy = {
      ...basePolicy,
      requestTypes: [''],
    };

    it('should return object with "requestTypes" field as empty array', () => {
      const expectedResult = {
        ...basePolicy,
        requestTypesRules: undefined,
        allowedServicePoints: undefined,
        requestTypes: [],
      };

      expect(normalize(policy)).toEqual(expectedResult);
    });
  });

  describe('when policy allows all service points', () => {
    const policy = {
      ...basePolicy,
      requestTypesRules: {
        [holdRequestType]: REQUEST_TYPE_RULES.ALLOW_ALL,
      },
    };

    it('should return policy without allowed service points', () => {
      const expectedResult = {
        ...basePolicy,
        requestTypesRules: undefined,
        allowedServicePoints: undefined,
      };

      expect(normalize(policy)).toEqual(expectedResult);
    });
  });
});
