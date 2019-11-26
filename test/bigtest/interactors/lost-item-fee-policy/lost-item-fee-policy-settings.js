import {
  interactor,
  isPresent,
  count
} from '@bigtest/interactor';

@interactor class LostItemFeePolicySettings {
  hasList = isPresent('[data-test-nav-list]');
  policiesCount = count('[data-test-nav-list] a');
}

export default new LostItemFeePolicySettings('#ModuleContainer div div section');
