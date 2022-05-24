import moment from 'moment';

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
      const emptyMetadata = new Metadata();

      expect(scheduleInstance.id).toBe(undefined);
      expect(scheduleInstance.name).toBe(undefined);
      expect(scheduleInstance.metadata).toEqual(emptyMetadata);
      expect(scheduleInstance.schedules).toEqual([]);
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
      from: moment.utc().subtract(2, 'days'),
      to: moment().utc().add(2, 'days'),
      due: moment.utc().add(3, 'days'),
    };
    const secondTestSchedule = {
      from: moment.utc().add(3, 'days'),
      to: moment().utc().add(5, 'days'),
      due: moment.utc().add(6, 'days'),
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

    describe('when all props are valid', () => {
      const scheduleInstance = new FixedDueDateSchedule(validScheduleProps);

      it('should have correct values', () => {
        expect(scheduleInstance.id).toBe(validScheduleProps.id);
        expect(scheduleInstance.name).toBe(validScheduleProps.name);
        expect(scheduleInstance.metadata).toEqual(expect.objectContaining(validScheduleProps.metadata));
        expect(scheduleInstance.schedules).toEqual(expect.objectContaining(validScheduleProps.schedules));
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
      const thirdTestSchedule = {
        from: moment.utc(),
        to: moment().utc().add(2, 'days'),
        due: moment.utc().add(3, 'days'),
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
        from: moment.utc(),
        to: moment().utc().add(2, 'days'),
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
