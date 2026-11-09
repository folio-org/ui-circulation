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
  closingTypesMap,
  userSpecificClosingTypesMap,
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
    userSpecific: {},
    loanExceptions: [],
    treatEnabled: false,
  };
  const initialValues = {
    ...defaultConfig,
    ...settings,
  };

  // Show what the backend applies to missing values: closed loans are never anonymized without a library
  // policy, and settings saved before this feature have no closingType.userSpecific, which counts as disabled
  return {
    ...initialValues,
    closingType: {
      ...initialValues.closingType,
      loan: initialValues.closingType?.loan ?? closingTypesMap.NEVER,
      userSpecific: initialValues.closingType?.userSpecific ?? userSpecificClosingTypesMap.DISABLED,
    },
  };
};

export const normalizeData = (value) => {
  const { closingType, loan, feeFine, userSpecific, loanExceptions, treatEnabled } = normalize(value);
  const loanHistorySettings = {
    closingType: cloneDeep(closingType),
    loan,
    feeFine,
    userSpecific,
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
