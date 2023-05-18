import { RULES } from '../../../constants/Validation/general';

const reminderScheduleValidator = (reminderFeePolicy) => {
  return reminderFeePolicy.reminderSchedule.reduce((config, _, index) => {
    const reminderScheduleConfig = {
      [`reminderSchedule[${index}].interval`]: {
        rules: [RULES.IS_NOT_EMPTY],
        shouldValidate: true,
      },
      [`reminderSchedule[${index}].reminderFee`]: {
        rules: [RULES.IS_NOT_EMPTY],
        shouldValidate: true,
      },
      [`reminderSchedule[${index}].noticeMethodId`]: {
        rules: [RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
      [`reminderSchedule[${index}].noticeTemplateId`]: {
        rules: [RULES.IS_NOT_EMPTY_SELECT],
        shouldValidate: true,
      },
    };

    return { ...config, ...reminderScheduleConfig };
  }, {});
};

export default reminderScheduleValidator;

