import { interactor } from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import CheckboxInteractor from '@folio/stripes-components/lib/Checkbox/tests/interactor';

@interactor class GeneralSection {
  policyName = new TextFieldInteractor('[data-test-general-section-policy-name]');
  active = new CheckboxInteractor('[data-test-general-section-active]');
  policyDescription = new TextFieldInteractor('[data-test-general-section-policy-description]');
}

export default GeneralSection;
