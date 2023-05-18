import ReminderSchedule from './ReminderSchedule';

export default class ReminderFeesPolicy {
  constructor(reminderFeesPolicy = {}) {
    this.reminderSchedule = reminderFeesPolicy.reminderSchedule?.map(schedule => new ReminderSchedule(schedule)) ?? [];
  }
}
