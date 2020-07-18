export default class Schedule {
  constructor(schedule = {}) {
    this.from = schedule.from;
    this.to = schedule.to;
    this.due = schedule.due;
  }
}
