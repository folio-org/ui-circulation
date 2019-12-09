import {
  interactor,
  clickable,
  isPresent
} from '@bigtest/interactor';

import { contains } from '../helpers';
import KeyValue from '../KeyValue';

@interactor class PreviewModal {
  isLoaded = isPresent('[data-test-close-tokens-modal]');
  whenLoaded() {
    return this.when(() => this.isLoaded).timeout(5000);
  }

  barcodeIsPresent = isPresent('barcode');
  clickCloseBtn = clickable('[data-test-close-tokens-modal]');
  clickPrintBtn = clickable('[data-test-print-modal-template]');
}

@interactor class StaffSlipDetail {
  containsContent = contains('[data-test-staff-slip-content]');
  clickPreviewBtn = clickable('[data-test-open-preview-btn]');
  previewModal = new PreviewModal('#preview-modal');
  previewModalIsVisible = isPresent('#preview-modal');
  name = new KeyValue('[data-test-staff-slip-name] div');
}

export default new StaffSlipDetail();
