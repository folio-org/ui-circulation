import {
  interactor,
  isPresent,
  count
} from '@bigtest/interactor';

@interactor class NoticePolicySettings {
  hasList = isPresent('[data-test-nav-list]');
  policiesCount = count('[data-test-nav-list] a');
}

export default new NoticePolicySettings('#ModuleContainer div div section');
