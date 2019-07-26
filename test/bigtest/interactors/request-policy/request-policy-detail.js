import {
  interactor,
  isPresent,
  text,
  Interactor,
  scoped,
  clickable
} from '@bigtest/interactor';

import KeyValue from '../KeyValue';

@interactor class GeneralSection {
  static defaultScope = ('#general');

  name = new KeyValue('[data-request-policy-name] div');
  content = scoped('[class^="content-"]');
  toggleAccodion = clickable('button');
}

@interactor class RequestPolicyDetail {
  hasName = isPresent('[data-request-policy-name]');
  name = text('[data-request-policy-name] div:nth-child(2)');

  deleteRequestPolicy = new Interactor('#dropdown-clickable-delete-item');
  entityInUseModal = new Interactor('#prohibit-item-delete');
  entityInUseConfirm = new Interactor('[data-test-prohibit-delete-modal-close-button]');

  expandAll = scoped('[data-test-expand-all] button');
  generalSection = new GeneralSection();
}

export default new RequestPolicyDetail('[data-test-request-policy-detail]');
