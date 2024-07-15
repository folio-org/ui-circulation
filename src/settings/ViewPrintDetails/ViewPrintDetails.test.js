import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import ViewPrintDetails from './ViewPrintDetails';
import { usePrintDetailsSettings } from './hooks/usePrintDetailsSettings/usePrintDetailsSettings';
import { usePrintDetailsSettingsMutation } from './hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation';

jest.mock('./hooks/usePrintDetailsSettings/usePrintDetailsSettings');
jest.mock('./hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation');

jest.mock('./ViewPrintDetailsForm', () => ({ onSubmit }) => {
  return (
    <form onSubmit={e => {
      e.preventDefault();
      onSubmit({ viewPrintDetailsEnabled: 'true' });
    }}
    >
      <button type="submit">Submit</button>
    </form>
  );
});

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const renderComponent = () => {
  return render(
    <ViewPrintDetails />, { wrapper }
  );
};

const mockData = {
  id: '01cd7de6-5f0b-45f8-a7a9-7c122f8cd7e9',
  name: 'Enable print event log',
  value: { enablePrintLog: 'true' }
};

const mockRefetch = jest.fn();
const mockKy = {
  get: jest.fn(() => ({
    json: () => {
      return Promise.resolve({});
    },
  }))
};

describe('ViewPrintDetails', () => {
  beforeEach(() => {
    mockKy.get.mockClear();
    usePrintDetailsSettings.mockReturnValue({
      printDetailsInfo: mockData,
      enablePrintLog: false,
      isLoading: false,
      refetch: jest.fn(),
    });
    usePrintDetailsSettingsMutation.mockReturnValue({
      createPrintDetailsSettings: jest.fn(() => Promise.resolve()),
      updatePrintDetailsSettings: jest.fn(() => Promise.resolve()),
    });
    useOkapiKy
      .mockClear()
      .mockReturnValue(mockKy);
  });

  afterEach(() => {
    jest.clearAllMocks();
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

  it('should handle submit', async () => {
    render(<ViewPrintDetails />);
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument();
    });
  });
});
