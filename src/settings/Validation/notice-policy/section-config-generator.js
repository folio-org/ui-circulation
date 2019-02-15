import { reduce } from 'lodash';

export default function (policy, sectionKey) {
  return reduce(policy[sectionKey], (config, notice, index) => {
    const loanNoticeConfig = {
      [`${sectionKey}[${index}].templateId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].format`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].frequency`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].sendOptions.sendHow`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].sendOptions.sendHow`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].sendOptions.sendWhen`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`${sectionKey}[${index}].sendOptions.sendBy.duration`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: notice.sendOptions.isBeforeOrAfter(),
      },
      [`${sectionKey}[${index}].sendOptions.sendBy.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: notice.sendOptions.isBeforeOrAfter(),
      },
      [`${sectionKey}[${index}].sendOptions.sendEvery.duration`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: notice.isRecurring(),
      },
      [`${sectionKey}[${index}].sendOptions.sendEvery.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: notice.isRecurring(),
      },
    };

    return { ...config, ...loanNoticeConfig };
  }, {});
}
