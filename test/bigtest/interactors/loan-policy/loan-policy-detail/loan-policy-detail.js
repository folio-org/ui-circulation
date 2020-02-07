import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import AboutSection from './about-section';
import LoansSection from './loans-section';
import RenewalsSection from './renewals-section';
import RequestManagementSection from './request-management-section';

@interactor class LoanPolicyDetail {
  static defaultScope = ('[data-test-loan-policy-detail]');

  aboutSection = new AboutSection();
  loansSection = new LoansSection();
  renewalsSection = new RenewalsSection();
  requestManagement = new RequestManagementSection();

  generalInformationAccordion = new AccordionInteractor('#generalInformation');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new LoanPolicyDetail();
