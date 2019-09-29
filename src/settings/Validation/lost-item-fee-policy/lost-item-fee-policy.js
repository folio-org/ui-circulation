import LostItemFeePolicy from '../../Models/LostItemFeePolicy';
import FormValidator from '../engine/FormValidator';
import lostItemFee from './lost-item-fee';

export default function (policy) {
  const lostItemFeePolicy = new LostItemFeePolicy(policy);

  const config = {
    ...lostItemFee(lostItemFeePolicy),
  };

  const formValidator = new FormValidator(config);
  return formValidator.validate(policy);
}
