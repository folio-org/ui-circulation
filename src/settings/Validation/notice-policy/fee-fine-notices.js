import sectionConfigGenerator from './section-config-generator';

import { timeBasedFeeFineEventsIds } from '../../../constants';

const feeFineNotices = (policy) => {
  return sectionConfigGenerator(policy, 'feeFineNotices', timeBasedFeeFineEventsIds);
};

export default feeFineNotices;
