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

  it('should return correct data for "defaultNoticePolicy"', () => {
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

  describe('"loanNotices" property', () => {
    noticePolicy.loanNotices.forEach((item, index) => {
      it(`should contain instance of "Notice" for array element with index ${index}`, () => {
        expect(item).toBeInstanceOf(Notice);
      });
    });
  });

  describe('"requestNotices" property', () => {
    noticePolicy.requestNotices.forEach((item, index) => {
      it(`should contain instance of "Notice" for array element with index ${index}`, () => {
        expect(item).toBeInstanceOf(Notice);
      });
    });
  });

  describe('"feeFineNotices" property', () => {
    noticePolicy.feeFineNotices.forEach((item, index) => {
      it(`should contain instance of "Notice" for array element with index ${index}`, () => {
        expect(item).toBeInstanceOf(Notice);
      });
    });
  });

  describe('"metadata" property', () => {
    it('should be instance of "Metadata"', () => {
      expect(noticePolicy.metadata).toBeInstanceOf(Metadata);
    });
  });
});
