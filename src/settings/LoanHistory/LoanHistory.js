import React from 'react';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import {
  isInteger,
  setWith,
} from 'lodash';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import LoanHistoryForm from './LoanHistoryForm';
import {
  closingTypesMap,
  closedLoansRules,
} from '../../constants';

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
      closingType: {},
      treatEnabled: false,
      selectedPeriodsValues
    };
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    return config;
  }

  validate = values => {
    const errors = {};

    Object.values(closedLoansRules).forEach(item => {
      const durationValue = values[item] && Number(values[item].duration);
      const isNumberValid = isInteger(durationValue) && durationValue > 0;

      if (values.closingType[item] === closingTypesMap.INTERVAL && !isNumberValid) {
        const duration = { _error: <FormattedMessage id="ui-circulation.settings.loanHistory.validate.intervalValue" /> };

        setWith(errors, [item, 'duration'], duration);
      }

      const isIntervalIdValid = values[item] && values[item].intervalId;

      if (values.closingType[item] === closingTypesMap.INTERVAL && !isIntervalIdValid) {
        const intervalId = { _error: <FormattedMessage id="ui-circulation.settings.loanHistory.validate.selectContinue" /> };

        setWith(errors, [item, 'intervalId'], intervalId);
      }
    });

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
