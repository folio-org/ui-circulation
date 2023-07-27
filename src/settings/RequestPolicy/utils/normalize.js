import { isEmpty } from 'lodash';
import {
  REQUEST_TYPE_RULES,
  requestPolicyTypes,
} from '../../../constants';

const normalize = (policy) => {
  const requestTypes = policy.requestTypes.reduce((acc, type, index) => {
    if (type) {
      acc.push(requestPolicyTypes[index]);
    }
    return acc;
  }, []);
  const allowedServicePoints = {};

  requestTypes.forEach((key) => {
    if (policy.allowedServicePoints[key] && policy.requestTypesRules[key] === REQUEST_TYPE_RULES.ALLOW_SOME) {
      allowedServicePoints[key] = policy.allowedServicePoints[key].map(({ value }) => value);
    }
  });

  delete policy.requestTypesRules;

  if (isEmpty(allowedServicePoints)) {
    delete policy.allowedServicePoints;

    return {
      ...policy,
      requestTypes,
    };
  }

  return {
    ...policy,
    requestTypes,
    allowedServicePoints,
  };
};

export default normalize;
