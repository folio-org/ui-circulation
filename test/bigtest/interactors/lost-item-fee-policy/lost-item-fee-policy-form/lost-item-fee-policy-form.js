import {
  clickable,
  interactor,
  scoped,
  Interactor,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';
import Button from '@folio/stripes-components/lib/Button/tests/interactor';

import AboutSection from './about-section';
import LostItemFeeSection from './lost-item-fee-section';

@interactor class LostItemFeePolicyForm {
  static defaultScope = ('[data-test-lost-item-fee-policy-form]');

  whenLoaded(policyName) {
    return this.when(() => this.aboutSection.scoped('#input-policy-name').value === policyName);
  }

  aboutSection = new AboutSection();
  lostItemFeeSection = new LostItemFeeSection();

  generalInformationAccordion = new AccordionInteractor('#lostItemFeegeneralSection');
  lostItemFeeAccordion = new AccordionInteractor('#lostItemFeeSectionOpen');

  expandAll = scoped('[data-test-expand-all] button');
  cancelEditingLostItemPolicy = new Interactor('#footer-cancel-entity');
  cancelEditingLostItemPolicyModal = new Interactor('#cancel-editing-confirmation');

  buttonNew = new Button('#clickable-create-entry');
  deleteLostItemCancelModal = new Button('#dropdown-clickable-cancel-item');

  save = clickable('#footer-save-entity');
}

export default new LostItemFeePolicyForm();
