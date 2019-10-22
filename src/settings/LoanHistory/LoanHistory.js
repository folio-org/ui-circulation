import React from 'react';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import LoanHistoryForm from './LoanHistoryForm';
import { LoanHistory as validateLoanHistory } from '../Validation';

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
      closingType: {
        loan: null,
        feeFine: null,
        loanExceptions: [],
      },
      loan: {},
      feeFine: {},
      loanExceptions: [],
      treatEnabled: false,
      selectedPeriodsValues,
    };
    let config;

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    return config;
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
        validate={validateLoanHistory}
      />
    );
  }
}

export default injectIntl(withStripes(LoanHistorySettings));
