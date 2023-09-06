class ReminderSchedule {
  static defaultReminderSchedule() {
    return {};
  }

  constructor(reminderSchedule = {}) {
    this.interval = reminderSchedule.interval;
    this.timeUnitId = reminderSchedule.timeUnitId;
    this.reminderFee = reminderSchedule.reminderFee;
    this.noticeMethodId = reminderSchedule.noticeMethodId;
    this.noticeFormat = reminderSchedule.noticeFormat;
    this.blockTemplateId = reminderSchedule.blockTemplateId;
  }
}

export default ReminderSchedule;
