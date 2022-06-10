import FinePolicy from '../../Models/FinePolicy';
import FormValidator from '../engine/FormValidator';
import fines from './fines';

const finePolicyValidator = (policy) => {
  const finePolicy = new FinePolicy(policy);

  const config = {
    ...fines(finePolicy),
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(policy);
};

export default finePolicyValidator;
