// eslint-disable-next-line max-classes-per-file
import noticePolicyValidator from './notice-policy';
import FormValidator from '../engine/FormValidator';
import loanNotices from './loan-notices';
import requestNotices from './request-notices';
import feeFineNotices from './fee-fine-notices';
import { NoticePolicy } from '../../Models/NoticePolicy';
import { GENERAL_NAME_FIELD_VALIDATION_PROPS } from '../../../constants/Validation/general';

jest.mock('../../Models/NoticePolicy');
jest.mock('../engine/FormValidator');
jest.mock('./loan-notices');
jest.mock('./request-notices');
jest.mock('./fee-fine-notices');

describe('noticePolicyValidator', () => {
  const policy = {};
  const validate = jest.fn();
  const noticePolicyInstance = { test: 'noticePolicy' };
  const formValidatorInstance = {
    test: 'formValidator',
    validate,
  };

  beforeAll(() => {
    NoticePolicy.mockImplementation(jest.fn(() => noticePolicyInstance));
    FormValidator.mockImplementation(jest.fn(() => formValidatorInstance));
    noticePolicyValidator(policy);
  });

  it('should trigger "NoticePolicy" class with correct argument', () => {
    expect(NoticePolicy).toHaveBeenCalledWith(policy);
  });

  it('should trigger "loanNotices" with correct argument', () => {
    expect(loanNotices).toHaveBeenCalledWith(noticePolicyInstance);
  });

  it('should trigger "requestNotices" with correct argument', () => {
    expect(requestNotices).toHaveBeenCalledWith(noticePolicyInstance);
  });

  it('should trigger "feeFineNotices" with correct argument', () => {
    expect(feeFineNotices).toHaveBeenCalledWith(noticePolicyInstance);
  });

  it('should trigger "FormValidator" with correct arguments', () => {
    expect(FormValidator).toHaveBeenCalledWith(expect.objectContaining({
      ...GENERAL_NAME_FIELD_VALIDATION_PROPS,
    }));
  });

  it('should trigger "validate" with correct props', () => {
    expect(validate).toHaveBeenCalledWith(noticePolicyInstance);
  });
});
