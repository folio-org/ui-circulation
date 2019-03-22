import {
  interactor,
  scoped,
} from '@bigtest/interactor';

@interactor class PatronNoticeForm {
  static defaultScope = ('[data-test-patron-notice-form]');

  expandAll = scoped('[data-test-expand-all] button')
}

export default new PatronNoticeForm();
