import FinePolicy from '../../Models/FinePolicy';
import FormValidator from '../engine/FormValidator';
import fines from './fines';
import reminderFeesPolicy from '../reminder-fees-policy/reminder-fees-policy';

const finePolicyValidator = (policy) => {
  const finePolicy = new FinePolicy(policy);
  const config = {
    ...fines(finePolicy),
    ...reminderFeesPolicy(finePolicy.reminderFeesPolicy),
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(policy);
};

export default finePolicyValidator;
