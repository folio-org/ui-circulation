import React from 'react';
import PropTypes from 'prop-types';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import ConfigManager from '@folio/stripes-smart-components/lib/ConfigManager';

import { patronIdentifierTypes } from '../constants';
import CheckoutSettingsForm from './CheckoutSettingsForm';

class CheckoutSettings extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
    this.validate = this.validate.bind(this);
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
  validate(values) {
    const errors = {};
    const idents = values.idents;
    if (!idents) return errors;
    const isValid = idents.reduce((valid, v) => (valid || v), false);
    if (!isValid) {
      errors.idents = { _error: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.checkout.validate.selectContinue' }) };
    }
    return errors;
  }

  render() {
    return (
      <this.configManager
        label={this.props.label} // already translated
        moduleName="CHECKOUT"
        configName="other_settings"
        getInitialValues={this.getInitialValues}
        validate={this.validate}
        configFormComponent={CheckoutSettingsForm}
        stripes={this.props.stripes}
      />
    );
  }
}

export default CheckoutSettings;
