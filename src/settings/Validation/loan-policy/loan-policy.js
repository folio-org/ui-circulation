import LoanPolicy from '../../Models/LoanPolicy';
import FormValidator from '../engine/FormValidator';
import loans from './loans';
import renewals from './renewals';
import requests from './request-management';

import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

const loanPolicyValidator = (policy) => {
  const loanPolicy = new LoanPolicy(policy);

  const config = {
    ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    ...loans(loanPolicy),
    ...renewals(loanPolicy),
    ...requests(loanPolicy),
  };

  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
};

export default loanPolicyValidator;
