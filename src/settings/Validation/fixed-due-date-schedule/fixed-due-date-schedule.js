import FormValidator from '../engine/FormValidator';
import FixedDueDateSchedule from '../../Models/FixedDueDateSchedule';
import schedulesArrayValidator from './schedules';

import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

const fixedDueDateScheduleValidator = (schedule) => {
  const fixedDueDateSchedule = new FixedDueDateSchedule(schedule);

  const config = {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    ...fixedDueDateSchedule.schedules.reduce((validationConfig, item, index) => {
      const itemConfig = {
        [`schedules[${index}].from`]: {
          rules: ['isNotEmpty'],
          shouldValidate: true,
        },
        [`schedules[${index}].to`]: {
          rules: ['isNotEmpty', 'isToBeforeFrom'],
          shouldValidate: true,
          additionalData: {
            pathToSection: `schedules[${index}]`,
          },
        },
        [`schedules[${index}].due`]: {
          rules: ['isNotEmpty', 'isDueAfterTo'],
          shouldValidate: true,
          additionalData: {
            pathToSection: `schedules[${index}]`,
          },
        },
      };

      return { ...validationConfig, ...itemConfig };
    }, {}),
  };

  const formValidator = new FormValidator(config);

  return schedulesArrayValidator(fixedDueDateSchedule, formValidator.validate(fixedDueDateSchedule));
};

export default fixedDueDateScheduleValidator;
