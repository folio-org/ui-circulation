import sectionConfigGenerator from './section-config-generator';

import { feeFineEventsIds } from '../../../constants';

export default function (policy) {
  return sectionConfigGenerator(policy, 'feeFineNotices', feeFineEventsIds);
}
