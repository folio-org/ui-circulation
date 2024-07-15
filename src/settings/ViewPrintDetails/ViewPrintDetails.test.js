import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy, TitleManager } from '@folio/stripes/core';

import ViewPrintDetails from './ViewPrintDetails';
import { usePrintDetailsSettings } from './hooks/usePrintDetailsSettings/usePrintDetailsSettings';
import { usePrintDetailsSettingsMutation } from './hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation';

jest.mock('./hooks/usePrintDetailsSettings/usePrintDetailsSettings');
jest.mock('./hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation');


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

const mockRefetch = jest.fn();
const mockKy = {
  get: jest.fn(() => ({
    json: () => {
      return Promise.resolve({});
    },
  }))
};

describe('ViewPrintDetails', () => {
  const labelIds = {
    generalTitle: 'ui-circulation.settings.title.general',
    viewPrintDetailsTitle: 'ui-circulation.settings.title.viewPrintDetails',
  };
  beforeEach(() => {
    mockKy.get.mockClear();
    usePrintDetailsSettings.mockReturnValue({
      printDetailsInfo: null,
      enablePrintLog: false,
      isLoading: false,
      refetch: jest.fn(),
    });
    usePrintDetailsSettingsMutation.mockReturnValue({
      createPrintDetailsSettings: jest.fn(),
      updatePrintDetailsSettings: jest.fn(),
    });
    useOkapiKy
      .mockClear()
      .mockReturnValue(mockKy);
  });

  it('should display pane headings', () => {
    renderComponent();

    const paneTitle = screen.getByText('ui-circulation.settings.title.viewPrintDetails');
    const fieldLabel = screen.getByText('ui-circulation.settings.ViewPrintDetails.enable');

    expect(paneTitle).toBeInTheDocument();
    expect(fieldLabel).toBeInTheDocument();
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

  it('should render form with initial values', () => {
    renderComponent();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should trigger TitleManager with correct props', () => {
    const expectedProps = {
      page: labelIds.generalTitle,
      record: labelIds.viewPrintDetailsTitle,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });
});