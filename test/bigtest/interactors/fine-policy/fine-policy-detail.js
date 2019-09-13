import {
  interactor,
  scoped,
} from '@bigtest/interactor';
import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import KeyValue from '../KeyValue';

@interactor class AboutSection {
  static defaultScope = ('[data-test-fine-policy-detail-about-section]');

  policyName = new KeyValue('[data-test-about-section-policy-name] div');
  policyDescription = new KeyValue('[data-test-about-section-policy-description] div');
}

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


@interactor class FinePolicyDetail {
  static defaultScope = ('[data-test-fine-policy-detail]');

  aboutSection = new AboutSection();
  finesSection = new FinesSection();

  overdueDetails = new AccordionInteractor('#fineSection');
  content = new AccordionInteractor('#generalInformation');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new FinePolicyDetail();
