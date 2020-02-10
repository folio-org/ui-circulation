import {
  interactor,
  isPresent,
  count,
  collection,
} from '@bigtest/interactor';

import NoticeCard from './notice-card';

@interactor class LoanNoticesSection {
  static defaultScope = ('[data-test-notice-policy-detail-loan-notices-section]');

  hasCards = isPresent('[data-test-notice-card]');
  cardsCount = count('[data-test-notice-card]');

  loanNotices = collection('[data-test-notice-card]', NoticeCard);
}

export default LoanNoticesSection;
