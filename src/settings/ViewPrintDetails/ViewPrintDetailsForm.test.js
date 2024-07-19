import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Field,
} from 'react-final-form';

import { TitleManager } from '@folio/stripes/core';

import ViewPrintDetailsForm from './ViewPrintDetailsForm';
import { VIEW_PRINT_DETAILS_ENABLED } from '../../constants';

describe('ViewPrintDetailsForm', () => {
  const labelIds = {
    generalTitle: 'ui-circulation.settings.title.general',
    viewPrintDetailsTitle: 'ui-circulation.settings.title.viewPrintDetails',
  };
  const mockedHandleSubmit = jest.fn();
  const defaultProps = {
    handleSubmit: mockedHandleSubmit,
    paneTitle: 'ui-circulation.settings.title.viewPrintDetails',
    pristine: true,
    submitting: false,
  };
  const mockedFormChange = jest.fn();
  const mockedForm = {
    getFieldState: jest.fn(() => ({
      value: true,
    })),
    change: mockedFormChange,
  };

  beforeEach(() => {
    render(
      <ViewPrintDetailsForm
        form={mockedForm}
        {...defaultProps}
      />
    );
  });

  it('should render pane title', () => {
    expect(screen.getByText('ui-circulation.settings.title.viewPrintDetails')).toBeInTheDocument();
  });

  it('should render View Print Details checkbox', () => {
    expect(screen.getByTestId('viewPrintDetailsCheckbox')).toBeInTheDocument();
  });

  it('should execute "Field" with correct props', () => {
    expect(Field).toHaveBeenCalledWith(expect.objectContaining({
      'data-testid': 'viewPrintDetailsCheckbox',
      label: 'ui-circulation.settings.ViewPrintDetails.enable',
      name: VIEW_PRINT_DETAILS_ENABLED,
      type: 'checkbox'
    }), {});
  });

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
      record: labelIds.viewPrintDetailsTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  describe('when form is submitting with enable print log', () => {
    it('should call "handleSubmit" on form submit', () => {
      fireEvent.submit(screen.getByRole('button', { name: 'stripes-core.button.save' }));
      expect(mockedHandleSubmit).toHaveBeenCalled();
    });
  });

  describe('when form is submitting with disable print log', () => {
    beforeEach(() => {
      mockedForm.getFieldState.mockClear().mockReturnValue({
        value: false,
      });
    });
    it('should open modal', () => {
      fireEvent.submit(screen.getByRole('button', { name: 'stripes-core.button.save' }));

      expect(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopup.heading')).toBeInTheDocument();
      expect(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopup.message')).toBeInTheDocument();
      expect(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopup.message.confirm')).toBeInTheDocument();
      expect(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopup.message.cancel')).toBeInTheDocument();
    });

    it('should call "handleSubmit" on click of "Confirm" button in modal', () => {
      fireEvent.submit(screen.getByRole('button', { name: 'stripes-core.button.save' }));
      fireEvent.click(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopup.message.confirm'));

      expect(mockedHandleSubmit).toHaveBeenCalled();
    });

    it('should call mockedFormChange on click of "Confirm" button in modal', () => {
      fireEvent.submit(screen.getByRole('button', { name: 'stripes-core.button.save' }));
      fireEvent.click(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopup.message.cancel'));
      expect(mockedForm.change).toHaveBeenCalled();
    });
  });
});
