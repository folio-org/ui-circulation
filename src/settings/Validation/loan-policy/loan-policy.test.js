import LoanPolicy from '../../Models/LoanPolicy';
import FormValidator from '../engine/FormValidator';
import loans from './loans';
import renewals from './renewals';
import requests from './request-management';
import loanPolicyValidator from './loan-policy';
import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

jest.mock('../../Models/LoanPolicy');
jest.mock('../engine/FormValidator');
jest.mock('./loans');
jest.mock('./renewals');
jest.mock('./request-management');

describe('loanPolicyValidator', () => {
  const policy = {};
  const validate = jest.fn();
  const loanPolicyInstance = { test: 'loanPolicy' };
  const formValidatorInstance = {
    test: 'formValidator',
    validate,
  };

  beforeAll(() => {
    LoanPolicy.mockImplementation(jest.fn(() => loanPolicyInstance));
    FormValidator.mockImplementation(jest.fn(() => formValidatorInstance));
    loanPolicyValidator(policy);
  });

  it('should trigger "LoanPolicy" class with "policy" argument', () => {
    expect(LoanPolicy).toHaveBeenCalledWith(policy);
  });

  it('should trigger "loans" with "LoanPolicy" instance', () => {
    expect(loans).toHaveBeenCalledWith(loanPolicyInstance);
  });

  it('should trigger "renewals" with "LoanPolicy" instance', () => {
    expect(renewals).toHaveBeenCalledWith(loanPolicyInstance);
  });

  it('should trigger "requests" with "LoanPolicy" instance', () => {
    expect(requests).toHaveBeenCalledWith(loanPolicyInstance);
  });

  it('should trigger "FormValidator" class with "config" argument', () => {
    expect(FormValidator).toHaveBeenCalledWith(expect.objectContaining({
      ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    }));
  });

  it('should trigger "validate" with "policy" argument', () => {
    expect(validate).toHaveBeenCalledWith(policy);
  });
});
