import {
  interactor,
  isPresent,
  count
} from '@bigtest/interactor';

@interactor class StaffSlipSettings {
  hasList = isPresent('[data-test-nav-list]');
  staffSlipCount = count('[data-test-nav-list] a');
}

export default new StaffSlipSettings('#ModuleContainer div div section');
