import {
  interactor,
  scoped,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';

@interactor class AboutSection {
  static defaultScope = ('[data-test-fine-policy-form-about-section]');

  policyName = new TextFieldInteractor('[data-test-about-section-policy-name]');
  policyDescription = new TextFieldInteractor('[data-test-about-section-policy-description]');
  policyNameValue = scoped('#input-policy-name');
}

export default AboutSection;
