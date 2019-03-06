import {
  reduce,
  values,
} from 'lodash';

import {
  loanTimeBasedEventsIds,
  requestTimeBasedEventsIds
} from '../../../constants';

const timeBasedEventsIds = [
  ...values(loanTimeBasedEventsIds),
  ...values(requestTimeBasedEventsIds),
];

export default function (policy, sectionKey) {
  return reduce(policy[sectionKey], (config, notice, index) => {
    const isRecurringSelected = notice.isRecurring();
    const isBeforeOrAfterSelected = notice.sendOptions.isBeforeOrAfter();
    const isTimeBasedEventSelected = notice.sendOptions.isTimeBasedEventSelected(timeBasedEventsIds);

    const loanNoticeConfig = {
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
        shouldValidate: isTimeBasedEventSelected,
      },
      [`${sectionKey}[${index}].sendOptions.sendBy.duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
        shouldValidate: isTimeBasedEventSelected && isBeforeOrAfterSelected,
      },
      [`${sectionKey}[${index}].sendOptions.sendBy.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isTimeBasedEventSelected && isBeforeOrAfterSelected,
      },
      [`${sectionKey}[${index}].frequency`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isTimeBasedEventSelected,
      },
      [`${sectionKey}[${index}].sendOptions.sendEvery.duration`]: {
        rules: ['isNotEmpty', 'isIntegerGreaterThanZero', 'isFromOneToHundred'],
        shouldValidate: isTimeBasedEventSelected && isRecurringSelected,
      },
      [`${sectionKey}[${index}].sendOptions.sendEvery.intervalId`]: {
        rules: ['isNotEmptySelect'],
        shouldValidate: isTimeBasedEventSelected && isRecurringSelected,
      },
    };

    return { ...config, ...loanNoticeConfig };
  }, {});
}
