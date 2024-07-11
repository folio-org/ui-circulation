import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { usePrintDetailsSettings } from './usePrintDetailsSettings';

const printDetailsSettings = {
  id: '0acf50df-709f-44d9-9fa0-5a95e349419b',
  name: 'Enable print event log',
  value: { enablePrintLog: 'true' },
};

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('usePrintDetailsSettings', () => {
  it('should fetch print details settings', async () => {
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        get: () => ({
          json: () => Promise.resolve({ circulationSettings: [printDetailsSettings] }),
        }),
      });

    const { result } = renderHook(() => usePrintDetailsSettings(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.printDetailsInfo).toEqual(printDetailsSettings);
  });
});
