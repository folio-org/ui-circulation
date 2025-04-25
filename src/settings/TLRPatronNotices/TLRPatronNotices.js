import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { ConfigManager } from '@folio/stripes/smart-components';
import {
  withStripes,
  TitleManager,
} from '@folio/stripes/core';

import TLRPatronNoticesForm from './TLRPatronNoticesForm';
import {
  SCOPES,
  CONFIG_NAMES,
} from '../../constants';
import {
  getInitialValues,
  normalizeData,
} from './utils';

const TLRPatronNotices = ({
  stripes,
  intl: {
    formatMessage,
  },
}) => {
  const ConnectedConfigManager = stripes.connect(ConfigManager);

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.tlrPatronNotices' })}
    >
      <ConnectedConfigManager
        label={formatMessage({ id: 'ui-circulation.settings.tlrPatronNotices.paneTitle' })}
        scope={SCOPES.CIRCULATION}
        configName={CONFIG_NAMES.REGULAR_TLR}
        configFormComponent={TLRPatronNoticesForm}
        stripes={stripes}
        getInitialValues={getInitialValues}
        onBeforeSave={normalizeData}
      />
    </TitleManager>
  );
};

TLRPatronNotices.propTypes = {
  stripes: PropTypes.shape({
    connect: PropTypes.func.isRequired,
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStripes(injectIntl(TLRPatronNotices));
