import React from 'react';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { stripesShape, withStripes } from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import { patronIdentifierTypes } from '../constants';
import CheckoutSettingsForm from './CheckoutSettingsForm';

class CheckoutSettings extends React.Component {
  static propTypes = {
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
    const defaultConfig = { prefPatronIdentifier: '',
      audioAlertsEnabled: false,
      checkoutTimeout: true,
      checkoutTimeoutDuration: 3 };
    let config;

    try {
      config = Object.assign({}, defaultConfig, JSON.parse(value));
    } catch (e) {
      config = defaultConfig;
    }
    const { audioAlertsEnabled, prefPatronIdentifier, checkoutTimeout, checkoutTimeoutDuration } = config;
    const values = (prefPatronIdentifier) ? prefPatronIdentifier.split(',') : [];
    const idents = patronIdentifierTypes.map(i => (values.indexOf(i.key) >= 0));

    return { idents, audioAlertsEnabled, checkoutTimeout, checkoutTimeoutDuration };
  }

  validate(values, allthevalues) {
    const errors = {};

    const isValid = values.idents && values.idents.reduce((valid, v) => (valid || v), false);
    if (!isValid) {
      errors.idents = { _error: <FormattedMessage id="ui-circulation.settings.checkout.validate.selectContinue" /> };
    }

    if (!values.checkoutTimeout) {
      values.checkoutTimeoutDuration = allthevalues.initialValues.checkoutTimeoutDuration;
    }
    const checkoutTimeoutDuration = (_.isInteger(+values.checkoutTimeoutDuration) && (+values.checkoutTimeoutDuration > 0));
    if (!checkoutTimeoutDuration) {
      errors.checkoutTimeoutDuration = { _error: <FormattedMessage id="ui-circulation.settings.checkout.validate.timeoutDuration" /> };
    }
    return errors;
  }

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-circulation.settings.index.otherSettings" />}
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

export default withStripes(CheckoutSettings);
