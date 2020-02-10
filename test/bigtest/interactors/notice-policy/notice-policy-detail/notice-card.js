import {
  interactor,
  text,
} from '@bigtest/interactor';

import KeyValue from '../../KeyValue';

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

export default NoticeCard;
