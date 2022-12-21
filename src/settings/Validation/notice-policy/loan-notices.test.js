import loanNotices from './loan-notices';
import { loanTimeBasedEventsIds } from '../../../constants';
import sectionConfigGenerator from './section-config-generator';

jest.mock('./section-config-generator', () => jest.fn());

describe('loanNotices', () => {
  it('should trigger "sectionConfigGenerator" with correct arguments', () => {
    const policy = {};
    loanNotices(policy);

    expect(sectionConfigGenerator).toHaveBeenCalledWith(policy, 'loanNotices', loanTimeBasedEventsIds);
  });
});
