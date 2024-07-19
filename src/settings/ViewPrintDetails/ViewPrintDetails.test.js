import React from 'react';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy, useCallout } from '@folio/stripes/core';

import ViewPrintDetails from './ViewPrintDetails';
import ViewPrintDetailsForm from './ViewPrintDetailsForm';
import { usePrintDetailsSettings } from './hooks/usePrintDetailsSettings/usePrintDetailsSettings';
import { usePrintDetailsSettingsMutation } from './hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation';
import { VIEW_PRINT_DETAILS_SETTINGS_KEY } from '../../constants';

jest.mock('./hooks/usePrintDetailsSettings/usePrintDetailsSettings');
jest.mock('./hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation');
jest.mock('./ViewPrintDetailsForm');

const renderComponent = () => {
  return render(
    <ViewPrintDetails />
  );
};

const mockData = {
  id: '01cd7de6-5f0b-45f8-a7a9-7c122f8cd7e9',
  name: VIEW_PRINT_DETAILS_SETTINGS_KEY,
  value: { enablePrintLog: 'false' }
};
const mockRefetch = jest.fn();
const mockKy = {
  put: jest.fn((_url, { data }) => ({
    json() {
      return Promise.resolve(data);
    },
  })),
};

describe('ViewPrintDetails', () => {
  const sendCallout = jest.fn();
  beforeEach(() => {
    ViewPrintDetailsForm.mockImplementation(({ onSubmit }) => {
      return (
        <form onSubmit={() => {
          onSubmit({ viewPrintDetailsEnabled: true });
        }}
        >
          <button type="submit">Submit</button>
        </form>
      );
    });
    usePrintDetailsSettings.mockReturnValue({
      printDetailsInfo: null,
      enablePrintLog: false,
      isLoading: false,
      refetch: jest.fn(),
    });
    usePrintDetailsSettingsMutation.mockReturnValue({
      createPrintDetailsSettings: jest.fn(() => Promise.resolve()),
      updatePrintDetailsSettings: jest.fn(() => Promise.resolve()),
    });
    sendCallout.mockClear();
    useCallout.mockClear().mockReturnValue({ sendCallout });
    mockKy.put.mockClear();
    useOkapiKy
      .mockClear()
      .mockReturnValue(mockKy);
  });

  it('should render LoadingPane component when settings are loading', () => {
    usePrintDetailsSettings.mockReturnValueOnce({
      printDetailsInfo: null,
      enablePrintLog: false,
      isLoading: true,
      refetch: mockRefetch,
    });
    renderComponent();

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('should call createPrintDetailsSettings Mutation on form submit when printDetailsInfo.id is not present', async () => {
    render(<ViewPrintDetails />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(usePrintDetailsSettingsMutation().createPrintDetailsSettings).toHaveBeenCalled();
    });
  });

  it('should call updatePrintDetailsSettings Mutation on form submit when printDetailsInfo.id is present', async () => {
    usePrintDetailsSettings.mockReturnValue({
      printDetailsInfo: mockData,
      enablePrintLog: false,
      isLoading: false,
      refetch: jest.fn(),
    });
    render(<ViewPrintDetails />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(usePrintDetailsSettingsMutation().updatePrintDetailsSettings).toHaveBeenCalled();
    });
  });

  it('should display success callout when settings is updated successfully', async () => {
    render(<ViewPrintDetails />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(sendCallout).toHaveBeenCalledWith({
        type: 'success',
        message: 'ui-circulation.settings.ViewPrintDetails.callout.success',
      });
    });
  });

  it('should display error callout when settings is not updated successfully', async () => {
    usePrintDetailsSettingsMutation.mockReturnValue({
      createPrintDetailsSettings: jest.fn(() => Promise.reject()),
      updatePrintDetailsSettings: jest.fn(() => Promise.reject()),
    });
    render(<ViewPrintDetails />);

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
      expect(sendCallout).toHaveBeenCalledWith({
        type: 'error',
        message: 'ui-circulation.settings.ViewPrintDetails.callout.error',
      });
    });
  });
});
