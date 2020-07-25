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
  isStringGreaterThanZero,
  isMaximumFineValueValid,
  hasNoChargeLostItemProcessingFee,
  hasLostItemProcessingFeeValue,
  hasPositivereplacementAllowed,
  hasPatronBilledAfterAgedToLostValue,
  hasChargeAmountItemSystemSelected,
  isToBeforeFrom,
  isDueAfterTo,
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
  },
  hasOverdueFineInterval: {
    validate: isStringGreaterThanZero,
    message: <FormattedMessage id="ui-circulation.settings.finePolicy.validate.hasOverdueFineInterval" />
  },
  hasOverdueRecallFineInterval: {
    validate: isStringGreaterThanZero,
    message: <FormattedMessage id="ui-circulation.settings.finePolicy.validate.hasOverdueRecallFineInterval" />
  },
  isMaximumOverdueFineValid: {
    validate: isMaximumFineValueValid.bind(null, 'overdueFine.quantity'),
    message: <FormattedMessage id="ui-circulation.settings.finePolicy.validate.invalidMaximumOverdueFine" />
  },
  isMaximumOverdueRecallFineValid: {
    validate: isMaximumFineValueValid.bind(null, 'overdueRecallFine.quantity'),
    message: <FormattedMessage id="ui-circulation.settings.finePolicy.validate.invalidMaximumRecallOverdueFine" />
  },
  hasPatronBilledAfterAgedToLostValue : {
    validate: hasPatronBilledAfterAgedToLostValue,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasPatronBilledAfterAgedToLostValue" />
  },
  hasItemsAgedToLostAfterOverdueValue: {
    validate: isNotEmpty,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasItemsAgedToLostAfterOverdueValue" />
  },
  hasPositiveLostItemProcessingFeeValue: {
    validate: isStringGreaterThanZero,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasPositiveLostItemProcessingFeeValue" />
  },
  hasNoChargeLostItemProcessingFee: {
    validate: hasNoChargeLostItemProcessingFee,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasNoChargeLostItemProcessingFee" />
  },
  hasLostItemProcessingFeeValue: {
    validate: hasLostItemProcessingFeeValue,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasLostItemProcessingFeeValue" />
  },
  hasPositiveReplacementProcessingFee: {
    validate: hasPositivereplacementAllowed,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasPositiveReplacementProcessingFee" />
  },
  hasReplacedLostItemProcessingFee: {
    validate: hasPositivereplacementAllowed,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasReplacedLostItemProcessingFee" />
  },
  chargeAmountItemSystemSelected: {
    validate: hasChargeAmountItemSystemSelected,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.chargeAmountItemSystemSelected" />
  },
  isToBeforeFrom: {
    validate: isToBeforeFrom,
    message: <FormattedMessage id="ui-circulation.settings.fDDS.validate.toDate" />
  },
  isDueAfterTo: {
    validate: isDueAfterTo,
    message: <FormattedMessage id="ui-circulation.settings.fDDS.validate.onOrAfter" />
  },
  hasPositiveCheckoutTimeoutDuration: {
    validate: isIntegerGreaterThanZero,
    message: <FormattedMessage id="ui-circulation.settings.checkout.validate.timeoutDuration" />
  },
};
