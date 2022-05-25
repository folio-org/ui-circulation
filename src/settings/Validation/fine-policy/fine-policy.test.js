/* eslint-disable max-classes-per-file */
import finePolicyValidation from './fine-policy';

jest.mock('../../Models/FinePolicy', () => (class {
  constructor(policy) {
    this.policyData = policy;
  }
}));
jest.mock('./fines', () => jest.fn((data) => ({
  ...data,
  withConfig: true,
})));
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

describe('finePolicyValidation', () => {
  it('should correctly process passed policy', () => {
    const testPolicyData = 'testPolicyData';
    const expectedResult = {
      policyData: testPolicyData,
      withConfig: true,
      passedPolicy: testPolicyData,
      hasBeenValidate: true,
    };

    expect(finePolicyValidation(testPolicyData)).toEqual(expectedResult);
  });
});
