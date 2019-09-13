export const intervalIdsMap = {
  MINUTE: 'minute',
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

export const intervalPeriods = [
  {
    value: intervalIdsMap.MINUTE,
    label: 'ui-circulation.settings.finePolicy.minute',
  },
  {
    value: intervalIdsMap.HOUR,
    label: 'ui-circulation.settings.finePolicy.hour',
  },
  {
    value: intervalIdsMap.DAY,
    label: 'ui-circulation.settings.finePolicy.day',
  },
  {
    value: intervalIdsMap.WEEK,
    label: 'ui-circulation.settings.finePolicy.week',
  },
  {
    value: intervalIdsMap.MONTH,
    label: 'ui-circulation.settings.finePolicy.month',
  },
];
