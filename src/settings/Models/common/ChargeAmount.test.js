import ChargeAmount from './ChargeAmount';
import { commonClassCheck } from '../../../../test/jest/helpers/utils';

const testChargeAmount = commonClassCheck.bind(null, ChargeAmount);

describe('ChargeAmount', () => {
  testChargeAmount();

  testChargeAmount({ chargeType: 'testChargeType' });

  testChargeAmount({ amount: 'testAmount' });
});
