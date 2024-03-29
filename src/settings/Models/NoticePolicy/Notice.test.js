import Notice from './Notice';
import NoticeSendOptions from './NoticeSendOptions';
import { noticesFrequencyMap } from '../../../constants';

jest.mock('./NoticeSendOptions', () => class {
  constructor(options) {
    this.options = options;
  }
});

describe('Notice', () => {
  const noticeProp = {
    templateId: 'id',
    format: 'test',
    frequency: noticesFrequencyMap.RECURRING,
    realTime: 'realTime',
    sendOptions: {},
  };
  const notice = new Notice(noticeProp);

  it('should have correct properties', () => {
    expect(notice).toEqual(expect.objectContaining({
      ...noticeProp,
      sendOptions: {
        options: {},
      },
    }));
  });

  it('should have correct properties if "notice" is not provided', () => {
    const noticeInstance = new Notice();
    const expectedResult = {
      templateId: undefined,
      format: undefined,
      frequency: undefined,
      realTime: undefined,
      sendOptions: {
        options: undefined,
      },
    };

    expect(noticeInstance).toEqual(expect.objectContaining(expectedResult));
  });

  describe('"sendOptions" property', () => {
    it('should be instance of "NoticeSendOptions"', () => {
      expect(notice.sendOptions).toBeInstanceOf(NoticeSendOptions);
    });
  });

  describe('isRecurring', () => {
    it('should return true if "frequency" equals "Recurring"', () => {
      expect(notice.isRecurring()).toEqual(true);
    });

    it('should return false if "frequency" is not equal "Recurring"', () => {
      const noticeInstance = new Notice({
        ...notice,
        frequency: 'test',
      });

      expect(noticeInstance.isRecurring()).toEqual(false);
    });
  });
});
