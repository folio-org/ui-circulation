import {
  interactor,
  scoped,
  Interactor,
  clickable,
  collection,
  property,
  hasClass,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';
import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

@interactor class AvailableTokens {
  items = collection('input[type="checkbox"]');
}

@interactor class TokensModal {
  defaultScope = '[data-test-template-editor-tokens-modal]';

  addTokensBtn = scoped('[data-test-add-tokens]');
  cancelBtn = scoped('[data-test-close-tokens-modal]');
  availbaleTokens = collection('[data-test-available-tokens]', AvailableTokens);
  multipleTokens = scoped('[data-test-multiple-tokens]');

  isAddTokenBtnDisabled = property('[data-test-add-tokens]', 'disabled');
}

@interactor class PatronNoticeForm {
  static defaultScope = ('[data-test-patron-notice-form]');

  whenLoaded() {
    return this.when(() => this.templateName.isPresent);
  }

  templateName = new TextFieldInteractor('[data-test-patron-notice-template-name]');
  hasTemplateNameError = hasClass('div[role="alert"]');
  templateCategory = new SelectInteractor('[data-test-template-category]');
  templateBody = new Interactor('#template-editor');
  indentBtn = new Interactor('[data-test-increase-indent]');
  errorContainer = new Interactor('#patron-notice-error-container');
  save = clickable('#footer-save-entity');

  showAvailbaleTokensBtn = new Interactor('[data-test-teplate-editor-tokens]');
  tokensModal = new TokensModal();
  emaillSectionAccordion = new AccordionInteractor('#email-template');
}

export default new PatronNoticeForm();
