import FormValidator from '../engine/FormValidator';
import loanNotices from './loan-notices';
import requestNotices from './request-notices';
import feeFineNotices from './fee-fine-notices';
import { NoticePolicy } from '../../Models/NoticePolicy';

import { GENERAL_NAME_FIELD_PROPS } from '../../../constants/Validation/general';

export default function (policy) {
  const noticePolicy = new NoticePolicy(policy);
  const config = {
    ...GENERAL_NAME_FIELD_PROPS,
    ...loanNotices(noticePolicy),
    ...requestNotices(noticePolicy),
    ...feeFineNotices(noticePolicy),
  };
  const formValidator = new FormValidator(config);

  return formValidator.validate(noticePolicy);
}
