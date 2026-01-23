import {
  useIntl,
} from 'react-intl';

import {
  TitleManager,
} from '@folio/stripes/core';

import {
  CirculationSettingsConfig,
} from '../components';
import TitleLevelRequestsForm from './TitleLevelRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  CONFIG_NAMES,
} from '../../constants';

const TitleLevelRequests = () => {
  const {
    formatMessage,
  } = useIntl();

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.titleLevelRequestsTlr' })}
    >
      <CirculationSettingsConfig
        label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequestsTlr.paneTitle' })}
        configName={CONFIG_NAMES.GENERAL_TLR}
        configFormComponent={TitleLevelRequestsForm}
        getInitialValues={getInitialValues}
        onBeforeSave={normalizeData}
      />
    </TitleManager>
  );
};

export default TitleLevelRequests;
