import {
  interactor,
  isPresent,
  fillable,
  clickable,
  value
} from '@bigtest/interactor';

@interactor class RequestPolicyForm {
  hasName = isPresent('#request_policy_name');
  nameValue = value('#request_policy_name');
  hasDescription = isPresent('#request_policy_description');
  hasSaveButton = isPresent('#clickable-save-entry');
  hasHoldCheckbox = isPresent('#hold-checkbox');

  fillName = fillable('#request_policy_name');
  fillDescription = fillable('#request_policy_description');
  clickHoldCheckbox = clickable('#hold-checkbox');

  save = clickable('#clickable-save-entry');
}

export default new RequestPolicyForm('[data-test-request-policy-form]');
