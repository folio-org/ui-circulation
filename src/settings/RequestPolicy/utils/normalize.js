import { requestPolicyTypes } from '../../../constants';

export default function (policy) {
  const requestTypes = policy.requestTypes.reduce((acc, type, index) => {
    if (type) {
      acc.push(requestPolicyTypes[index]);
    }
    return acc;
  }, []);

  return { ...policy, requestTypes };
}
