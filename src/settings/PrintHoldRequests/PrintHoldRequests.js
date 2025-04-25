import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { ConfigManager } from '@folio/stripes/smart-components';
import {
  withStripes,
  TitleManager,
} from '@folio/stripes/core';

import PrintHoldRequestsForm from './PrintHoldRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  MODULE_NAMES,
  CONFIG_NAMES,
} from '../../constants';

const PrintHoldRequests = ({
  stripes,
  intl: {
    formatMessage,
  },
}) => {
  const ConnectedConfigManager = stripes.connect(ConfigManager);

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.printHoldRequests' })}
    >
      <ConnectedConfigManager
        label={formatMessage({ id: 'ui-circulation.settings.PrintHoldRequests.paneTitle' })}
        moduleName={MODULE_NAMES.SETTINGS}
        configName={CONFIG_NAMES.PRINT_HOLD_REQUESTS}
        configFormComponent={PrintHoldRequestsForm}
        stripes={stripes}
        getInitialValues={getInitialValues}
        onBeforeSave={normalizeData}
      />
    </TitleManager>
  );
};

PrintHoldRequests.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStripes(injectIntl(PrintHoldRequests));
