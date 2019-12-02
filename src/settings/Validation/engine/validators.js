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
  isOverdueGreaterThan,
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
  isOverdueGreaterThan: {
    validate: isOverdueGreaterThan,
    message: <FormattedMessage id="ui-circulation.settings.validate.greaterThanZero" />,
  },
  isItemLimitIsInInterval: {
    validate: value => isInIntervalOrNull(1, 9999, value),
    message: <FormattedMessage id="ui-circulation.settings.validate.itemLimitInterval" />,
  }
};
