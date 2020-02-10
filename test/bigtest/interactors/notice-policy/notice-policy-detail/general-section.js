import { interactor } from '@bigtest/interactor';

import KeyValue from '../../KeyValue';

@interactor class GeneralSection {
  static defaultScope = ('[data-test-notice-policy-detail-general-section]');

  name = new KeyValue('[data-notice-policy-name] div');
  description = new KeyValue('[data-notice-policy-description] div');
  active = new KeyValue('[data-notice-policy-active] div');
}

export default GeneralSection;
