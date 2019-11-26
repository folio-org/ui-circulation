import {
  interactor,
  isPresent,
  fillable,
  clickable,
  value
} from '@bigtest/interactor';

@interactor class StaffSlipForm {
  isLoaded = isPresent('#template-editor');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  hasDescription = isPresent('#input-staff-slip-description');
  descValue = value('#input-staff-slip-description');

  hasSaveButton = isPresent('#footer-save-entity');

  fillDescription = fillable('#input-staff-slip-description');
  fillEditor = fillable('#template-editor');

  save = clickable('#footer-save-entity');
}

export default new StaffSlipForm('#form-staff-slip');
