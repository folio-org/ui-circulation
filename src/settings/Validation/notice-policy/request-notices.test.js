import requestNotices from './request-notices';
import { requestTimeBasedEventsIds } from '../../../constants';
import sectionConfigGenerator from './section-config-generator';

jest.mock('./section-config-generator', () => jest.fn());

describe('requestNotices', () => {
  it('should trigger "sectionConfigGenerator" with correct arguments', () => {
    const policy = {};
    requestNotices(policy);

    expect(sectionConfigGenerator).toHaveBeenCalledWith(policy, 'requestNotices', requestTimeBasedEventsIds);
  });
});
