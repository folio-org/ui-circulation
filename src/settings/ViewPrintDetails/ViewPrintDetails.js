import { useIntl } from 'react-intl';

import { LoadingPane } from '@folio/stripes/components';
import { useCallout } from '@folio/stripes/core';

import { usePrintDetailsSettings } from './hooks/usePrintDetailsSettings/usePrintDetailsSettings';
import { usePrintDetailsSettingsMutation } from './hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation';
import ViewPrintDetailsForm from './ViewPrintDetailsForm';
import { VIEW_PRINT_DETAILS_ENABLED, VIEW_PRINT_DETAILS_SETTINGS_KEY } from '../../constants';

const ViewPrintDetails = () => {
  const {
    printDetailsInfo,
    enablePrintLog,
    isLoading,
    refetch,
  } = usePrintDetailsSettings();
  const { createPrintDetailsSettings, updatePrintDetailsSettings } = usePrintDetailsSettingsMutation();
  const { formatMessage } = useIntl();
  const callout = useCallout();

  const createSetting = (values) => {
    return createPrintDetailsSettings({
      name: VIEW_PRINT_DETAILS_SETTINGS_KEY,
      value: {
        enablePrintLog: values[VIEW_PRINT_DETAILS_ENABLED].toString(),
      }
    });
  };

  const updateSetting = (values) => {
    return updatePrintDetailsSettings({
      ...printDetailsInfo,
      value: {
        ...printDetailsInfo.value,
        enablePrintLog: values[VIEW_PRINT_DETAILS_ENABLED].toString(),
      }
    });
  };

  const onSubmit = (values) => {
    const apiHandler = printDetailsInfo?.name === VIEW_PRINT_DETAILS_SETTINGS_KEY ? updateSetting : createSetting;

    return apiHandler(values)
      .then(() => {
        refetch();
        callout.sendCallout({
          type: 'success',
          message: formatMessage(
            { id: 'ui-circulation.settings.ViewPrintDetails.callout.success' },
          ),
        });
      })
      .catch(() => {
        callout.sendCallout({
          type: 'error',
          message: formatMessage(
            { id: 'ui-circulation.settings.ViewPrintDetails.callout.error' },
          ),
        });
      });
  };

  const paneTitle = formatMessage({ id: 'ui-circulation.settings.title.viewPrintDetails' });

  if (isLoading) {
    return <LoadingPane
      defaultWidth="50%"
      paneTitle={paneTitle}
    />;
  }

  return (
    <ViewPrintDetailsForm
      onSubmit={onSubmit}
      initialValues={{ [VIEW_PRINT_DETAILS_ENABLED]: enablePrintLog }}
      paneTitle={paneTitle}
    />
  );
};

export default ViewPrintDetails;
