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
  hasPositiveReplacementAllowed,
  hasPatronBilledAfterAgedToLostValue,
  hasChargeAmountItemSystemSelected,
  isToBeforeFrom,
  isDueAfterTo,
  isRquiredLostItemCharge,
  hasPositiveItemsAgedToLostAfterOverdueAmount,
  hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue,
  hasReplacementAllowedAndPositiveLostItemPolicyFee,
  hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue,
  hasReplacementAllowedAndNegativeLostItemPolicyFee,
  hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee,
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
    validate: isRquiredLostItemCharge,
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
  hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue: {
    validate: hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasPositiveLostItemProcessingFeeAndItemsAgedToLostAfterOverdue" />
  },
  hasPositiveReplacementProcessingFee: {
    validate: hasPositiveReplacementAllowed,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasPositiveReplacementProcessingFee" />
  },
  hasReplacementAllowedAndPositiveLostItemPolicyFee: {
    validate: hasReplacementAllowedAndPositiveLostItemPolicyFee,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasReplacementAllowedAndPositiveLostItemPolicyFee" />
  },
  hasReplacementAllowedAndNegativeLostItemPolicyFee: {
    validate: hasReplacementAllowedAndNegativeLostItemPolicyFee,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasReplacementAllowedAndNegativeLostItemPolicyFee" />
  },
  hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee: {
    validate: hasNegativeReplacementAllowedAndPositiveLostItemPolicyFee,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasLostItemProcessingFeeValue" />
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
  hasAmount: {
    validate: isNotEmpty,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.emptyAmount" />
  },
  hasPositiveItemsAgedToLostAfterOverdueAmount: {
    validate: hasPositiveItemsAgedToLostAfterOverdueAmount,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasPositiveItemsAgedToLostAfterOverdueAmount" />
  },
  hasInvalidLostItemPolicyFee: {
    validate: hasPositiveLostItemProcessingFeeAndInvalidItemsAgedToLostAfterOverdue,
    message: <FormattedMessage id="ui-circulation.settings.lostItemFee.validate.hasLostItemProcessingFeeValue" />
  }
};
