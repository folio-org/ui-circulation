import sectionConfigGenerator from './section-config-generator';

import { requestTimeBasedEventsIds } from '../../../constants';

export default function (policy) {
  return sectionConfigGenerator(policy, 'requestNotices', requestTimeBasedEventsIds);
}
