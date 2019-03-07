import {
  clickable, collection, count,
  interactor, isPresent,
  scoped, text, Interactor
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

@interactor class GeneralSection {
  static defaultScope = ('[data-test-notice-policy-form-general-section]');

  policyName = new TextFieldInteractor('[data-test-general-section-policy-name]');
  active = new CheckboxInteractor('[data-test-general-section-active]');
  policyDescription = new TextFieldInteractor('[data-test-general-section-policy-description]');

  content = scoped('[class^="content-"]');
}

@interactor class NoticeCard {
  static defaultScope = ('[data-test-notice-card]');

  header = text('[data-test-notice-card]');
  delete = clickable('[data-test-notice-card-remove]');
  templateId = new SelectInteractor('[data-test-notice-card-template-id]');
  viaText = scoped('[data-test-notice-card-via-text]');
  format = new SelectInteractor('[data-test-notice-card-format]');
  frequency = new SelectInteractor('[data-test-notice-card-frequency]');
  eventLabel = scoped('[data-test-notice-card-event-label]');
  sendHow = new SelectInteractor('[data-test-notice-card-send-how] div');
  sendWhen = new SelectInteractor('[data-test-notice-card-send-when] div');
  sendByDuration = new SelectInteractor('[data-test-notice-card-send-by-duration]');
  sendByIntervalId = new SelectInteractor('[data-test-notice-card-send-by-interval-id]');
  sendByLabel = scoped('[data-test-notice-card-send-by-label]');
  sendEveryDuration = new SelectInteractor('[data-test-notice-card-send-every-duration]');
  sendEveryIntervalId = new SelectInteractor('[data-test-notice-card-send-every-interval-id]');
  sendEveryLabel = scoped('[data-test-notice-card-send-every-label]');
  realTime = new CheckboxInteractor('[data-test-notice-card-real-time] div');
}

@interactor class NoticesSection {
  hasCards = isPresent('[data-test-notice-card]');
  cardsCount = count('[data-test-notice-card]');
  loanNotices = collection('[data-test-notice-card]', NoticeCard);
  content = scoped('[class^="content-"]');

  addCard() {
    return this.click('button[data-test-add-notice-card]');
  }
}

@interactor class NoticePolicyForm {
  static defaultScope = ('[data-test-notice-policy-form]');

  whenLoaded(policyName) {
    return this.when(() => this.generalSection.scoped('#notice_policy_name').value === policyName);
  }

  generalSection = new GeneralSection();
  loanNoticesSection = new NoticesSection('[data-test-notice-policy-form-loan-notices-section]');
  requestNoticesSection = new NoticesSection('[data-test-notice-policy-form-request-notices-section]');
  deleteNoticePolicy = new Interactor('[data-test-cancel-user-form-action]');
  deleteNoticePolicyModal = new Interactor('#delete-item-confirmation');
  deleteNoticePolicyCancel= new Interactor('[data-test-confirmation-modal-cancel-button]');
  deleteNoticePolicyConfirm = new Interactor('[data-test-confirmation-modal-confirm-button]');

  save = clickable('#clickable-save-entry');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new NoticePolicyForm();
