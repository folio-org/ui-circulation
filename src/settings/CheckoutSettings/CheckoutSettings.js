import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  head,
  isEmpty,
} from 'lodash';

import { stripesShape, withStripes } from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import CheckoutSettingsForm from './CheckoutSettingsForm';
import { patronIdentifierTypes } from '../../constants';

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
      prefPatronIdentifier: '',
      audioAlertsEnabled: false,
      checkoutTimeout: true,
      checkoutTimeoutDuration: 3,
    };

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }
    const { prefPatronIdentifier } = config;

    const values = prefPatronIdentifier ? prefPatronIdentifier.split(',') : [];
    const idents = patronIdentifierTypes.map(i => (values.indexOf(i.key) >= 0));

    return {
      audioAlertsEnabled: config.audioAlertsEnabled,
      checkoutTimeout: config.checkoutTimeout,
      checkoutTimeoutDuration: config.checkoutTimeoutDuration,
      idents,
    };
  }

  normalize = ({ audioAlertsEnabled, checkoutTimeout, checkoutTimeoutDuration, idents }) => {
    const values = idents.reduce((vals, ident, index) => {
      if (ident) {
        vals.push(patronIdentifierTypes[index].key);
      }

      return vals;
    }, []);

    const otherSettings = JSON.stringify({
      audioAlertsEnabled: audioAlertsEnabled === 'true',
      prefPatronIdentifier: values.join(','),
      checkoutTimeout,
      checkoutTimeoutDuration: parseInt(checkoutTimeoutDuration, 10),
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
