import { RULES } from '../../../constants/Validation/general';

const reminderFeesPolicyValidator = (reminderFeePolicy) => {
  return reminderFeePolicy?.reminderSchedule.reduce((config, _, index) => {
    const reminderScheduleConfig = {
      [`reminderFeesPolicy.reminderSchedule[${index}].interval`]: {
        rules: [RULES.IS_NOT_EMPTY, RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO],
        shouldValidate: true,
      },
      [`reminderFeesPolicy.reminderSchedule[${index}].reminderFee`]: {
        rules: [RULES.IS_NOT_EMPTY, RULES.IS_FLOAT_GREATER_THAN_OR_EQUAL_TO_ZERO],
        shouldValidate: true,
      },
      [`reminderFeesPolicy.reminderSchedule[${index}].noticeFormat`]: {
        rules: [RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
      [`reminderFeesPolicy.reminderSchedule[${index}].noticeTemplateId`]: {
        rules: [RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
      [`reminderFeesPolicy.reminderSchedule[${index}].blockTemplateId`]: {
        rules: [RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
    };

    return { ...config, ...reminderScheduleConfig };
  }, {});
};

export default reminderFeesPolicyValidator;
