import {
  interactor,
  clickable,
  isPresent
} from '@bigtest/interactor';

import { contains } from '../helpers';

@interactor class PreviewModal {
  isLoaded = isPresent('#clickable-close-preview');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  barcodeIsPresent = isPresent('barcode');
  clickCloseBtn = clickable('#clickable-close-preview');
  clickPrintBtn = clickable('#print-preview-button');
}

@interactor class StaffSlipDetail {
  containsContent = contains('[data-test-staff-slip-content]');
  clickPreviewBtn = clickable('[data-test-open-preview-btn]');
  previewModal = new PreviewModal('#preview-modal');
  previewModalIsVisible = isPresent('#preview-modal');
}

export default new StaffSlipDetail();
