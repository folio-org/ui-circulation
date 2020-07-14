import {
  clickable,
  interactor,
  isPresent,
} from '@bigtest/interactor';

@interactor class DeleteConfirmationModal {
  static defaultScope = ('#deletefixedduedateschedule-confirmation');

  isOpen = isPresent('#deletefixedduedateschedule-confirmation');
  clickCancel = clickable('[data-test-confirmation-modal-cancel-button]');
  clickDelete = clickable('[data-test-confirmation-modal-confirm-button]');
}

export default DeleteConfirmationModal;
