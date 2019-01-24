import {
  interactor,
  isPresent,
  count
} from '@bigtest/interactor';

@interactor class RequestPolicySettings {
  hasList = isPresent('[data-test-nav-list]');
  policiesCount = count('[data-test-nav-list] a');
}

export default new RequestPolicySettings('#ModuleContainer div div section');
