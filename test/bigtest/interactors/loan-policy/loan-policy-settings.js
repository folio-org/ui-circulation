import {
  interactor,
  isPresent,
  count
} from '@bigtest/interactor';

@interactor class LoanPolicySettings {
  hasList = isPresent('[data-test-nav-list]');
  policiesCount = count('[data-test-nav-list] a');
}

export default new LoanPolicySettings('#ModuleContainer div div section');
