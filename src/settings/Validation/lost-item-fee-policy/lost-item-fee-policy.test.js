import LostItemFeePolicy from '../../Models/LostItemFeePolicy';
import FormValidator from '../engine/FormValidator';
import lostItemFee from './lost-item-fee';
import lostItemFeePolicyValidator from './lost-item-fee-policy';

jest.mock('../../Models/LostItemFeePolicy');
jest.mock('../engine/FormValidator');
jest.mock('./lost-item-fee');

describe('lostItemFeePolicyValidator', () => {
  const validate = jest.fn();
  const policy = {};
  const lostItemFeePolicyInstance = {
    test: 'lostItemFeePolicy'
  };
  const formValidatorInstance = {
    test: 'formValidator',
    validate,
  };

  beforeAll(() => {
    LostItemFeePolicy.mockImplementation(jest.fn(() => lostItemFeePolicyInstance));
    FormValidator.mockImplementation(jest.fn(() => formValidatorInstance));
    lostItemFee.mockImplementation(jest.fn());
    lostItemFeePolicyValidator(policy);
  });

  it('should trigger "LostItemFeePolicy" with "policy"', () => {
    expect(LostItemFeePolicy).toHaveBeenCalledWith(policy);
  });

  it('should trigger "lostItemFee" with instance of "LostItemFeePolicy"', () => {
    expect(lostItemFee).toHaveBeenCalledWith(lostItemFeePolicyInstance);
  });

  it('should trigger "FormValidator" with "config"', () => {
    expect(FormValidator).toHaveBeenCalledWith({});
  });

  it('should trigger "validate" with "policy"', () => {
    expect(validate).toHaveBeenCalledWith(policy);
  });
});
