import { useMutation } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { VIEW_PRINT_DETAILS_SETTINGS_API } from '../../../../constants';

export const usePrintDetailsSettingsMutation = () => {
  const ky = useOkapiKy();

  const createSetting = (values) => {
    return ky.post(VIEW_PRINT_DETAILS_SETTINGS_API, {
      json: values,
    });
  };

  const updateSetting = (values) => {
    return ky.put(`${VIEW_PRINT_DETAILS_SETTINGS_API}/${values.id}`, {
      json: values,
    });
  };

  const { mutateAsync: createPrintDetailsSettings, isCreating } = useMutation({ mutationFn: createSetting });
  const { mutateAsync: updatePrintDetailsSettings, isLoading: isUpdating } = useMutation({ mutationFn: updateSetting });

  return {
    createPrintDetailsSettings,
    isCreating,
    isUpdating,
    updatePrintDetailsSettings,
  };
};
