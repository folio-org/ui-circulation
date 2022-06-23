import patronNoticeTemplate, {
  config as patronNoticeConfig,
} from './patron-notice-template';
import { PATRON_NOTICE_PATH } from '../../../constants/Validation/patron-notice-template';

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

describe('patronNoticeTemplate', () => {
  it('should correctly process passed policy', () => {
    const testPolicyData = 'testPolicyData';
    const expectedResult = {
      ...patronNoticeConfig,
      passedPolicy: testPolicyData,
      hasBeenValidate: true,
    };

    expect(patronNoticeTemplate(testPolicyData)).toEqual(expectedResult);
  });

  describe('"shouldValidate"', () => {
    Object.values(PATRON_NOTICE_PATH).forEach(path => {
      it(`should be true for "${path}" key`, () => {
        expect(patronNoticeConfig[path].shouldValidate).toBe(true);
      });
    });
  });
});
