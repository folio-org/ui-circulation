import { dayjs } from '@folio/stripes/components';

import { Metadata } from '../common';
import FixedDueDateSchedule from './FixedDueDateSchedule';
import Schedule from './Schedule';

describe('FixedDueDateSchedule', () => {
  it('should return correct default FixedDueDateSchedule', () => {
    const defaultSchedules = FixedDueDateSchedule.defaultFixedDueDateSchedule();

    expect(defaultSchedules.schedules.length).toBe(1);
    expect(defaultSchedules.schedules[0].key.includes('schedule_')).toBe(true);
  });

  describe('when props were not passed', () => {
    const scheduleInstance = new FixedDueDateSchedule();

    it('should have correct values', () => {
      const expectedResult = {
        id: undefined,
        name: undefined,
        metadata: new Metadata(),
        schedules: [],
      };

      expect(scheduleInstance).toEqual(expectedResult);
    });

    it('"hasSchedules" should return false', () => {
      expect(scheduleInstance.hasSchedules()).toBe(false);
    });

    it('"hasOverlappingDateRange" should return false', () => {
      expect(scheduleInstance.hasOverlappingDateRange()).toBe(false);
    });
  });

  describe('when props were passed', () => {
    const firstTestSchedule = {
      from: 'Tue Apr 17 2025 21:08:59 GMT+0300',
      to: 'Tue Apr 18 2025 21:08:59 GMT+0300',
      due: 'Tue Apr 19 2025 21:08:59 GMT+0300',
    };
    const secondTestSchedule = {
      from: 'Tue Apr 10 2025 21:08:59 GMT+0300',
      to: 'Tue Apr 11 2025 21:08:59 GMT+0300',
      due: 'Tue Apr 12 2025 21:08:59 GMT+0300',
    };
    const validScheduleProps = {
      id: 'testId',
      name: 'testName',
      metadata: {
        createdByUserId: 'testCreatedByUserId',
        createdDate: 'testCreatedDate',
        updatedByUserId: 'testUpdatedByUserId',
        updatedDate: 'testUpdatedDate',
      },
      schedules: [
        firstTestSchedule,
        secondTestSchedule,
      ],
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('when all props are valid', () => {
      dayjs.mockImplementation(() => ({
        isBefore: jest.fn(() => true),
        isAfter: jest.fn(() => false),
      }));

      const scheduleInstance = new FixedDueDateSchedule(validScheduleProps);

      it('should have correct values', () => {
        expect(scheduleInstance).toEqual(validScheduleProps);
      });

      it('"metadata" should be an instance of Metadata', () => {
        expect(scheduleInstance.metadata).toBeInstanceOf(Metadata);
      });

      it('each of "schedules" should be an instance of Schedule', () => {
        scheduleInstance.schedules.forEach((schedule) => {
          expect(schedule).toBeInstanceOf(Schedule);
        });
      });

      it('"hasSchedules" should return true', () => {
        expect(scheduleInstance.hasSchedules()).toBe(true);
      });

      it('"hasOverlappingDateRange" should return false', () => {
        expect(scheduleInstance.hasOverlappingDateRange()).toBe(false);
      });

      it('"hasInvalidSchedules" should return false', () => {
        expect(scheduleInstance.hasInvalidSchedules()).toBe(false);
      });
    });

    describe('when instance contains schedules with overlaps', () => {
      beforeEach(() => {
        dayjs.mockImplementation(() => ({
          isBefore: jest.fn(() => true),
          isAfter: jest.fn(() => true),
        }));
      });

      const thirdTestSchedule = {
        from: 'Tue Apr 22 2025 21:08:59 GMT+0300',
        to: 'Tue Apr 23 2025 21:08:59 GMT+0300',
        due: 'Tue Apr 24 2025 21:08:59 GMT+0300',
      };
      const scheduleInstance = new FixedDueDateSchedule({
        ...validScheduleProps,
        schedules: [
          firstTestSchedule,
          secondTestSchedule,
          thirdTestSchedule,
        ],
      });

      it('"hasOverlappingDateRange" should return true', () => {
        expect(scheduleInstance.hasOverlappingDateRange()).toBe(true);
      });
    });

    describe('when instance contains invalid schedules', () => {
      const thirdTestSchedule = {
        from: '',
        to: 'Tue Apr 23 2025 21:08:59 GMT+0300',
      };
      const scheduleInstance = new FixedDueDateSchedule({
        ...validScheduleProps,
        schedules: [
          firstTestSchedule,
          secondTestSchedule,
          thirdTestSchedule,
        ],
      });

      it('"hasInvalidSchedules" should return true', () => {
        expect(scheduleInstance.hasInvalidSchedules()).toBe(true);
      });
    });
  });
});
