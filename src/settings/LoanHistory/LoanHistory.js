import React from 'react';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import {
  isEmpty,
  isInteger,
} from 'lodash';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import LoanHistoryForm from './LoanHistoryForm';
import { closingTypesMap } from '../../constants';

const selectedPeriodsValues = [
  'Days',
  'Weeks',
  'Months',
];

class LoanHistorySettings extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      stripes,
      intl,
    } = props;

    this.configManager = stripes.connect(ConfigManager);
    this.formatMessage = intl.formatMessage;
  }

  getInitialValues(settings) {
    const value = settings.length === 0 ? '' : settings[0].value;
    const defaultConfig = {
      closingType: '',
      treatEnabled: false,
      intervalValue: '',
      selectedPeriodsValues
    };
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    return config.closingType !== closingTypesMap.INTERVAL ? defaultConfig : config;
  }

  validate = values => {
    const errors = {};
    const intervalValue = Number(values.intervalValue);
    const isNumberValid = isInteger(intervalValue) && intervalValue > 0;
    const isIntervalValueValid = !isNumberValid && (values.closingType === closingTypesMap.INTERVAL || !isEmpty(values.intervalValue));

    if (isIntervalValueValid) {
      errors.intervalValue = { _error: <FormattedMessage id="ui-circulation.settings.loanHistory.validate.intervalValue" /> };
    }

    const isIntervalTypeValid = !values.intervalType && values.closingType === closingTypesMap.INTERVAL;

    if (isIntervalTypeValid) {
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
        configFormComponent={LoanHistoryForm}
        stripes={this.props.stripes}
        getInitialValues={this.getInitialValues}
        validate={this.validate}
      />
    );
  }
}

export default injectIntl(withStripes(LoanHistorySettings));
