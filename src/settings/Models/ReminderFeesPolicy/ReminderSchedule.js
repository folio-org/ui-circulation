class ReminderSchedule {
  static defaultReminderSchedule() {
    return {};
  }

  constructor(reminderSchedule = {}) {
    this.interval = reminderSchedule.interval;
    this.timeUnitId = reminderSchedule.timeUnitId;
    this.reminderFee = reminderSchedule.reminderFee;
    this.noticeFormat = reminderSchedule.noticeFormat;
    this.noticeTemplateId = reminderSchedule.noticeTemplateId;
    this.blockTemplateId = reminderSchedule.blockTemplateId;
  }
}

export default ReminderSchedule;
