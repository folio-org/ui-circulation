import { reduce } from 'lodash';

export default function (policy) {
  return reduce(policy.loanNotices, (config, loanNotice, index) => {
    const loanNoticeConfig = {
      [`loanNotices[${index}].templateId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`loanNotices[${index}].format`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`loanNotices[${index}].frequency`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`loanNotices[${index}].sendOptions.sendHow`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`loanNotices[${index}].sendOptions.sendHow`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`loanNotices[${index}].sendOptions.sendWhen`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: true,
      },
      [`loanNotices[${index}].sendOptions.sendBy.duration`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: loanNotice.sendOptions.isBeforeOrAfter(),
      },
      [`loanNotices[${index}].sendOptions.sendBy.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: loanNotice.sendOptions.isBeforeOrAfter(),
      },
      [`loanNotices[${index}].sendOptions.sendEvery.duration`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: loanNotice.isRecurring(),
      },
      [`loanNotices[${index}].sendOptions.sendEvery.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: loanNotice.isRecurring(),
      },
    };
    return { ...config, ...loanNoticeConfig };
  }, {});
}
