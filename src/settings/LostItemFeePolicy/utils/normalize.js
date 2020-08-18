import {
  cloneDeep,
  forEach,
  get,
  unset,
} from 'lodash';

import { LostItem } from '../../Models/common';

export default function checkInvalid(policy) {
  const lostItemPolicy = cloneDeep(policy);

  const periodsList = [
    'itemAgedLostOverdue',
    'patronBilledAfterAgedLost',
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
}
