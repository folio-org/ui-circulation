import FormValidator from '../engine/FormValidator';
import general from './general';

export default function (policy) {
  const config = {
    ...general(),
  };
  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
}
