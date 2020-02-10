import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import KeyValue from '../../KeyValue';

@interactor class AboutSection {
  static defaultScope = ('[data-test-loan-policy-detail-about-section]');

  header = scoped('[data-test-about-section-header]');
  policyName = new KeyValue('[data-test-about-section-policy-name] div');
  policyDescription = new KeyValue('[data-test-about-section-policy-description] div');
}

export default AboutSection;
