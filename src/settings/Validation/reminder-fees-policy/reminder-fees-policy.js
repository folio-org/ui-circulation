import { RULES } from '../../../constants/Validation/general';

const reminderFeesPolicyValidator = (reminderFeePolicy) => {
  return reminderFeePolicy.reminderSchedule.reduce((config, _, index) => {
    const reminderScheduleConfig = {
      [`reminderFeesPolicy.reminderSchedule[${index}].interval`]: {
        rules: [RULES.IS_NOT_EMPTY],
        shouldValidate: true,
      },
      [`reminderFeesPolicy.reminderSchedule[${index}].reminderFee`]: {
        rules: [RULES.IS_NOT_EMPTY],
        shouldValidate: true,
      },
      [`reminderFeesPolicy.reminderSchedule[${index}].noticeMethodId`]: {
        rules: [RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
      [`reminderFeesPolicy.reminderSchedule[${index}].noticeTemplateId`]: {
        rules: [RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
    };

    return { ...config, ...reminderScheduleConfig };
  }, {});
};

export default reminderFeesPolicyValidator;
