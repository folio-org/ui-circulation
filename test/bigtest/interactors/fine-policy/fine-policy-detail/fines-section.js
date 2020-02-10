import { interactor } from '@bigtest/interactor';
import KeyValue from '../../KeyValue';

@interactor class FinesSection {
  static defaultScope = ('[data-test-fine-policy-detail-fines-section]');

  overdue = new KeyValue('[data-test-fines-section-overdue]');
  countClosed = new KeyValue('[data-test-fines-section-count-closed]');
  maxOverdue = new KeyValue('[data-test-fines-section-max-overdue]');
  forgiveOverdue = new KeyValue('[data-test-fines-section-forgive-overdue]');
  overdueRecall = new KeyValue('[data-test-fines-section-overdue-recall]');
  gracePeriod = new KeyValue('[data-test-fines-section-grace-period]');
  maxOverdueRecall = new KeyValue('[data-test-fines-section-max-overdue-recall]');
}

export default FinesSection;
