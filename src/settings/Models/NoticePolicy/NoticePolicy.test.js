// eslint-disable-next-line max-classes-per-file
import NoticePolicy from './NoticePolicy';
import Notice from './Notice';
import { Metadata } from '../common';
import { noticesFrequencyMap } from '../../../constants';

jest.mock('./Notice', () => class {
  constructor(notice) {
    this.notice = notice;
  }
});

jest.mock('../common', () => ({
  Metadata: class {
    constructor(metadata) {
      this.metadata = metadata;
    }
  },
}));

describe('NoticePolicy', () => {
  const notice = {
    templateId: 'id',
    format: 'format',
    frequency: noticesFrequencyMap.RECURRING,
    realTime: 'realTime',
  };
  const basicPolicy = {
    id: 'id',
    name: 'name',
    descrition: 'description',
    active: true,
    metadata: {
      createdByUserId: 'id',
      createdDate: 'createdDate',
      updatedByUserId: 'id_2',
      updatedDate: 'updatedDate',
    },
  };
  const policy = {
    ...basicPolicy,
    loanNotices: [notice],
    requestNotices: [notice],
    feeFineNotices: [notice],
  };
  const noticePolicy = new NoticePolicy(policy);

  it('should have correct properties', () => {
    expect(noticePolicy).toEqual(expect.objectContaining({
      ...basicPolicy,
      metadata: {
        metadata: basicPolicy.metadata,
      },
      loanNotices: [{
        notice,
      }],
      requestNotices: [{
        notice,
      }],
      feeFineNotices: [{
        notice,
      }],
    }));
  });

  it('"loanNotices" should contain instances of "Notice"', () => {
    noticePolicy.loanNotices.forEach(item => {
      expect(item).toBeInstanceOf(Notice);
    });
  });

  it('"requestNotices" should contain instances of "Notice"', () => {
    noticePolicy.requestNotices.forEach(item => {
      expect(item).toBeInstanceOf(Notice);
    });
  });

  it('"feeFineNotices" should contain instances of "Notice"', () => {
    noticePolicy.feeFineNotices.forEach(item => {
      expect(item).toBeInstanceOf(Notice);
    });
  });

  it('"metadata" property should be instance of "Metadata"', () => {
    expect(noticePolicy.metadata).toBeInstanceOf(Metadata);
  });

  it('"defaultNoticePolicy" should return correct data', () => {
    expect(NoticePolicy.defaultNoticePolicy()).toEqual({});
  });

  it('should have correct properties if policy is not provided', () => {
    const noticePolicyInstance = new NoticePolicy();
    const expectedResult = {
      id: undefined,
      name: undefined,
      descrition: undefined,
      active: undefined,
      metadata: {
        metadata: undefined,
      },
      loanNotices: [],
      requestNotices: [],
      feeFineNotices: [],
    };

    expect(noticePolicyInstance).toEqual(expect.objectContaining(expectedResult));
  });
});
