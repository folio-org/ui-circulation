import React from 'react';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import ViewPrintDetails from './ViewPrintDetails';
import ViewPrintDetailsForm from './ViewPrintDetailsForm';
import { usePrintDetailsSettings } from './hooks/usePrintDetailsSettings/usePrintDetailsSettings';
import { usePrintDetailsSettingsMutation } from './hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation';

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
  name: 'Enable print event log',
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
  describe('when form is submitted with enabled print log', () => {
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

    it('should call createPrintDetailsSettings Mutation when printDetailsInfo.id is not present', async () => {
      render(<ViewPrintDetails />);

      fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(usePrintDetailsSettingsMutation().createPrintDetailsSettings).toHaveBeenCalled();
      });
    });

    it('should call updatePrintDetailsSettings Mutation when printDetailsInfo.id is present', async () => {
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
  });

  describe('when form is submitted with disabled print log', () => {
    beforeEach(() => {
      ViewPrintDetailsForm.mockImplementation(({ onSubmit }) => {
        return (
          <form onSubmit={() => {
            onSubmit({ viewPrintDetailsEnabled: false });
          }}
          >
            <button type="submit">Submit</button>
          </form>
        );
      });
      usePrintDetailsSettings.mockReturnValue({
        printDetailsInfo: {
          ...mockData,
          value: {
            ...mockData.value,
            enablePrintLog: 'true',
          },
        },
        enablePrintLog: true,
        isLoading: false,
        refetch: jest.fn(),
      });
      usePrintDetailsSettingsMutation.mockReturnValue({
        createPrintDetailsSettings: jest.fn(() => Promise.resolve()),
        updatePrintDetailsSettings: jest.fn(() => Promise.resolve()),
      });
      mockKy.put.mockClear();
      useOkapiKy
        .mockClear()
        .mockReturnValue(mockKy);
    });

    it('should open modal', async () => {
      render(<ViewPrintDetails />);

      fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

      expect(await screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage')).toBeInTheDocument();
      expect(await screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage.yes')).toBeInTheDocument();
      expect(await screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage.no')).toBeInTheDocument();
    });

    it('should call updatePrintDetailsSettings Mutation and close Modal on "Yes" button click', async () => {
      render(<ViewPrintDetails />);

      fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

      expect(screen.queryByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByText('Submit')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage.yes'));

      await waitFor(() => {
        expect(usePrintDetailsSettingsMutation().updatePrintDetailsSettings).toHaveBeenCalled();
        expect(screen.queryByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage')).not.toBeInTheDocument();
      });
    });

    it('should not call updatePrintDetailsSettings Mutation and close Modal on "No" button click', async () => {
      render(<ViewPrintDetails />);

      fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

      expect(screen.queryByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage')).toBeInTheDocument();
      await waitFor(() => {
        expect(screen.getByText('Submit')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage.no'));

      await waitFor(() => {
        expect(usePrintDetailsSettingsMutation().createPrintDetailsSettings).not.toHaveBeenCalled();
        expect(usePrintDetailsSettingsMutation().updatePrintDetailsSettings).not.toHaveBeenCalled();
        expect(screen.queryByText('ui-circulation.settings.ViewPrintDetails.warningPopupMessage')).not.toBeInTheDocument();
      });
    });
  });
});
