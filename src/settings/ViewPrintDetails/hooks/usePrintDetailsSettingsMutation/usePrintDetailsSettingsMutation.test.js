import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { omit } from 'lodash';

import {
  renderHook,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { useOkapiKy } from '@folio/stripes/core';

import { VIEW_PRINT_DETAILS_SETTINGS_KEY, VIEW_PRINT_DETAILS_SETTINGS_API } from '../../../../constants';
import { usePrintDetailsSettingsMutation } from './usePrintDetailsSettingsMutation';

const putMock = jest.fn();
const postMock = jest.fn();

const printDetailsSettingsData = {
  id: '0acf50df-709f-44d9-9fa0-5a95e349419b',
  name: VIEW_PRINT_DETAILS_SETTINGS_KEY,
  value: { enablePrintLog: 'true' },
};

const queryClient = new QueryClient();

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('usePrintDetailsSettingsMutation', () => {
  beforeEach(() => {
    putMock.mockClear();
    postMock.mockClear();
    useOkapiKy
      .mockClear()
      .mockReturnValue({
        put: putMock,
        post: postMock,
      });
  });

  it('should call `createPrintDetailsSettings` mutation', async () => {
    const { result } = renderHook(() => usePrintDetailsSettingsMutation(), { wrapper });
    const createSettings = omit(printDetailsSettingsData, 'id');

    await result.current.createPrintDetailsSettings(createSettings);
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(postMock).toHaveBeenCalledWith(VIEW_PRINT_DETAILS_SETTINGS_API, expect.objectContaining(
      { json: createSettings }
    ));
  });

  it('should call `updatePrintDetailsSettings` mutation', async () => {
    const { result } = renderHook(() => usePrintDetailsSettingsMutation(), { wrapper });

    await result.current.updatePrintDetailsSettings(printDetailsSettingsData);
    await waitFor(() => expect(result.current.isLoading).toBeFalsy());

    expect(putMock).toHaveBeenCalledWith(`${VIEW_PRINT_DETAILS_SETTINGS_API}/${printDetailsSettingsData.id}`, expect.objectContaining(
      { json: printDetailsSettingsData }
    ));
  });
});
