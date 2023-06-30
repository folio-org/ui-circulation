import ReminderSchedule from './ReminderSchedule';

export default class ReminderFeesPolicy {
  static defaultReminderFeesPolicy() {
    return {
      countClosed: true,
      ignoreGracePeriodRecall: true,
      clearPatronBlockWhenPaid: true,
      reminderSchedule: []
    };
  }

  constructor(reminderFeesPolicy = {}) {
    this.countClosed = reminderFeesPolicy.countClosed;
    this.ignoreGracePeriodRecall = reminderFeesPolicy.ignoreGracePeriodRecall;
    this.clearPatronBlockWhenPaid = reminderFeesPolicy.clearPatronBlockWhenPaid;
    this.reminderSchedule = reminderFeesPolicy.reminderSchedule?.map(schedule => new ReminderSchedule(schedule)) ?? [];
  }
}
