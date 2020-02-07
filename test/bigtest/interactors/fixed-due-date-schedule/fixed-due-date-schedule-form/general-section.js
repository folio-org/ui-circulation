import { interactor } from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';

@interactor class GeneralSection {
  static defaultScope = ('[data-test-fdds-form-general-section]');

  name = new TextFieldInteractor('[ data-test-general-section-name]');
  description = new TextFieldInteractor('[ data-test-general-section-description]');
}

export default GeneralSection;
