import {
  interactor,
  isPresent,
  fillable,
  clickable,
  value,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

@interactor class RequestPolicyForm {
  isLoaded = isPresent('[value="Request policy"]');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  hasName = isPresent('#request_policy_name');
  nameValue = value('#request_policy_name');
  hasDescription = isPresent('#request_policy_description');
  hasSaveButton = isPresent('#footer-save-entity');
  hasHoldCheckbox = isPresent('#hold-checkbox');
  pageCheckbox = scoped('#page-checkbox');
  recallCheckbox = scoped('#recall-checkbox');
  generalSectionAccordion = new AccordionInteractor('#general');
  generalAccordionToggleButton = scoped('#accordion-toggle-button-general');

  fillName = fillable('#request_policy_name');
  fillDescription = fillable('#request_policy_description');
  clickHoldCheckbox = clickable('#hold-checkbox');

  save = clickable('#footer-save-entity');
}

export default new RequestPolicyForm('[data-test-request-policy-form]');
