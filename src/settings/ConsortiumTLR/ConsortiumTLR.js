import PropTypes from 'prop-types';
import {
  useMemo,
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
  useCurrentTenants,
} from './hooks';
import {
  getLastRecordValue,
  getExcludeTenants,
  getNormalizeData,
} from '../utils/utils';
import {
  CONFIG_NAMES,
  CONSORTIUM_TITLE_LEVEL_REQUESTS,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    tenants,
  } = useCurrentTenants();
  const [saving, setSaving] = useState(false);
  const callout = useContext(CalloutContext);
  const handleSubmit = (data) => {
    setSaving(true);

    const normalizeData = getNormalizeData(data);

    mutator.consortiumTlr.PUT(normalizeData)
      .then(() => {
        callout.sendCallout({ message: formatMessage({ id: 'stripes-smart-components.cm.success' }) });

        return mutator.consortiumTlr.GET();
      })
      .finally(() => {
        setSaving(false);
      });
  };
  const lastRecordValue = getLastRecordValue(resources.consortiumTlr);
  const ecsTlrFeatureEnabled = lastRecordValue?.[CONSORTIUM_TITLE_LEVEL_REQUESTS.ECS_TLR_ENABLED];
  const excludeFromEcsRequestLendingTenantSearch = lastRecordValue?.[CONSORTIUM_TITLE_LEVEL_REQUESTS.EXCLUDE_FROM_ECS_REQUEST_LENDING_TENANT_SEARCH];
  const excludeTenant = useMemo(() => (
    getExcludeTenants(excludeFromEcsRequestLendingTenantSearch, tenants)
  ), [tenants, excludeFromEcsRequestLendingTenantSearch]);
  const initialValues = {
    ecsTlrFeatureEnabled,
    excludeFromEcsRequestLendingTenantSearch: excludeTenant,
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
        isSaving={saving}
      />
    </TitleManager>
  );
};

ConsortiumTLR.manifest = Object.freeze({
  settings: {
    type: 'okapi',
    path: `circulation/settings?query=(name==${CONFIG_NAMES.GENERAL_TLR})`,
    records: 'circulationSettings',
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
    consortiumTlr: PropTypes.shape({
      records: PropTypes.arrayOf(PropTypes.shape({
        ecsTlrFeatureEnabled: PropTypes.bool,
      })),
    }).isRequired,
    settings: PropTypes.shape({
      isPending: PropTypes.bool,
      records: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.shape({
          titleLevelRequestsFeatureEnabled: PropTypes.bool,
        }),
      })),
    }).isRequired,
  }).isRequired,
  stripes: stripesShape.isRequired,
};

export default injectIntl(stripesConnect(ConsortiumTLR));
