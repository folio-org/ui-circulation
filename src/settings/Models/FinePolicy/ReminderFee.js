export default class ReminderFee {
  constructor(reminderFee = {}) {
    this.interval = reminderFee.interval;
    this.frequency = reminderFee.frequency;
    this.fee = reminderFee.fee;
    this.noticeMethod = reminderFee.noticeMethod;
    this.noticeTemplate = reminderFee.noticeTemplate;
  }
}
