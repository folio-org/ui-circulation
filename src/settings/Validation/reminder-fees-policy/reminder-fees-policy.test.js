import reminderFeesPolicyValidator from './reminder-fees-policy';
import * as Validation from '../../../constants/Validation/general';

import reminderFeesPolicy from '../../../../test/jest/fixtures/reminderFeesPolicy';

describe('reminderFeesPolicyValidator', () => {
  it('should validate reminderFeePolicy correctly', () => {
    const expectedResult = {
      'reminderFeesPolicy.reminderSchedule[0].interval': {
        rules: [Validation.RULES.IS_NOT_EMPTY, Validation.RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO],
        shouldValidate: true,
      },
      'reminderFeesPolicy.reminderSchedule[0].reminderFee': {
        rules: [Validation.RULES.IS_NOT_EMPTY, Validation.RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO],
        shouldValidate: true,
      },
      'reminderFeesPolicy.reminderSchedule[0].noticeMethodId': {
        rules: [Validation.RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
      'reminderFeesPolicy.reminderSchedule[0].noticeTemplateId': {
        rules: [Validation.RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
      'reminderFeesPolicy.reminderSchedule[0].blockTemplateId': {
        rules: [Validation.RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
    };

    const validationObject = reminderFeesPolicyValidator(reminderFeesPolicy);

    expect(validationObject).toEqual(expectedResult);
  });
});
