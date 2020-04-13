import FormValidator from '../engine/FormValidator';
import general from './general';
import loanNotices from './loan-notices';
import requestNotices from './request-notices';
import feeFineNotices from './fee-fine-notices'
import { NoticePolicy } from '../../Models/NoticePolicy';

export default function (policy) {
  const noticePolicy = new NoticePolicy(policy);
  const config = {
    ...general(),
    ...loanNotices(noticePolicy),
    ...requestNotices(noticePolicy),
    ...feeFineNotices(noticePolicy),
  };
  const formValidator = new FormValidator(config);

  return formValidator.validate(noticePolicy);
}
