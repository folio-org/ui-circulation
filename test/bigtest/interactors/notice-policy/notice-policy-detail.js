import {
  interactor,
  isPresent,
  count,
  collection,
  text,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';
import KeyValue from '../KeyValue';

@interactor class NoticeCard {
  static defaultScope = ('[data-test-notice-card]');

  templateId = new KeyValue('[data-test-notice-card-template-id] div');
  viaText = new KeyValue('[data-test-notice-card-via-text] div');
  format = new KeyValue('[data-test-notice-card-format] div');
  frequency = new KeyValue('[data-test-notice-card-frequency]');
  frequencyLabel = new KeyValue('[data-test-notice-card-frequency-label] div div');
  eventText = new KeyValue('[data-test-notice-card-event-text] div');
  triggeringEvent = new KeyValue('[data-test-notice-card-triggering-event] div');
  sendHow = new KeyValue('[data-test-notice-card-send-how] div');
  sendWhen = new KeyValue('[data-test-notice-card-send-when] div');
  byText = text('[data-test-notice-card-by-text] div');
  sendByDuration = new KeyValue('[data-test-notice-card-send-by-duration] div');
  sendByIntervalId = new KeyValue('[data-test-notice-card-send-by-interval-id] div');
  sendEveryDuration = new KeyValue('[data-test-notice-card-send-every-duration] div');
  sendEveryIntervalId = new KeyValue('[data-test-notice-card-send-every-interval-id] div');
  sendEveryLabel = text('[ data-test-notice-card-send-every-label] div div');
  realTime = new KeyValue('[data-test-notice-card-real-time] div');
}

@interactor class GeneralSection {
  static defaultScope = ('[data-test-notice-policy-detail-general-section]');

  name = new KeyValue('[data-notice-policy-name] div');
  description = new KeyValue('[data-notice-policy-description] div');
  active = new KeyValue('[data-notice-policy-active] div');
}

@interactor class LoanNoticesSection {
  static defaultScope = ('[data-test-notice-policy-detail-loan-notices-section]');

  hasCards = isPresent('[data-test-notice-card]');
  cardsCount = count('[data-test-notice-card]');

  loanNotices = collection('[data-test-notice-card]', NoticeCard);
}

@interactor class RequestNoticesSection {
  static defaultScope = ('[data-test-notice-policy-detail-request-notices-section]');

  hasCards = isPresent('[data-test-notice-card]');
  cardsCount = count('[data-test-notice-card]');

  requestNotices = collection('[data-test-notice-card]', NoticeCard);
}

@interactor class NoticePolicyDetail {
  generalSectionAccordion = new AccordionInteractor('#generalInformation');
  loanNoticesSectionAccordion = new AccordionInteractor('#loanNotices');
  requestNoticesSectionAccordion = new AccordionInteractor('#requestNotices');

  generalSection = new GeneralSection();
  loanNoticesSection = new LoanNoticesSection();
  requestNoticesSection = new RequestNoticesSection();

  expandAll = scoped('[data-test-expand-all] button');
}

export default new NoticePolicyDetail('[data-test-notice-policy-detail]');
