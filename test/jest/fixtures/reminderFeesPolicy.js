const reminderFeesPolicy = {
  countClosed: true,
  ignoreGracePeriodRecall: true,
  clearPatronBlockWhenPaid: true,
  ignoreGracePeriodHolds: true,
  allowRenewalOfItemsWithReminderFees: true,
  reminderSchedule: [
    {
      interval: 2,
      timeUnitId: 'day',
      reminderFee: 1,
      noticeFormat: 'Email',
    },
  ],
};

export default reminderFeesPolicy;
