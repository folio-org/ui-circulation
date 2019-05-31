import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  injectIntl
} from 'react-intl';
import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';
import {
  isEmpty,
  isInteger,
} from 'lodash';

import { closingTypesMap } from '../../constants';
import LoanHistoryForm from './LoanHistoryForm';

class LoanHistorySettings extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    intl: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
    this.formatMessage = props.intl.formatMessage;
  }

  // eslint-disable-next-line class-methods-use-this
  getInitialValues = settings => {
    const value = settings.length === 0 ? '' : settings[0].value;
    const defaultConfig = {
      closingType: '',
      treatEnabled: false,
      intervalType: this.formatMessage({ id: 'ui-circulation.settings.loanHistory.selectInterval' }),
      intervalValue: ''
    };
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    if (config.closingType !== closingTypesMap.INTERVAL) {
      return defaultConfig;
    }
    return config;
  }

  validate = values => {
    const errors = {};
    const isIntervalValueValid = isInteger(+values.intervalValue) && +values.intervalValue > 0;
    if (!isIntervalValueValid && (values.closingType === closingTypesMap.INTERVAL || !isEmpty(values.intervalValue))) {
      errors.intervalValue = { _error: <FormattedMessage id="ui-circulation.settings.loanHistory.validate.intervalValue" /> };
    }

    const isIntervalTypeValid = values.intervalType !== this.formatMessage({ id: 'ui-circulation.settings.loanHistory.selectInterval' });
    if (!isIntervalTypeValid && values.closingType === closingTypesMap.INTERVAL) {
      errors.intervalType = { _error: <FormattedMessage id="ui-circulation.settings.loanHistory.validate.selectContinue" /> };
    }
    return errors;
  }

  render() {
    return (
      <this.configManager
        label={<FormattedMessage id="ui-circulation.settings.index.loanHistory" />}
        moduleName="LOAN_HISTORY"
        configName="loan_history"
        getInitialValues={this.getInitialValues}
        validate={this.validate}
        configFormComponent={LoanHistoryForm}
        stripes={this.props.stripes}
      />
    );
  }
}

export default injectIntl(withStripes(LoanHistorySettings));
