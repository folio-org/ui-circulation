import {
  clickable,
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import AboutSection from './about-section';
import LoansSection from './loans-section';
import RenewalsSection from './renewals-section';
import RequestManagementSection from './request-management-section';

@interactor class LoanPolicyForm {
  static defaultScope = ('[data-test-loan-policy-form]');

  whenLoaded(policyName) {
    return this.when(() => this.aboutSection.scoped('#input_policy_name').value === policyName);
  }

  aboutSection = new AboutSection();
  loansSection = new LoansSection();
  renewalsSection = new RenewalsSection();
  requestManagementSection = new RequestManagementSection();

  expandAll = scoped('[data-test-expand-all] button');
  cancelEditingLoanPolicy = new Interactor('#footer-cancel-entity');
  cancelEditingLoanPolicyModal = new Interactor('#cancel-editing-confirmation');

  generalSectionAccordion = new AccordionInteractor('#generalLoanPolicyForm');
  recallsSectionAccordion = new AccordionInteractor('#recallsSection');
  holdsSectionAccordion = new AccordionInteractor('#holdsSection');

  save = clickable('#footer-save-entity');
}

export default new LoanPolicyForm();
