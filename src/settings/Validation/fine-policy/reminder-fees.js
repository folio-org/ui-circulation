const reminderFees = (policy) => {
  return policy.reminderFees.reduce((config, reminderFee, index) => {
    const reminderFeeConfig = {
      [`reminderFees[${index}].interval`]: {
        rules: ['isNotEmpty'],
        shouldValidate: true,
      },
      [`reminderFees[${index}].fee`]: {
        rules: ['isNotEmpty'],
        shouldValidate: true,
      },
      [`reminderFees[${index}].noticeMethod`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`reminderFees[${index}].noticeTemplate`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
    };

    return { ...config, ...reminderFeeConfig };
  }, {});
};

export default reminderFees;
