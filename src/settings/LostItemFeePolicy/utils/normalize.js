import {
  cloneDeep,
  forEach,
  get,
  isBoolean,
  unset,
} from 'lodash';

import { LostItem } from '../../Models/common';

const convertToBoolean = (value) => {
  return isBoolean(value) ? value : value === 'true';
};

const checkInvalid = (policy) => {
  const lostItemPolicy = cloneDeep(policy);

  const periodsList = [
    'itemAgedLostOverdue',
    'patronBilledAfterAgedLost',
    'recalledItemAgedLostOverdue',
    'patronBilledAfterRecalledItemAgedLost',
    'lostItemChargeFeeFine',
    'feesFinesShallRefunded',
  ];

  forEach(periodsList, (path) => {
    const period = get(lostItemPolicy, path);
    if (!LostItem.isPeriodValid(period)) {
      unset(lostItemPolicy, path);
    }
  });

  return lostItemPolicy;
};

export const transformModelBooleans = (model) => {
  const policy = cloneDeep(model);

  const fieldsToTransform = [
    'chargeAmountItemPatron',
    'chargeAmountItemSystem',
    'returnedLostItemProcessingFee',
    'replacedLostItemProcessingFee',
    'replacementAllowed'
  ];

  forEach(fieldsToTransform, (field) => {
    const value = convertToBoolean(get(policy, field));
    policy[field] = value;
  });

  return policy;
};

const filter = (entity, ...callbacks) => {
  let filteredEntity = cloneDeep(entity);

  forEach(callbacks, (callback) => {
    filteredEntity = callback(filteredEntity);
  });

  return filteredEntity;
};

const normalize = (entity) => {
  const callbacks = [
    checkInvalid,
    transformModelBooleans,
  ];

  return filter(entity, ...callbacks);
};

export default normalize;
