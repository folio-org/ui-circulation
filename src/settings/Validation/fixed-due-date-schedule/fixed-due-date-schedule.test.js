import fixedDueDateScheduleValidator from './fixed-due-date-schedule';

import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

jest.mock('../../Models/FixedDueDateSchedule', () => jest.fn((schedule) => ({ schedules: schedule })));
jest.mock('../engine/FormValidator', () => class {
  constructor(config) {
    this.config = config;
  }

  validate(schedule) {
    return {
      ...this.config,
      passedSchedule: schedule,
      hasBeenValidate: true,
    };
  }
});
jest.mock('./schedules', () => jest.fn((fixedDueDateSchedule, scheduleAfterValidate) => ({
  fixedDueDateSchedule,
  scheduleAfterValidate,
})));

describe('fixedDueDateScheduleValidator', () => {
  const testSchedule = ['firstTestData', 'secondTestData'];

  it('should correctly process passed schedule', () => {
    const expectedResult = {
      fixedDueDateSchedule: {
        schedules: testSchedule,
      },
      scheduleAfterValidate: {
        hasBeenValidate: true,
        ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
        passedSchedule: {
          schedules: testSchedule,
        },
        ...testSchedule.reduce((validationConfig, item, index) => {
          const itemConfig = {
            [`schedules[${index}].from`]: expect.objectContaining({
              shouldValidate: true,
            }),
            [`schedules[${index}].to`]: expect.objectContaining({
              shouldValidate: true,
              additionalData: {
                pathToSection: `schedules[${index}]`,
              },
            }),
            [`schedules[${index}].due`]: expect.objectContaining({
              shouldValidate: true,
              additionalData: {
                pathToSection: `schedules[${index}]`,
              },
            }),
          };

          return { ...validationConfig, ...itemConfig };
        }, {}),
      },
    };

    expect(fixedDueDateScheduleValidator(testSchedule)).toEqual(expectedResult);
  });
});
