import { interactor } from '@bigtest/interactor';

import KeyValue from '../../KeyValue';

@interactor class AboutSection {
  static defaultScope = ('[data-test-fine-policy-detail-about-section]');

  policyName = new KeyValue('[data-test-about-section-policy-name] div');
  policyDescription = new KeyValue('[data-test-about-section-policy-description] div');
}

export default AboutSection;
