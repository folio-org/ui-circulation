import {
  interactor,
  isPresent,
  count,
  collection,
} from '@bigtest/interactor';

import NoticeCard from './notice-card';

@interactor class RequestNoticesSection {
  static defaultScope = ('[data-test-notice-policy-detail-request-notices-section]');

  hasCards = isPresent('[data-test-notice-card]');
  cardsCount = count('[data-test-notice-card]');

  requestNotices = collection('[data-test-notice-card]', NoticeCard);
}

export default RequestNoticesSection;
