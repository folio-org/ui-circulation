import {
  interactor,
  isPresent,
  count
} from '@bigtest/interactor';

@interactor class FinePolicySettings {
  hasList = isPresent('[data-test-nav-list]');
  policiesCount = count('[data-test-nav-list] a');
}

export default new FinePolicySettings('#ModuleContainer div div section');
