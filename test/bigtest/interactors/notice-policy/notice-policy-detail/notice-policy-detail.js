import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import GeneralSection from './general-section';
import LoanNoticesSection from './loan-notices-section';
import RequestNoticesSection from './request-notices-section';

@interactor class NoticePolicyDetail {
  generalSectionAccordion = new AccordionInteractor('#generalInformation');
  loanNoticesSectionAccordion = new AccordionInteractor('#loanNotices');
  requestNoticesSectionAccordion = new AccordionInteractor('#requestNotices');

  generalSection = new GeneralSection();
  loanNoticesSection = new LoanNoticesSection();
  requestNoticesSection = new RequestNoticesSection();

  expandAll = scoped('[data-test-expand-all] button');
}

export default new NoticePolicyDetail({
  scope: '[data-test-notice-policy-detail]',
  timeout: 5000,
});
