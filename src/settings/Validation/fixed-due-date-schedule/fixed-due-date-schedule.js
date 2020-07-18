import FormValidator from '../engine/FormValidator';
import FixedDueDateSchedule from '../../Models/FixedDueDateSchedule';
import schedulesArrayValidator from './schedules';

export default function (schedule) {
  const fixedDueDateSchedule = new FixedDueDateSchedule(schedule);

  const config = {
    'name': {
      rules: ['isNotEmpty'],
      shouldValidate: true,
    },
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
}
