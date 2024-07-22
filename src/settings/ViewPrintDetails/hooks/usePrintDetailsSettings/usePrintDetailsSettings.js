import { useQuery } from 'react-query';
import { get, omit } from 'lodash';

import {
  useNamespace,
  useOkapiKy,
} from '@folio/stripes/core';

import { VIEW_PRINT_DETAILS_SETTINGS_API } from '../../../../constants';

const DEFAULT_DATA = {};

export const usePrintDetailsSettings = (options = {}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace('print-details-settings');
  const searchParams = {
    limit: 1,
  };

  const {
    data: printDetailsInfo = DEFAULT_DATA,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: [namespace],
    queryFn: async () => {
      const response = await ky.get(VIEW_PRINT_DETAILS_SETTINGS_API, { searchParams }).json();
      const printDetailsSettings = get(response, 'circulationSettings[0]', DEFAULT_DATA);

      return omit(printDetailsSettings, 'metadata');
    },
    ...options,
  });

  return ({
    printDetailsInfo,
    enablePrintLog: printDetailsInfo?.value?.enablePrintLog === 'true',
    error,
    isLoading: isFetching,
    refetch,
  });
};
