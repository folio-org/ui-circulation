import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  head,
  isEmpty,
  cloneDeep,
} from 'lodash';

import {
  stripesShape,
  withStripes,
  TitleManager,
} from '@folio/stripes/core';
import { ConfigManager } from '@folio/stripes/smart-components';

import normalize from './utils/normalize';
import LoanHistoryForm from './LoanHistoryForm';

export const getInitialValues = (settings) => {
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
};

export const normalizeData = (value) => {
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
};

class LoanHistorySettings extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.configManager = props.stripes.connect(ConfigManager);
  }

  render() {
    const {
      intl: {
        formatMessage,
      },
    } = this.props;

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={formatMessage({ id: 'ui-circulation.settings.title.loanAnonymization' })}
      >
        <this.configManager
          label={formatMessage({ id: 'ui-circulation.settings.index.loanAnonymization' })}
          moduleName="LOAN_HISTORY"
          configName="loan_history"
          configFormComponent={LoanHistoryForm}
          stripes={this.props.stripes}
          getInitialValues={getInitialValues}
          onBeforeSave={normalizeData}
        />
      </TitleManager>
    );
  }
}

export default injectIntl(withStripes(LoanHistorySettings));
