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
      noticeTemplateId: 'c4f23e08-3b0d-4424-afc3-1e228240a8b0'
    },
  ],
};

export default reminderFeesPolicy;
