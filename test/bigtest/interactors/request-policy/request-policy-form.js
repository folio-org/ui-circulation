import {
  interactor,
  Interactor,
  isPresent,
  fillable,
  clickable,
  value
} from '@bigtest/interactor';

@interactor class RequestPolicyForm {
  isLoaded = isPresent('[value="Request policy"]');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  hasName = isPresent('#request_policy_name');
  nameValue = value('#request_policy_name');
  hasDescription = isPresent('#request_policy_description');
  hasSaveButton = isPresent('#clickable-save-entry');
  hasHoldCheckbox = isPresent('#hold-checkbox');

  fillName = fillable('#request_policy_name');
  fillDescription = fillable('#request_policy_description');
  clickHoldCheckbox = clickable('#hold-checkbox');

  deleteRequestPolicy = new Interactor('[data-test-delete-user-form-action]');
  cannotDeleteModal = new Interactor('[data-test-entity-in-use-modal]');
  cannotDeleteConfirm = new Interactor('[data-test-entity-in-use-modal-close]');

  save = clickable('#clickable-save-entry');
}

export default new RequestPolicyForm('[data-test-request-policy-form]');
