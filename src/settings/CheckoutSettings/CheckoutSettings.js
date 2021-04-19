import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  head,
  isEmpty,
} from 'lodash';

import { stripesShape, withStripes } from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import CheckoutSettingsForm from './CheckoutSettingsForm';

class CheckoutSettings extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);

    this.configManager = props.stripes.connect(ConfigManager);
  }

  getInitialValues(settings) {
    let config;

    const value = isEmpty(settings) ? '' : head(settings).value;

    const defaultConfig = {
      audioAlertsEnabled: false,
      audioTheme: 'modern',
      checkoutTimeout: true,
      checkoutTimeoutDuration: 3,
      prefPatronIdentifier: '',
      useCustomFieldsAsIdentifiers: false,
    };

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
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
    };
  }

  normalize = ({
    audioAlertsEnabled,
    audioTheme,
    checkoutTimeout,
    checkoutTimeoutDuration,
    identifiers,
    useCustomFieldsAsIdentifiers,
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
    });

    return otherSettings;
  };

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-circulation.settings.index.otherSettings" />}
        moduleName="CHECKOUT"
        configName="other_settings"
        getInitialValues={this.getInitialValues}
        configFormComponent={CheckoutSettingsForm}
        stripes={this.props.stripes}
        onBeforeSave={this.normalize}
      />
    );
  }
}

export default withStripes(CheckoutSettings);
