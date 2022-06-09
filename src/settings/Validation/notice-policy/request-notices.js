import sectionConfigGenerator from './section-config-generator';

import { requestTimeBasedEventsIds } from '../../../constants';

const requestNotices = (policy) => {
  return sectionConfigGenerator(policy, 'requestNotices', requestTimeBasedEventsIds);
};

export default requestNotices;
