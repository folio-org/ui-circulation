import { requestPolicyTypes } from '../../../constants';

const normalize = (policy) => {
  const requestTypes = policy.requestTypes.reduce((acc, type, index) => {
    if (type) {
      acc.push(requestPolicyTypes[index]);
    }
    return acc;
  }, []);

  return { ...policy, requestTypes };
};

export default normalize;
