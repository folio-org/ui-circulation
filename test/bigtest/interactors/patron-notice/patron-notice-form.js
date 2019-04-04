import {
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';

@interactor class PatronNoticeForm {
  static defaultScope = ('[data-test-patron-notice-form]');

  whenLoaded() {
    return this.when(() => this.templateName.isPresent);
  }

  expandAll = scoped('[data-test-expand-all] button');
  templateName = new TextFieldInteractor('[data-test-patron-notice-template-name]');
  deletePatronNoticeTemplate = new Interactor('[data-test-delete-patron-notice-form-action]');
  deletePatronNoticeTemplateModal = new Interactor('#delete-item-confirmation');
  cancelEditingPatronNoticeTemplate = new Interactor('[data-test-cancel-patron-notice-form-action]');
  cancelEditingPatronNoticeTempateModal = new Interactor('#cancel-editing-confirmation');
}

export default new PatronNoticeForm();
