class ReminderSchedule {
  static defaultReminderSchedule() {
    return {};
  }

  constructor(reminderSchedule = {}) {
    this.interval = reminderSchedule.interval;
    this.timeUnitId = reminderSchedule.timeUnitId;
    this.reminderFee = reminderSchedule.reminderFee;
    this.noticeMethodId = reminderSchedule.noticeMethodId;
    this.noticeTemplateId = reminderSchedule.noticeTemplateId;
  }
}

export default ReminderSchedule;
