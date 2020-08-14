import {
  clickable,
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import AboutSection from './about-section';
import OverdueFineSection from './overdue-fine-section';

@interactor class FinePolicyForm {
  static defaultScope = ('[data-test-fine-policy-form]');

  whenLoaded(policyName) {
    return this.when(() => this.aboutSection.scoped('#input-policy-name').value === policyName);
  }

  aboutSection = new AboutSection();
  overdueFineSection = new OverdueFineSection();

  generalAccordion = new AccordionInteractor('#overdueGeneralSection');
  overdueAccordion = new AccordionInteractor('#editFineSection');
  expandAll = scoped('[data-test-expand-all] button');
  cancelEditingFinePolicy = new Interactor('#footer-cancel-entity');
  cancelEditingFinePolicyModal = new Interactor('#cancel-editing-confirmation');

  save = clickable('#footer-save-entity');
}

export default new FinePolicyForm();
