import {
  interactor,
  isPresent,
  text
} from '@bigtest/interactor';

@interactor class RequestPolicyDetail {
  hasName = isPresent('[data-request-policy-name]');
  name = text('[data-request-policy-name] div:nth-child(2)');
}

export default new RequestPolicyDetail('[data-test-request-policy-detail]');
