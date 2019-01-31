import LoanPolicy from '../../Models/LoanPolicy';
import FormValidator from '../engine/FormValidator';
import about from './about';
import loans from './loans';
import renewals from './renewals';
import requests from './request-management';

export default function (policy) {
  const loanPolicy = new LoanPolicy(policy);

  const config = {
    ...about(),
    ...loans(loanPolicy),
    ...renewals(loanPolicy),
    ...requests(loanPolicy),
  };

  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
}
