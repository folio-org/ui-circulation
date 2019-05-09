import {
  interactor,
  isPresent,
  text,
  Interactor
} from '@bigtest/interactor';

@interactor class RequestPolicyDetail {
  hasName = isPresent('[data-request-policy-name]');
  name = text('[data-request-policy-name] div:nth-child(2)');

  deleteRequestPolicy = new Interactor('#dropdown-clickable-delete-item');
  entityInUseModal = new Interactor('#prohibit-item-delete');
  entityInUseConfirm = new Interactor('[data-test-prohibit-delete-modal-close-button]');
}

export default new RequestPolicyDetail('[data-test-request-policy-detail]');
