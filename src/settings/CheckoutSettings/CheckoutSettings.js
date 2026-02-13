import {
  useCallback,
  useMemo,
} from 'react';
import {
  useIntl,
} from 'react-intl';

import {
  TitleManager,
} from '@folio/stripes/core';
import { useCustomFieldsQuery } from '@folio/stripes/smart-components';

import {
  CirculationSettingsConfig,
} from '../components';
import CheckoutSettingsForm from './CheckoutSettingsForm';
import {
  CONFIG_NAMES,
  USERS_MODULE,
  CUSTOM_FIELDS_ENTITY_TYPE,
} from '../../constants';

export const DEFAULT_INITIAL_CONFIG = {
  audioAlertsEnabled: false,
  audioTheme: 'classic',
  checkoutTimeout: true,
  checkoutTimeoutDuration: 3,
  prefPatronIdentifier: '',
  useCustomFieldsAsIdentifiers: false,
  wildcardLookupEnabled: false,
  allowedCustomFieldRefIds: [],
};

export const getInitialValues = (settings, customFieldsOptions) => {
  const config = {
    ...DEFAULT_INITIAL_CONFIG,
    ...settings,
  };

  // This section unfortunately must assume knowledge of how the IDs and Custom Field IDs
  // are rendered in CheckoutSettingsForm. IDs can be toggled on and off by a checkbox,
  // but because there can be /a lot/ of custom fields, the custom fields to use as a checkout ID
  // must be selected by a multiselect. As a result, we need to split out those customFields
  // into the `custom` object.
  const { prefPatronIdentifier } = config;
  const identifiers = { custom: [] };
  (prefPatronIdentifier ? prefPatronIdentifier.split(',') : []).forEach(identifier => {
    if (identifier.startsWith('customFields.')) {
      identifiers.custom.push({ value: identifier });
    } else {
      identifiers[identifier] = true;
    }
  });

  const allowedCustomFieldRefIds = config.allowedCustomFieldRefIds.map(refId => {
    return customFieldsOptions.find(customField => customField.value === refId) || { value: refId, label: refId };
  });

  return {
    audioAlertsEnabled: config.audioAlertsEnabled,
    audioTheme: config.audioTheme,
    checkoutTimeout: config.checkoutTimeout,
    checkoutTimeoutDuration: config.checkoutTimeoutDuration,
    identifiers,
    useCustomFieldsAsIdentifiers: config.useCustomFieldsAsIdentifiers,
    wildcardLookupEnabled: config.wildcardLookupEnabled,
    allowedCustomFieldRefIds,
  };
};

export const normalize = ({
  audioAlertsEnabled,
  audioTheme,
  checkoutTimeout,
  checkoutTimeoutDuration,
  identifiers,
  useCustomFieldsAsIdentifiers,
  wildcardLookupEnabled,
  allowedCustomFieldRefIds,
}) => {
  // As in `getInitialValues`, we must assume knowledge of how the IDs and Custom Field IDs
  // are rendered in CheckoutSettingsForm. IDs can be toggled on and off by a checkbox,
  // but because there can be /a lot/ of custom fields, the custom fields to use as a checkout ID
  // must be selected by a multiselect. As a result, here we need to merge the custom field IDs
  // with the regular IDs before we `join` it all into a string.
  const { custom: customFieldIdentifiers, ...defaultIdentifers } = identifiers;
  const selectedDefaultPatronIdentifiers = Object.entries(defaultIdentifers)
    .filter(([_key, value]) => value === true)
    .map(([key]) => key);

  const selectedCustomFieldPatronIdentifiers = useCustomFieldsAsIdentifiers
    ? customFieldIdentifiers.map(i => i.value)
    : [];

  const prefPatronIdentifier = [
    ...selectedDefaultPatronIdentifiers,
    ...selectedCustomFieldPatronIdentifiers,
  ].join(',');

  return {
    audioAlertsEnabled,
    audioTheme,
    checkoutTimeout,
    checkoutTimeoutDuration: parseInt(checkoutTimeoutDuration, 10),
    prefPatronIdentifier,
    useCustomFieldsAsIdentifiers,
    wildcardLookupEnabled,
    allowedCustomFieldRefIds: allowedCustomFieldRefIds.map(customField => customField.value),
  };
};

const CheckoutSettings = () => {
  const {
    formatMessage,
  } = useIntl();

  const {
    customFields,
    isLoadingCustomFields,
  } = useCustomFieldsQuery({
    moduleName: USERS_MODULE,
    entityType: CUSTOM_FIELDS_ENTITY_TYPE,
    isVisible: true,
  });

  const customFieldsOptions = useMemo(() => {
    return (customFields || []).map(({ name, refId }) => ({
      label: name,
      value: refId,
    }));
  }, [customFields]);

  const getOriginalValues = useCallback((settings) => {
    return getInitialValues(settings, customFieldsOptions);
  }, [customFieldsOptions]);

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.otherSettings' })}
    >
      <CirculationSettingsConfig
        label={formatMessage({ id: 'ui-circulation.settings.index.otherSettings' })}
        configName={CONFIG_NAMES.OTHER_SETTINGS}
        getInitialValues={getOriginalValues}
        configFormComponent={CheckoutSettingsForm}
        customFieldsOptions={customFieldsOptions}
        isLoadingCustomFields={isLoadingCustomFields}
        onBeforeSave={normalize}
      />
    </TitleManager>
  );
};

export default CheckoutSettings;
