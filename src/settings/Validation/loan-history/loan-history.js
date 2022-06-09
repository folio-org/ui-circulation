import LoanHistoryModel from '../../Models/LoanHistoryModel';
import FormValidator from '../engine/FormValidator';
import general from './general';
import loanExceptions from './loan-exceptions';

const loanHistoryValidator = (data) => {
  const formData = new LoanHistoryModel(data);
  const sectionKey = 'loanExceptions';
  const config = {
    ...general(formData),
    ...loanExceptions(formData, sectionKey),
  };

  const formValidator = new FormValidator(config);

  return formValidator.validate(formData);
};

export default loanHistoryValidator;
