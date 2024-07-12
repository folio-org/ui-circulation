import { useIntl } from 'react-intl';
import { useState } from 'react';

import { Loading, Modal, Button, ModalFooter } from '@folio/stripes/components';
import { useCallout } from '@folio/stripes/core';


import { usePrintDetailsSettings } from './hooks/usePrintDetailsSettings/usePrintDetailsSettings';
import { usePrintDetailsSettingsMutation } from './hooks/usePrintDetailsSettingsMutation/usePrintDetailsSettingsMutation';
import ViewPrintDetailsForm from './ViewPrintDetailsForm';
import { VIEW_PRINT_DETAILS_ENABLED } from '../../constants';

const PRINT_DETAILS_SETTINGS_KEY = 'Enable print event log';

const ViewPrintDetails = () => {
  const {
    printDetailsInfo,
    enablePrintLog,
    isLoading,
    refetch,
  } = usePrintDetailsSettings();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createPrintDetailsSettings, updatePrintDetailsSettings } = usePrintDetailsSettingsMutation();
  const { formatMessage } = useIntl();
  const callout = useCallout();

  const createSetting = (values) => {
    return createPrintDetailsSettings({
      name: PRINT_DETAILS_SETTINGS_KEY,
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

  const apiHandler = (values) => {
    const handler = printDetailsInfo?.id ? updateSetting : createSetting;

    return handler(values)
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

  const onSubmit = async (values) => {
    if (!values[VIEW_PRINT_DETAILS_ENABLED]) {
      setIsModalOpen(true);
    } else {
      apiHandler(values);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalYes = () => {
    apiHandler({ [VIEW_PRINT_DETAILS_ENABLED]: false });
    setIsModalOpen(false);
  };

  const modalFooter = (
    <ModalFooter>
      <Button
        onClick={handleModalYes}
        buttonStyle="primary"
      >
        {formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.warningPopupMessage.yes' })}
      </Button>
      <Button
        onClick={handleModalClose}
        buttonStyle="primary"
      >
        {formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.warningPopupMessage.no' })}
      </Button>
    </ModalFooter>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ViewPrintDetailsForm
        onSubmit={onSubmit}
        initialValues={{ [VIEW_PRINT_DETAILS_ENABLED]: enablePrintLog }}
      />
      <Modal
        data-testid="viewPrintDetailsModal"
        open={isModalOpen}
        onClose={handleModalClose}
        dismissible
        footer={modalFooter}
      >
        {formatMessage({ id: 'ui-circulation.settings.ViewPrintDetails.warningPopupMessage' })}
      </Modal>
    </>
  );
};

export default ViewPrintDetails;
