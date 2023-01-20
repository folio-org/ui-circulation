import normalize from './normalize';
import { requestPolicyTypes } from '../../../constants';

describe('normalize', () => {
  describe('when "type" is a correct value', () => {
    const policy = {
      test: 'test',
      requestTypes: ['Hold'],
    };

    it('should return object with not empty "requestTypes" field', () => {
      const expectedResult = {
        ...policy,
        requestTypes: [requestPolicyTypes[0]],
      };

      expect(normalize(policy)).toEqual(expectedResult);
    });
  });

  describe('when "type" is not a correct value', () => {
    const policy = {
      test: 'test',
      requestTypes: [''],
    };

    it('should return object with "requestTypes" field as empty array', () => {
      const expectedResult = {
        ...policy,
        requestTypes: [],
      };

      expect(normalize(policy)).toEqual(expectedResult);
    });
  });
});
