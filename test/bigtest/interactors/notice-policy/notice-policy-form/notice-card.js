import {
  text,
  scoped,
  clickable,
  interactor,
} from '@bigtest/interactor';

import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

import Period from '../../Period';

@interactor class NoticeCard {
  static defaultScope = ('[data-test-notice-card]');

  header = text('[data-test-notice-card]');
  delete = clickable('[data-test-notice-card-remove]');
  templateId = new SelectInteractor('[data-test-notice-card-template-id]');
  viaText = scoped('[data-test-notice-card-via-text]');
  format = new SelectInteractor('[data-test-notice-card-format]');
  frequency = new SelectInteractor('[data-test-notice-card-frequency]');
  frequencyLabel = new SelectInteractor('[data-test-notice-card-frequency-label]');
  triggeringEvent = new SelectInteractor('[data-test-notice-card-triggering-event]');
  eventLabel = scoped('[data-test-notice-card-event-label]');
  sendHow = new SelectInteractor('[data-test-notice-card-send-how] div');
  sendWhen = new SelectInteractor('[data-test-notice-card-send-when] div');
  sendBy = new Period('[data-test-notice-card-send-by]');
  sendByLabel = scoped('[data-test-notice-card-send-by-label]');
  sendEvery = new Period('[data-test-notice-card-send-every]');
  sendEveryLabel = scoped('[data-test-notice-card-send-every-label]');
  realTime = new CheckboxInteractor('[data-test-notice-card-real-time] div');
}

export default NoticeCard;
