import ChargeAmount from './ChargeAmount';
import {
  commonClassCheckForEachProp,
  commonClassCheckForAllProps,
} from '../../../../test/jest/helpers/utils';

describe('ChargeAmount', () => {
  const testData = {
    chargeType: 'testChargeType',
    amount: 'testAmount',
  };

  commonClassCheckForEachProp(ChargeAmount, testData);

  commonClassCheckForAllProps(ChargeAmount, testData);
});
