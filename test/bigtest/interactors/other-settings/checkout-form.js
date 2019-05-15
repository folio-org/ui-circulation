import {
  interactor,
  isPresent,
  clickable,
} from '@bigtest/interactor';

@interactor class CheckoutForm {
  isLoaded = isPresent('#barcode-checkbox');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  clickBarcodeCheckout = clickable('#barcode-checkbox');
  clickExternalSystemIdCheckbox = clickable('#externalSystemId-checkbox');
  clickIdCheckbox = clickable('#id-checkbox');
  clickUsernameCheckbox = clickable('#username-checkbox');
  calloutIsPresent = isPresent('div[class^="calloutBase---"]');
  save = clickable('#clickable-savescanid');
}

export default new CheckoutForm();
