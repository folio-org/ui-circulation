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
    pristine: true,
    submitting: false,
  };

  beforeEach(() => {
    render(
      <ViewPrintDetailsForm {...defaultProps} />
    );
  });

  it('should render pane title', () => {
    expect(screen.getByText('ui-circulation.settings.title.viewPrintDetails')).toBeInTheDocument();
  });

  it('should render View Print Details checkbox and checkbox label', () => {
    expect(screen.getByTestId('viewPrintDetailsCheckbox')).toBeInTheDocument();
    expect(screen.getByText('ui-circulation.settings.ViewPrintDetails.enable')).toBeInTheDocument();
  });

  it('should execute "Field" with correct props', () => {
    expect(Field).toHaveBeenCalledWith(expect.objectContaining({
      'data-testid': 'viewPrintDetailsCheckbox',
      label: 'ui-circulation.settings.ViewPrintDetails.enable',
      name: VIEW_PRINT_DETAILS_ENABLED,
      type: 'checkbox'
    }), {});
  });

  it('should call "handleSubmit" on form submit', () => {
    expect(mockedHandleSubmit).not.toHaveBeenCalled();

    fireEvent.submit(screen.getByRole('button', { name: 'stripes-core.button.save' }));

    expect(mockedHandleSubmit).toHaveBeenCalled();
  });

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
      record: labelIds.viewPrintDetailsTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });
});
