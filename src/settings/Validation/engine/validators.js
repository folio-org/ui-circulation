import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  isNotEmpty,
  isIntegerGreaterThanZero,
  isIntegerGreaterThanOrEqualToZero,
  isPositiveNumber,
  isInInterval,
  isInIntervalOrNull,
  isNotEmptyEditor,
  isSelected,
  isGreaterOrEqualThanPassedField,
  isStringGreaterThanOrEqualToZero,
} from './handlers';

export default {
  isNotEmpty: {
    validate: isNotEmpty,
    message: <FormattedMessage id="ui-circulation.settings.validate.fillIn" />,
  },
  isNotEmptySelect: {
    validate: isNotEmpty,
    message: <FormattedMessage id="ui-circulation.settings.validate.select" />,
  },
  isNotEmptyLostItem: {
    validate: isNotEmpty,
    message: <FormattedMessage id="ui-circulation.settings.validate.lostItem" />,
  },
  isIntegerGreaterThanZero: {
    validate: isIntegerGreaterThanZero,
    message: <FormattedMessage id="ui-circulation.settings.validate.greaterThanZero" />,
  },
  isStringGreaterThanOrEqualToZero: {
    validate: isStringGreaterThanOrEqualToZero,
    message: <FormattedMessage id="ui-circulation.settings.validate.greaterThanOrEqualToZero" />,
  },
  isIntegerGreaterThanOrEqualToZero: {
    validate: isIntegerGreaterThanOrEqualToZero,
    message: <FormattedMessage id="ui-circulation.settings.validate.greaterThanOrEqualToZero" />,
  },
  isPositiveNumber: {
    validate: isPositiveNumber,
    message: <FormattedMessage id="ui-circulation.settings.validate.isPositiveNumber" />,
  },
  isFromOneToHundred: {
    validate: isInInterval.bind(null, 1, 100),
    message: <FormattedMessage id="ui-circulation.settings.validate.isFromOneToHundred" />,
  },
  isNotEmptyEditor: {
    validate: isNotEmptyEditor,
    message: <FormattedMessage id="ui-circulation.settings.validate.fillIn" />,
  },
  isItemLimitIsInInterval: {
    validate: value => isInIntervalOrNull(1, 9999, value),
    message: <FormattedMessage id="ui-circulation.settings.validate.itemLimitInterval" />,
  },
  isSelected: {
    validate: isSelected,
    message: <FormattedMessage id="ui-circulation.settings.validate.fillIn" />,
  },
  isGreaterThanOverdueFine: {
    validate: isGreaterOrEqualThanPassedField.bind(null, 'overdueFine.quantity'),
    message: <FormattedMessage id="ui-circulation.settings.finePolicy.validate.maximumOverdueFine" />,
  },
  isGreaterThanOverdueRecallFine: {
    validate: isGreaterOrEqualThanPassedField.bind(null, 'overdueRecallFine.quantity'),
    message: <FormattedMessage id="ui-circulation.settings.finePolicy.validate.maximumRecallOverdueFine" />,
  }
};
