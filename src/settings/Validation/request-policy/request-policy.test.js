import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';
import requestPolicy from './request-policy';

jest.mock('../engine/FormValidator', () => (class {
  constructor(config) {
    this.config = config;
  }

  validate(policy) {
    return {
      ...this.config,
      passedPolicy: policy,
      hasBeenValidate: true,
    };
  }
}));

describe('requestPolicy', () => {
  it('should correctly process the passed policy', () => {
    const testPolicyData = 'testPolicyData';
    const expectedResult = {
      ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
      passedPolicy: testPolicyData,
      hasBeenValidate: true,
    };

    expect(requestPolicy(testPolicyData)).toEqual(expectedResult);
  });
});
