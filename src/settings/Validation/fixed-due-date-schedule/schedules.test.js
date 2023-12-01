import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import schedulesArrayValidator from './schedules';

const ARRAY_ERROR = 'ARRAY_ERROR';

jest.mock('final-form', () => ({
  ARRAY_ERROR,
}));

describe('schedulesArrayValidator', () => {
  const labelIds = {
    oneScheduleMin: 'ui-circulation.settings.fDDS.validate.oneScheduleMin',
    overlappingDateRange: 'ui-circulation.settings.fDDS.validate.overlappingDateRange',
  };

  describe('when "hasInvalidSchedules" returns true and "prevErrors.schedules" is falsy', () => {
    it('should return previous collection of errors', () => {
      const fixedDueDateSchedule = {
        hasInvalidSchedules: () => true,
      };
      const prevErrors = {
        errors: ['mockedPrevError'],
      };

      expect(schedulesArrayValidator(fixedDueDateSchedule, prevErrors)).toEqual(prevErrors);
    });
  });

  describe('when "hasInvalidSchedules" returns false and "prevErrors.schedules" is truthy', () => {
    it('should return previous collection of errors', () => {
      const fixedDueDateSchedule = {
        hasInvalidSchedules: () => false,
      };
      const prevErrors = {
        schedules: ['testSchedule'],
        errors: ['mockedPrevError'],
      };

      expect(schedulesArrayValidator(fixedDueDateSchedule, prevErrors)).toEqual(prevErrors);
    });
  });

  describe('when "hasInvalidSchedules" returns false and "prevErrors.schedules" is falsy', () => {
    const prevErrors = { errors: ['testScheduleError'] };

    describe('when "hasSchedules" returns false', () => {
      const fixedDueDateSchedule = {
        hasInvalidSchedules: () => false,
        hasSchedules: () => false,
      };
      const result = schedulesArrayValidator(fixedDueDateSchedule, prevErrors);

      it('should contains data of previous errors', () => {
        expect(result).toEqual(expect.objectContaining(prevErrors));
      });

      it(`should contains correct error message by "${ARRAY_ERROR}" key`, () => {
        render(result.schedules[ARRAY_ERROR]);

        expect(screen.getByText(labelIds.oneScheduleMin)).toBeInTheDocument();
      });
    });

    describe('when "hasSchedules" returns true', () => {
      describe('when "hasOverlappingDateRange" returns true', () => {
        const fixedDueDateSchedule = {
          hasInvalidSchedules: () => false,
          hasSchedules: () => true,
          hasOverlappingDateRange: () => true,
          getOverlappedDateRanges: () => ({}),
        };
        const result = schedulesArrayValidator(fixedDueDateSchedule, prevErrors);

        it('should contains data of previous errors', () => {
          expect(result).toEqual(expect.objectContaining(prevErrors));
        });

        it(`should contains correct error message by "${ARRAY_ERROR}" key`, () => {
          render(result.schedules[ARRAY_ERROR]);

          expect(screen.getByText(labelIds.overlappingDateRange)).toBeInTheDocument();
        });
      });

      describe('when "hasOverlappingDateRange" returns false', () => {
        const fixedDueDateSchedule = {
          hasInvalidSchedules: () => false,
          hasSchedules: () => true,
          hasOverlappingDateRange: () => false,
        };
        const result = schedulesArrayValidator(fixedDueDateSchedule, prevErrors);

        it('should contains data of previous errors', () => {
          expect(result).toEqual(expect.objectContaining(prevErrors));
        });

        describe('"schedules"', () => {
          it('should be an empty array', () => {
            expect(result.schedules).toEqual([]);
          });
        });
      });
    });
  });
});
