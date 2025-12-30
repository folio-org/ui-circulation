import {
  useIntl,
} from 'react-intl';
import {
  cloneDeep,
} from 'lodash';

import {
  TitleManager,
} from '@folio/stripes/core';

import {
  CirculationSettingsConfig,
} from '../components';
import normalize from './utils/normalize';
import LoanHistoryForm from './LoanHistoryForm';
import {
  CONFIG_NAMES,
} from '../../constants';

export const getInitialValues = (settings) => {
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

  return {
    ...defaultConfig,
    ...settings,
  };
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

  return loanHistorySettings;
};

const LoanHistorySettings = () => {
  const {
    formatMessage,
  } = useIntl();

  return (
    <TitleManager
      page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
      record={formatMessage({ id: 'ui-circulation.settings.title.loanAnonymization' })}
    >
      <CirculationSettingsConfig
        label={formatMessage({ id: 'ui-circulation.settings.index.loanAnonymization' })}
        configName={CONFIG_NAMES.LOAN_HISTORY}
        configFormComponent={LoanHistoryForm}
        getInitialValues={getInitialValues}
        onBeforeSave={normalizeData}
      />
    </TitleManager>
  );
};

export default LoanHistorySettings;
