import ReminderSchedule from './ReminderSchedule';

export default class ReminderFeesPolicy {
  static defaultReminderFeesFields() {
    return {
      countClosed: false,
      ignoreGracePeriodRecall: false,
      ignoreGracePeriodHolds: false,
      allowRenewalOfItemsWithReminderFees: false,
      clearPatronBlockWhenPaid: false,
    };
  }

  static defaultReminderFeesPolicy() {
    return {
      ...ReminderFeesPolicy.defaultReminderFeesFields(),
      reminderSchedule: []
    };
  }

  constructor(reminderFeesPolicy = {}) {
    this.countClosed = reminderFeesPolicy.countClosed;
    this.ignoreGracePeriodRecall = reminderFeesPolicy.ignoreGracePeriodRecall;
    this.clearPatronBlockWhenPaid = reminderFeesPolicy.clearPatronBlockWhenPaid;
    this.ignoreGracePeriodHolds = reminderFeesPolicy.ignoreGracePeriodHolds;
    this.allowRenewalOfItemsWithReminderFees = reminderFeesPolicy.allowRenewalOfItemsWithReminderFees;
    this.reminderSchedule = reminderFeesPolicy.reminderSchedule?.map(schedule => new ReminderSchedule(schedule)) ?? [];
  }
}
