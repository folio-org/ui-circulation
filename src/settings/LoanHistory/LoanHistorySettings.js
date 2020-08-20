import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
  head,
  isEmpty,
  cloneDeep,
} from 'lodash';

import {
  stripesShape,
  withStripes,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import normalize from './utils/normalize';
import LoanHistoryForm from './LoanHistoryForm';
// import { LoanHistory as validateLoanHistory } from '../Validation';

class LoanHistorySettings extends React.Component {
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
      closingType: {
        loan: null,
        feeFine: null,
        loanExceptions: [],
      },
      loan: {},
      feeFine: {},
      loanExceptions: [],
      treatEnabled: false,
    };

    try {
      config = { ...defaultConfig, ...JSON.parse(value) };
    } catch (e) {
      config = defaultConfig;
    }

    return { ...config };
  }

  normalizeData = (value) => {
    const { closingType, loan, feeFine, loanExceptions, treatEnabled } = normalize(value);
    const loanHistorySettings = {
      closingType: cloneDeep(closingType),
      loan,
      feeFine,
      loanExceptions,
      treatEnabled
    };

    loanHistorySettings.closingType.feeFine = treatEnabled
      ? loanHistorySettings.closingType.feeFine
      : null;

    return JSON.stringify(loanHistorySettings);
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
        onBeforeSave={this.normalizeData}
      />
    );
  }
}

export default withStripes(LoanHistorySettings);
