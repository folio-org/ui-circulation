import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import SelectInteractor from '@folio/stripes-components/lib/Select/tests/interactor';

import OverdueDurationSection from './overdue-duration-section';
import OverdueRecallSection from './overdue-recall-section';

@interactor class OverdueFineSection {
  static defaultScope = ('[data-test-fine-policy-form-overdue-fines-section]');

  header = scoped('[data-test-overdue-fines-section-header]');
  overdue = new OverdueDurationSection();
  overdueRecall = new OverdueRecallSection('[data-test-fine-section-overdue]');
  countClosed = new SelectInteractor('[data-test-fine-section-count-closed]');
  maxOverdue = new TextFieldInteractor('[data-test-fine-section-max-overdue]')
  forgiveOverdue = new SelectInteractor('[data-test-fine-section-forgive-overdue]');
  overdueRecall = new OverdueDurationSection('[data-test-fine-section-overdue-recall]');
  gracePeriodRecall = new SelectInteractor('[data-test-fine-section-grace-period-recall]');
  maxOverdueRecall = new TextFieldInteractor('[data-test-fine-section-max-overdue-recall]')
}

export default OverdueFineSection;
