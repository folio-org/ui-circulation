import {
  interactor,
  clickable,
  isPresent
} from '@bigtest/interactor';

@interactor class PreviewModal {
  isLoaded = isPresent('[data-test-close-tokens-modal]');
  whenLoaded() {
    return this.when(() => this.isLoaded).timeout(5000);
  }

  barcodeIsPresent = isPresent('barcode');
  clickCloseBtn = clickable('[data-test-close-tokens-modal]');
  clickPrintBtn = clickable('[data-test-print-modal-template]');
}

export default PreviewModal;
