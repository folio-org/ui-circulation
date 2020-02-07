import {
  count,
  isPresent,
  interactor,
  collection,
} from '@bigtest/interactor';

import NoticeCard from './notice-card';

@interactor class NoticesSection {
  hasCards = isPresent('[data-test-notice-card]');
  cardsCount = count('[data-test-notice-card]');
  loanNotices = collection('[data-test-notice-card]', NoticeCard);
  requestNotices = collection('data-test-notice-card', NoticeCard);

  addCard() {
    return this.click('button[data-test-add-notice-card]');
  }
}

export default NoticesSection;
