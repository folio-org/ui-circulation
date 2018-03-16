import React from 'react';
import PropTypes from 'prop-types';
import ConfigManager from '@folio/stripes-smart-components/lib/ConfigManager';

import { patronIdentifierTypes } from '../constants';
import CheckoutSettingsForm from './CheckoutSettingsForm';

class CheckoutSettings extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  // eslint-disable-next-line class-methods-use-this
  getInitialValues(settings) {
    const value = settings.length === 0 ? '' : settings[0].value;
    const defaultConfig = { prefPatronIdentifier: '', audioAlertsEnabled: false };
    let config;

    try {
      config = Object.assign({}, defaultConfig, JSON.parse(value));
    } catch (e) {
      config = defaultConfig;
    }

    const { audioAlertsEnabled, prefPatronIdentifier } = config;
    const values = (prefPatronIdentifier) ? prefPatronIdentifier.split(',') : [];
    const idents = patronIdentifierTypes.map(i => (values.indexOf(i.key) >= 0));

    return { idents, audioAlertsEnabled };
  }

  render() {
    return (
      <this.configManager
        label={this.props.label}
        moduleName="CHECKOUT"
        configName="other_settings"
        getInitialValues={this.getInitialValues}
        configFormComponent={CheckoutSettingsForm}
      />
    );
  }
}

export default CheckoutSettings;
