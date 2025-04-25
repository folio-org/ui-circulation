import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { ConfigManager } from '@folio/stripes/smart-components';
import {
  withStripes,
  TitleManager,
} from '@folio/stripes/core';

import TitleLevelRequestsForm from './TitleLevelRequestsForm';
import {
  getInitialValues,
  normalizeData,
} from './utils';
import {
  CONFIG_NAMES,
  SCOPES,
} from '../../constants';

const TitleLevelRequests = ({
  stripes,
  intl: {
    formatMessage,
  },
}) => {
  const ConnectedConfigManager = stripes.connect(ConfigManager);

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.titleLevelRequestsTlr' })}
    >
      <ConnectedConfigManager
        label={formatMessage({ id: 'ui-circulation.settings.titleLevelRequestsTlr.paneTitle' })}
        scope={SCOPES.CIRCULATION}
        configName={CONFIG_NAMES.GENERAL_TLR}
        configFormComponent={TitleLevelRequestsForm}
        stripes={stripes}
        getInitialValues={getInitialValues}
        onBeforeSave={normalizeData}
      />
    </TitleManager>
  );
};

TitleLevelRequests.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStripes(injectIntl(TitleLevelRequests));
