import NoticeSendOptions from './NoticeSendOptions';
import { Period } from '../common';
import {
  loanTimeBasedEventsIds,
  noticesSendEventMap,
  timeBasedFeeFineEventsIds,
} from '../../../constants';

jest.mock('../common', () => ({
  Period: class {
    constructor(period) {
      this.period = period;
    }
  },
}));

describe('NoticeSendOptions', () => {
  const options = {
    sendHow: noticesSendEventMap.AFTER,
    sendWhen: loanTimeBasedEventsIds.DUE_DATE,
    sendBy: {
      duration: 1,
      intervalId: 'id',
    },
    sendEvery: {
      duration: 1,
      intervalId: 'id_2',
    },
  };

  const noticeSendOptions = new NoticeSendOptions(options);

  it('should have correct properties', () => {
    const expectedResult = {
      ...options,
      sendBy: {
        period: {
          ...options.sendBy,
        }
      },
      sendEvery: {
        period: {
          ...options.sendEvery,
        }
      }
    };

    expect(noticeSendOptions).toEqual(expect.objectContaining(expectedResult));
  });

  it('should have correct properties if "options" are not provided', () => {
    const noticeSendOptionsInstance = new NoticeSendOptions();
    const expectedResult = {
      sendHow: undefined,
      sendWhen: undefined,
      sendBy: {
        period: undefined,
      },
      sendEvery: {
        period: undefined,
      },
    };

    expect(noticeSendOptionsInstance).toEqual(expect.objectContaining(expectedResult));
  });

  describe('isSendOptionsAvailable', () => {
    it('should return true if "allowedIds" includes "sendWhen" value', () => {
      const allowedIds = [loanTimeBasedEventsIds.DUE_DATE, 'test'];

      expect(noticeSendOptions.isSendOptionsAvailable(allowedIds)).toEqual(true);
    });

    it('should return false if there is no matches', () => {
      const allowedIds = ['test'];

      expect(noticeSendOptions.isSendOptionsAvailable(allowedIds)).toEqual(false);
    });

    it('should return false if "allowedIds" is not provided', () => {
      expect(noticeSendOptions.isSendOptionsAvailable()).toEqual(false);
    });
  });

  describe('isBeforeOrAfter', () => {
    it('should return true if "sendHow" equals "After"', () => {
      expect(noticeSendOptions.isBeforeOrAfter()).toEqual(true);
    });

    it('should return true if "sendHow" equals "Before"', () => {
      const noticeSendOptionsInstance = new NoticeSendOptions({
        ...options,
        sendHow: noticesSendEventMap.BEFORE,
      });

      expect(noticeSendOptionsInstance.isBeforeOrAfter()).toEqual(true);
    });

    it('should return false if "sendHow" is not equal "Before" or "After"', () => {
      const noticeSendOptionsInstance = new NoticeSendOptions({
        ...options,
        sendHow: 'test',
      });

      expect(noticeSendOptionsInstance.isBeforeOrAfter()).toEqual(false);
    });
  });

  describe('isFrequencyAvailable', () => {
    it('should return true if "isSendOptionsAvailable" and "isBeforeOrAfter" return true', () => {
      const allowedIds = [loanTimeBasedEventsIds.DUE_DATE];

      expect(noticeSendOptions.isFrequencyAvailable(allowedIds)).toEqual(true);
    });

    it('should return false if "isSendOptionsAvailable" returns false', () => {
      expect(noticeSendOptions.isFrequencyAvailable()).toEqual(false);
    });
  });

  describe('isLoanDueDateTimeSelected', () => {
    it('should return true if "sendWhen" equals "Due date"', () => {
      expect(noticeSendOptions.isLoanDueDateTimeSelected()).toEqual(true);
    });

    it('should return false if "sendWhen" is not equal "Due date"', () => {
      const noticeSendOptionsInstance = new NoticeSendOptions({
        ...options,
        sendWhen: 'test',
      });

      expect(noticeSendOptionsInstance.isLoanDueDateTimeSelected()).toEqual(false);
    });
  });

  describe('isLostItemFeesSelected', () => {
    const noticeSendOptionsInstance = new NoticeSendOptions({
      ...options,
      sendWhen: timeBasedFeeFineEventsIds.ATL_FINE_CHARGED,
    });

    it('should return true if "sendWhen" equals "Aged to lost - fine charged"', () => {
      expect(noticeSendOptionsInstance.isLostItemFeesSelected()).toEqual(true);
    });

    it('should return false if "sendWhen" is not equal "Aged to lost - fine charged"', () => {
      const noticeSendOptionsInstance = new NoticeSendOptions({
        ...options,
        sendWhen: 'test',
      });

      expect(noticeSendOptionsInstance.isLostItemFeesSelected()).toEqual(false);
    });
  });

  describe('"sendBy" property', () => {
    it('should be instance of "Period"', () => {
      expect(noticeSendOptions.sendBy).toBeInstanceOf(Period);
    });
  });

  describe('"sendEvery" property', () => {
    it('should be instance of "Period"', () => {
      expect(noticeSendOptions.sendEvery).toBeInstanceOf(Period);
    });
  });
});
