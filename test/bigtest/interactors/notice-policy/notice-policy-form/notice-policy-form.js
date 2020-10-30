import {
  scoped,
  clickable,
  interactor,
  Interactor,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import GeneralSection from './general-section';
import NoticesSection from './notices-section';

@interactor class NoticePolicyForm {
  static defaultScope = ('[data-test-notice-policy-form]');

  whenLoaded(policyName) {
    return this.when(() => this.generalSection.scoped('#notice_policy_name').value === policyName);
  }

  generalSection = new GeneralSection();
  loanNoticesSection = new NoticesSection('[data-test-notice-policy-form-loan-notices-section]');
  requestNoticesSection = new NoticesSection('[data-test-notice-policy-form-request-notices-section]');
  cancelEditingNoticePolicy = new Interactor('#footer-cancel-entity');
  cancelEditingNoticePolicyModal = new Interactor('#cancel-editing-confirmation');
  generalSectionAccordion = new AccordionInteractor('#general');
  loanNoticesSectionAccordion = new AccordionInteractor('#editLoanNotices');
  requestNoticesSectionAccordion = new AccordionInteractor('#editRequestNotices');

  save = clickable('#footer-save-entity');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new NoticePolicyForm({ timeout: 5000 });
