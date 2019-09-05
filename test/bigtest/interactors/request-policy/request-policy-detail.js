import {
  interactor,
  isPresent,
  text,
  Interactor,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

@interactor class RequestPolicyDetail {
  hasName = isPresent('[data-request-policy-name]');
  name = text('[data-request-policy-name] div:nth-child(2)');

  deleteRequestPolicy = new Interactor('#dropdown-clickable-delete-item');
  entityInUseModal = new Interactor('#prohibit-item-delete');
  entityInUseConfirm = new Interactor('[data-test-prohibit-delete-modal-close-button]');

  expandAll = scoped('[data-test-expand-all] button');
  generalSectionAccordion = new AccordionInteractor('#general');
}

export default new RequestPolicyDetail('[data-test-request-policy-detail]');
