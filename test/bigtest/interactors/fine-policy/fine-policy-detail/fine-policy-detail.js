import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import FinesSection from './fines-section';
import AboutSection from './about-section';

@interactor class FinePolicyDetail {
  static defaultScope = ('[data-test-fine-policy-detail]');

  aboutSection = new AboutSection();
  finesSection = new FinesSection();

  overdueDetails = new AccordionInteractor('#fineSection');
  content = new AccordionInteractor('#generalInformation');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new FinePolicyDetail();
