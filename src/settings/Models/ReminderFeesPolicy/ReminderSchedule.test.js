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
    expect(reminderSchedule.noticeFormat).toEqual(reminderScheduleData.noticeFormat);
  });

  it('handles missing input correctly', () => {
    const reminderSchedule = new ReminderSchedule();

    expect(reminderSchedule.interval).toBeUndefined();
    expect(reminderSchedule.timeUnitId).toBeUndefined();
    expect(reminderSchedule.reminderFee).toBeUndefined();
    expect(reminderSchedule.noticeMethodId).toBeUndefined();
    expect(reminderSchedule.noticeFormat).toBeUndefined();
  });

  it('"defaultReminderFeesPolicy" should return correct data', () => {
    expect(ReminderSchedule.defaultReminderSchedule()).toEqual({});
  });
});
