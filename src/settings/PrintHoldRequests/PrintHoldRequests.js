import {
  useIntl,
} from 'react-intl';

import {
  TitleManager,
} from '@folio/stripes/core';

import {
  CirculationSettingsConfig,
} from '../components';
import PrintHoldRequestsForm from './PrintHoldRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  CONFIG_NAMES,
} from '../../constants';

const PrintHoldRequests = () => {
  const {
    formatMessage,
  } = useIntl();

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.printHoldRequests' })}
    >
      <CirculationSettingsConfig
        label={formatMessage({ id: 'ui-circulation.settings.PrintHoldRequests.paneTitle' })}
        configName={CONFIG_NAMES.PRINT_HOLD_REQUESTS}
        configFormComponent={PrintHoldRequestsForm}
        getInitialValues={getInitialValues}
        onBeforeSave={normalizeData}
      />
    </TitleManager>
  );
};

export default PrintHoldRequests;
