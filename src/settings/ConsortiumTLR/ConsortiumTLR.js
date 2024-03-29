import PropTypes from 'prop-types';
import {
  useEffect,
  useContext,
  useState,
} from 'react';
import { injectIntl } from 'react-intl';

import {
  TitleManager,
  stripesConnect,
  stripesShape,
  CalloutContext,
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
  useEffect(() => {
    mutator.consortiumTlr.GET();
  }, []);

  const [isDataSaving, setDataSaving] = useState(false);
  const callout = useContext(CalloutContext);
  const handleSubmit = (data) => {
    setDataSaving(true);
    mutator.consortiumTlr.PUT(data)
      .then(() => {
        callout.sendCallout({ message: formatMessage({ id: 'stripes-smart-components.cm.success' }) });

        return mutator.consortiumTlr.GET();
      })
      .finally(() => {
        setDataSaving(false);
      });
  };
  const initialValues = {
    ecsTlrFeatureEnabled: resources.consortiumTlr.records.slice(-1)[0]?.ecsTlrFeatureEnabled,
  };
  const isEditPerm = stripes.hasPerm('tlr.consortium-tlr.edit');

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.consortiumTLR' })}
    >
      <ConsortiumTLRForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        isEditEnabled={isEditPerm}
        tlrSettings={resources.settings}
        isConsortiumTlrPending={resources.consortiumTlr.isPending}
        isDataSaving={isDataSaving}
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
  consortiumTlr: {
    type: 'okapi',
    path: 'tlr/settings',
    fetch: false,
    accumulate: true,
  },
});

ConsortiumTLR.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  mutator: PropTypes.shape({
    consortiumTlr: PropTypes.shape({
      PUT: PropTypes.func.isRequired,
      GET: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
  resources: PropTypes.shape({
    consortiumTlr: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired,
  }).isRequired,
  stripes: stripesShape.isRequired,
};

export default injectIntl(stripesConnect(ConsortiumTLR));
