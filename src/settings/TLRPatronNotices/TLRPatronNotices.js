import {
  useIntl,
} from 'react-intl';

import {
  TitleManager,
} from '@folio/stripes/core';

import {
  CirculationSettingsConfig,
} from '../components';
import TLRPatronNoticesForm from './TLRPatronNoticesForm';
import {
  CONFIG_NAMES,
} from '../../constants';
import {
  getInitialValues,
  normalizeData,
} from './utils';

const TLRPatronNotices = () => {
  const {
    formatMessage,
  } = useIntl();

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.tlrPatronNotices' })}
    >
      <CirculationSettingsConfig
        label={formatMessage({ id: 'ui-circulation.settings.tlrPatronNotices.paneTitle' })}
        configName={CONFIG_NAMES.REGULAR_TLR}
        configFormComponent={TLRPatronNoticesForm}
        getInitialValues={getInitialValues}
        onBeforeSave={normalizeData}
      />
    </TitleManager>
  );
};

export default TLRPatronNotices;
