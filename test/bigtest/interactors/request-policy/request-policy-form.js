import {
  interactor,
  isPresent,
  fillable,
  clickable,
  value,
  scoped,
  text,
  blurrable,
  focusable,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

@interactor class RequestPolicyForm {
  isLoaded = isPresent('input[value]:not([value=""])');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  hasName = isPresent('#request_policy_name');
  nameValue = value('#request_policy_name');
  hasDescription = isPresent('#request_policy_description');
  hasSaveButton = isPresent('#footer-save-entity');
  hasHoldCheckbox = isPresent('#hold-checkbox');
  hasValidationError = isPresent('[class^="feedbackError---"]');
  validationMessage = text('[class^="feedbackError---"]');
  pageCheckbox = scoped('#page-checkbox');
  recallCheckbox = scoped('#recall-checkbox');
  generalSectionAccordion = new AccordionInteractor('#generalRequestPolicyForm');
  generalAccordionToggleButton = scoped('#accordion-toggle-button-generalRequestPolicyForm');

  fillName = fillable('#request_policy_name');
  focusName = focusable('#request_policy_name');
  blurName = blurrable('#request_policy_name');
  fillDescription = fillable('#request_policy_description');
  clickHoldCheckbox = clickable('#hold-checkbox');

  save = clickable('#footer-save-entity');
}

export default new RequestPolicyForm('[data-test-request-policy-form]');
