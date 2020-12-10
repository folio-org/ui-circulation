import sectionConfigGenerator from './section-config-generator';

import { timeBasedFeeFineEventsIds } from '../../../constants';

export default function (policy) {
  return sectionConfigGenerator(policy, 'feeFineNotices', timeBasedFeeFineEventsIds);
}
