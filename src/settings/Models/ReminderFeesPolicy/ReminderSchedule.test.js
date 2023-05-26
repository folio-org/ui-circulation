import ReminderSchedule from './ReminderSchedule';
import reminderFeesPolicyData from '../../../../test/jest/fixtures/reminderFeesPolicy';

describe('ReminderSchedule', () => {
  it('initializes correctly', () => {
    const [reminderScheduleData] = reminderFeesPolicyData.reminderSchedule;
    const reminderSchedule = new ReminderSchedule(reminderScheduleData);

    expect(reminderSchedule.interval).toEqual(reminderScheduleData.interval);
    expect(reminderSchedule.timeUnitId).toEqual(reminderScheduleData.timeUnitId);
    expect(reminderSchedule.reminderFee).toEqual(reminderScheduleData.reminderFee);
    expect(reminderSchedule.noticeMethodId).toEqual(reminderScheduleData.noticeMethodId);
    expect(reminderSchedule.noticeTemplateId).toEqual(reminderScheduleData.noticeTemplateId);
  });

  it('handles missing input correctly', () => {
    const reminderSchedule = new ReminderSchedule();

    expect(reminderSchedule.interval).toBeUndefined();
    expect(reminderSchedule.timeUnitId).toBeUndefined();
    expect(reminderSchedule.reminderFee).toBeUndefined();
    expect(reminderSchedule.noticeMethodId).toBeUndefined();
    expect(reminderSchedule.noticeTemplateId).toBeUndefined();
  });
});
