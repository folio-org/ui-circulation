import {
  interactor,
  Interactor,
  clickable,
  isPresent,
  text,
  fillable,
  focusable,
  blurrable,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import TokensModal from './tokens-modal';

@interactor class PatronNoticeForm {
  static defaultScope = ('[data-test-patron-notice-form]');

  whenLoaded() {
    return this.when(() => this.templateName.isPresent).timeout(5000);
  }

  templateName = new TextFieldInteractor('[data-test-patron-notice-template-name]');
  templateCategory = new SelectInteractor('[data-test-template-category]');
  templateBody = new Interactor('#template-editor');
  indentBtn = new Interactor('[data-test-increase-indent]');
  errorContainer = new Interactor('#patron-notice-error-container');
  save = clickable('#footer-save-entity');
  hasValidationError = isPresent('[class^="feedbackError---"]');
  validationMessage = text('[class^="feedbackError---"]');

  fillName = fillable('#input-patron-notice-name');
  focusName = focusable('#input-patron-notice-name');
  blurName = blurrable('#input-patron-notice-name');

  showAvailbaleTokensBtn = new Interactor('[data-test-teplate-editor-tokens]');
  tokensModal = new TokensModal();
  emaillSectionAccordion = new AccordionInteractor('#email-template');
}

export default new PatronNoticeForm({ timeout: 5000 });
