import sectionConfigGenerator from './section-config-generator';

import { loanTimeBasedEventsIds } from '../../../constants';

const loanNotices = (policy) => {
  return sectionConfigGenerator(policy, 'loanNotices', loanTimeBasedEventsIds);
};

export default loanNotices;
