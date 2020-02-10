import {
  interactor,
  clickable,
  isPresent
} from '@bigtest/interactor';

import { contains } from '../../helpers';
import KeyValue from '../../KeyValue';

import PreviewModal from './preview-modal';

@interactor class StaffSlipDetail {
  containsContent = contains('[data-test-staff-slip-content]');
  clickPreviewBtn = clickable('[data-test-open-preview-btn]');
  previewModal = new PreviewModal('#preview-modal');
  previewModalIsVisible = isPresent('#preview-modal');
  name = new KeyValue('[data-test-staff-slip-name] div');
}

export default new StaffSlipDetail();
