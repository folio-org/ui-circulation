import React from 'react';
import { injectIntl } from 'react-intl';
import {
  head,
  isEmpty,
} from 'lodash';
import PropTypes from 'prop-types';

import {
  stripesShape,
  withStripes,
  TitleManager,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import CheckoutSettingsForm from './CheckoutSettingsForm';

export const DEFAULT_INITIAL_CONFIG = {
  audioAlertsEnabled: false,
  audioTheme: 'classic',
  checkoutTimeout: true,
  checkoutTimeoutDuration: 3,
  prefPatronIdentifier: '',
  useCustomFieldsAsIdentifiers: false,
  wildcardLookupEnabled: false,
};

export const getInitialValues = (settings) => {
  let config;

  const value = isEmpty(settings) ? '' : head(settings).value;

  try {
    config = { ...DEFAULT_INITIAL_CONFIG, ...JSON.parse(value) };
  } catch (e) {
    config = DEFAULT_INITIAL_CONFIG;
  }

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

  return {
    audioAlertsEnabled: config.audioAlertsEnabled,
    audioTheme: config.audioTheme,
    checkoutTimeout: config.checkoutTimeout,
    checkoutTimeoutDuration: config.checkoutTimeoutDuration,
    identifiers,
    useCustomFieldsAsIdentifiers: config.useCustomFieldsAsIdentifiers,
    wildcardLookupEnabled: config.wildcardLookupEnabled,
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

  const selectedCustomFieldPatronIdentifiers = customFieldIdentifiers.map(i => i.value);

  const prefPatronIdentifier = [
    ...selectedDefaultPatronIdentifiers,
    ...selectedCustomFieldPatronIdentifiers,
  ].join(',');

  const otherSettings = JSON.stringify({
    audioAlertsEnabled,
    audioTheme,
    checkoutTimeout,
    checkoutTimeoutDuration: parseInt(checkoutTimeoutDuration, 10),
    prefPatronIdentifier,
    useCustomFieldsAsIdentifiers,
    wildcardLookupEnabled,
  });

  return otherSettings;
};

class CheckoutSettings extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.configManager = props.stripes.connect(ConfigManager);
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={formatMessage({ id: 'ui-circulation.settings.title.otherSettings' })}
      >
        <this.configManager
          label={formatMessage({ id: 'ui-circulation.settings.index.otherSettings' })}
          moduleName="CHECKOUT"
          configName="other_settings"
          getInitialValues={getInitialValues}
          configFormComponent={CheckoutSettingsForm}
          stripes={this.props.stripes}
          onBeforeSave={normalize}
        />
      </TitleManager>
    );
  }
}

export default injectIntl(withStripes(CheckoutSettings));
