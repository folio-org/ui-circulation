import feeFineNotices from './fee-fine-notices';
import { timeBasedFeeFineEventsIds } from '../../../constants';
import sectionConfigGenerator from './section-config-generator';

jest.mock('./section-config-generator', () => jest.fn());

describe('feeFineNotices', () => {
  it('should trigger "sectionConfigGenerator" with correct arguments', () => {
    const policy = {};
    feeFineNotices(policy);

    expect(sectionConfigGenerator).toHaveBeenCalledWith(policy, 'feeFineNotices', timeBasedFeeFineEventsIds);
  });
});
