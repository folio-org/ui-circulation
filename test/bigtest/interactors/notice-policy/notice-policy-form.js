import {
  text,
  count,
  scoped,
  isPresent,
  clickable,
  interactor,
  collection,
  Interactor,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import Period from '../Period';

@interactor class GeneralSection {
  static defaultScope = ('[data-test-notice-policy-form-general-section]');

  policyName = new TextFieldInteractor('[data-test-general-section-policy-name]');
  active = new CheckboxInteractor('[data-test-general-section-active]');
  policyDescription = new TextFieldInteractor('[data-test-general-section-policy-description]');
}

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

@interactor class NoticesSection {
  hasCards = isPresent('[data-test-notice-card]');
  cardsCount = count('[data-test-notice-card]');
  loanNotices = collection('[data-test-notice-card]', NoticeCard);
  requestNotices = collection('data-test-notice-card', NoticeCard);

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
  deleteNoticePolicy = new Interactor('[data-test-delete-user-form-action]');
  deleteNoticePolicyModal = new Interactor('#delete-item-confirmation');
  deleteNoticePolicyCancel= new Interactor('[data-test-confirmation-modal-cancel-button]');
  deleteNoticePolicyConfirm = new Interactor('[data-test-confirmation-modal-confirm-button]');
  cancelEditingNoticePolicy = new Interactor('[data-test-cancel-user-form-action]');
  cancelEditingNoticePolicyModal = new Interactor('#cancel-editing-confirmation');
  generalSectionAccordion = new AccordionInteractor('#general');
  loanNoticesSectionAccordion = new AccordionInteractor('#loanNotices');
  requestNoticesSectionAccordion = new AccordionInteractor('#requestNotices');

  save = clickable('#clickable-save-entry');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new NoticePolicyForm();
