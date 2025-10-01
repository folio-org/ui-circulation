import { useQuery } from 'react-query';

import {
  useOkapiKy,
  useStripes,
} from '@folio/stripes/core';

const useCurrentTenants = () => {
  const ky = useOkapiKy();
  const stripes = useStripes();
  const { id: consortiumId } = stripes.user.user.consortium || {};
  const {
    data,
    isLoading,
  } = useQuery(
    ['tenants'],
    () => ky.get(`consortia/${consortiumId}/tenants`).json(),
    {
      enabled: Boolean(consortiumId),
    },
  );

  return {
    tenants: data?.tenants || [],
    isLoading,
  };
};

export default useCurrentTenants;
