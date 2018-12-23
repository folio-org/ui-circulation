import LoanPolicy from '../Models/LoanPolicy';
import FormValidator from './FormValidator';

export default function (policy) {
  const loanPolicy = new LoanPolicy(policy);

  const config = {
    'name': {
      type: 'isNotEmpty',
      shouldValidate: true,
    },
    'loansPolicy.period.duration': {
      type: 'isNotEmpty',
      shouldValidate: loanPolicy.isProfileRolling(),
    },
    'loansPolicy.fixedDueDateScheduleId': {
      type: 'isNotEmpty',
      shouldValidate: loanPolicy.isProfileFixed(),
    },
    'loansPolicy.openingTimeOffset.duration': {
      type: 'isNotEmpty',
      shouldValidate: loanPolicy.isOpeningTimeOffsetActive(),
    },
    'renewalsPolicy.numberAllowed': {
      type: 'isNotEmpty',
      shouldValidate: loanPolicy.isNumberOfRenewalsAllowedActive(),
    },
  };
  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
}
