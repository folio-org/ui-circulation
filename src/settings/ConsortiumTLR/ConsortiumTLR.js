import { injectIntl } from 'react-intl';

import {
  TitleManager,
  stripesConnect,
} from '@folio/stripes/core';

import ConsortiumTLRForm from './ConsortiumTLRForm';
import {
  CONFIG_NAMES,
  SCOPES,
} from '../../constants';

const ConsortiumTLR = ({
  intl: {
    formatMessage,
  },
  mutator,
  resources,
  stripes,
}) => {
  const handleSubmit = async (data) => {
    //TODO: add changes to data if necessary
    await mutator.consortiumTlr.PUT({ ...data });
  };

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.consortiumTLR' })}
    >
      <ConsortiumTLRForm
        onSubmit={handleSubmit}
        formatMessage={formatMessage}
        initialValues={{
          //TODO: take initial value from returned data
          ecsTlrFeatureEnabled: false,
        }}
        //TODO: add correct permission name
        isEditEnabled={stripes.hasPerm('tlr.settings.ecs-tlr.put')}
        tlrSettings={resources.settings}
      />
    </TitleManager>
  );
};

ConsortiumTLR.manifest = Object.freeze({
  settings: {
    type: 'okapi',
    path: `settings/entries?query=(scope==${SCOPES.CIRCULATION} and key==${CONFIG_NAMES.GENERAL_TLR})`,
    records: 'items',
  },
  //TODO: add correct endpoint for saving/getting consortium tlr settings
  consortiumTlr: {
    type: 'okapi',
    path: 'ecs-tlr/settings',
    records: 'items',
  },
});

export default injectIntl(stripesConnect(ConsortiumTLR));
