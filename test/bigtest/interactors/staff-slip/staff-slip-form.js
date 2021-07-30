import {
  interactor,
  isPresent,
  fillable,
  clickable,
  value
} from '@bigtest/interactor';

import TextAreaInteractor from '@folio/stripes-components/lib/TextArea/tests/interactor';

@interactor class StaffSlipForm {
  isLoaded = isPresent('#template-editor');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  description = new TextAreaInteractor('[data-test-staff-slip-description]');
  hasDescription = isPresent('#input-staff-slip-description');
  descValue = value('#input-staff-slip-description');

  hasSaveButton = isPresent('#footer-save-entity');

  fillDescription = fillable('#input-staff-slip-description');
  fillEditor = fillable('#template-editor');

  save = clickable('#footer-save-entity');
}

export default new StaffSlipForm('#form-staff-slip');
