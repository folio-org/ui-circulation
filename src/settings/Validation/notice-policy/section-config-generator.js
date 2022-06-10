import { reduce } from 'lodash';

const sectionConfigGenerator = (policy, sectionKey, allowedIds) => {
  return reduce(policy[sectionKey], (config, notice, index) => {
    const isRecurringSelected = notice.isRecurring();
    const isBeforeOrAfterSelected = notice.sendOptions.isBeforeOrAfter();
    const isSendOptionsAvailable = notice.sendOptions.isSendOptionsAvailable(allowedIds);
    const isLoanDueDateTimeSelected = notice.sendOptions.isLoanDueDateTimeSelected();
    const isFrequencyAvailable = notice.sendOptions.isFrequencyAvailable(allowedIds);

    const noticeConfig = {
      [`${sectionKey}[${index}].templateId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].format`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].sendOptions.sendWhen`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].sendOptions.sendHow`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isSendOptionsAvailable,
      },
      [`${sectionKey}[${index}].sendOptions.sendBy.duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
        shouldValidate: isSendOptionsAvailable && isBeforeOrAfterSelected,
      },
      [`${sectionKey}[${index}].sendOptions.sendBy.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isSendOptionsAvailable && isBeforeOrAfterSelected,
      },
      [`${sectionKey}[${index}].frequency`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isFrequencyAvailable,
      },
      [`${sectionKey}[${index}].sendOptions.sendEvery.duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
        shouldValidate: isSendOptionsAvailable && isRecurringSelected,
      },
      [`${sectionKey}[${index}].sendOptions.sendEvery.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isSendOptionsAvailable && isRecurringSelected,
      },
      [`${sectionKey}[${index}].realTime`]: {
        rules: ['isSelected'],
        shouldValidate: isLoanDueDateTimeSelected,
      },
    };

    return { ...config, ...noticeConfig };
  }, {});
};

export default sectionConfigGenerator;
