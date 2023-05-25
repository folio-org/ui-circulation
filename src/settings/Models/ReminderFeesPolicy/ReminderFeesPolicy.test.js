import ReminderFeesPolicy from './ReminderFeesPolicy';
import ReminderSchedule from './ReminderSchedule';
import reminderFeesPolicyData from '../../../../test/jest/fixtures/reminderFeesPolicy';

describe('ReminderFeesPolicy', () => {
  it('initializes reminderSchedule with instances of ReminderSchedule', () => {
    const reminderFeesPolicy = new ReminderFeesPolicy(reminderFeesPolicyData);

    reminderFeesPolicy.reminderSchedule.forEach(schedule => {
      expect(schedule).toBeInstanceOf(ReminderSchedule);
    });

    // Check if properties of each schedule object match with input
    reminderFeesPolicy.reminderSchedule.forEach((schedule, index) => {
      const inputSchedule = reminderFeesPolicyData.reminderSchedule[index];
      expect(schedule.interval).toEqual(inputSchedule.interval);
      expect(schedule.timeUnitId).toEqual(inputSchedule.timeUnitId);
      expect(schedule.reminderFee).toEqual(inputSchedule.reminderFee);
      expect(schedule.noticeMethodId).toEqual(inputSchedule.noticeMethodId);
      expect(schedule.noticeTemplateId).toEqual(inputSchedule.noticeTemplateId);
    });
  });
});
