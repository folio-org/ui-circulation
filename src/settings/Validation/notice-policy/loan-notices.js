import sectionConfigGenerator from './section-config-generator';

import { loanTimeBasedEventsIds } from '../../../constants';

export default function (policy) {
  return sectionConfigGenerator(policy, 'loanNotices', loanTimeBasedEventsIds);
}
