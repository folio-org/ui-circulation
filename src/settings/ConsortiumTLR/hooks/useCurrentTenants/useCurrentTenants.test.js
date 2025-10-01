import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';
import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import useCurrentTenants from './useCurrentTenants';

jest.mock('@folio/stripes/core', () => ({
  useOkapiKy: jest.fn(),
  useStripes: jest.fn(),
}));

const queryClient = new QueryClient();

// eslint-disable-next-line react/prop-types
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const okapiKyMock = {
  get: jest.fn(() => ({
    json: async () => Promise.resolve({ tenants: [{ id: 'tenant1', name: 'Tenant 1' }] }),
  })),
};
const stripesMock = {
  user: {
    user: {
      consortium: {
        id: 'consortium1',
      },
    },
  },
};

describe('useCurrentTenants', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useOkapiKy.mockClear().mockReturnValue(okapiKyMock);
    useStripes.mockClear().mockReturnValue(stripesMock);
  });

  it('should call ky.get with correct URL and call json method', async () => {
    const jsonMock = jest.fn(() => Promise.resolve({ tenants: [{ id: 'tenant1', name: 'Tenant 1' }] }));
    const getMock = jest.fn(() => ({ json: jsonMock }));
    useOkapiKy.mockReturnValue({ get: getMock });

    const { result } = renderHook(() => useCurrentTenants(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(getMock).toHaveBeenCalledWith('consortia/consortium1/tenants');
    expect(jsonMock).toHaveBeenCalled();
  });

  it('should fetch tenants', async () => {
    const { result } = renderHook(() => useCurrentTenants(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(result.current.tenants).toEqual([{ id: 'tenant1', name: 'Tenant 1' }]);
  });
});
