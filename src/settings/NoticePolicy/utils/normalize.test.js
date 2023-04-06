import normalize, {
  setRealTimeFlag,
  setSendHowValue,
  checkNoticeHiddenFields,
} from './normalize';
import { Notice } from '../../Models/NoticePolicy';
import NoticeSendOptions from '../../Models/NoticePolicy/NoticeSendOptions';
import { userInitiatedTimeBasedFeeFineEventsIds } from '../../../constants';

describe('NoticePolicy utils', () => {
  const defaultSendOptions = {
    sendEvery: 'testData',
    sendBy: 'testData',
    sendHow: 'testData',
  };

  describe('setRealTimeFlag', () => {
    it('should change "realTime" flag from "true" to true', () => {
      const mockedData = {
        testSection: [
          {
            realTime: 'true',
          },
        ],
      };
      const expectedResult = {
        testSection: [
          {
            realTime: true,
          },
        ],
      };

      expect(setRealTimeFlag('testSection', mockedData)).toEqual(expectedResult);
    });

    it('should change "realTime" flag to false if any value exclude "true" is passed', () => {
      const mockedData = {
        testSection: [
          {
            realTime: 'not true',
          },
        ],
      };
      const expectedResult = {
        testSection: [
          {
            realTime: false,
          },
        ],
      };

      expect(setRealTimeFlag('testSection', mockedData)).toEqual(expectedResult);
    });

    it('should set "realTime" to true if type of event is included in sendInRealTime list', () => {
      const sendOptions = {
        sendWhen: 'Hold expiration',
      };
      const mockedData = {
        testSection: [
          {
            sendOptions,
          },
        ],
      };
      const expectedResult = {
        testSection: [
          {
            sendOptions,
            realTime: true,
          },
        ],
      };

      expect(setRealTimeFlag('testSection', mockedData)).toEqual(expectedResult);
    });

    it('should set "realTime" flag to false if type of event is not in sendInRealTime list', () => {
      const sendOptions = {
        sendWhen: 'not included type',
      };
      const mockedData = {
        'testSection': [
          {
            sendOptions,
          },
        ],
      };
      const expectedResult = {
        'testSection': [
          {
            sendOptions,
            realTime: false,
          },
        ],
      };

      expect(setRealTimeFlag('testSection', mockedData)).toEqual(expectedResult);
    });
  });

  describe('setSendHowValue', () => {
    it('should set "sendHow" key', () => {
      const mockedData = {
        testSection: [
          {
            sendOptions: {
              sendWhen: userInitiatedTimeBasedFeeFineEventsIds.ATL_FINE_ITEM_RETURNED,
            },
          },
        ],
      };
      const expectedResult = {
        testSection: [
          {
            sendOptions: {
              sendWhen: userInitiatedTimeBasedFeeFineEventsIds.ATL_FINE_ITEM_RETURNED,
              sendHow: 'Upon At',
            },
          },
        ],
      };

      expect(setSendHowValue('testSection', mockedData)).toEqual(expectedResult);
    });

    it('should not set "sendHow" key', () => {
      const mockedData = {
        testSection: [
          {
            sendOptions: {
              sendWhen: 'not included type',
            },
          },
        ],
      };

      expect(setSendHowValue('testSection', mockedData)).toEqual(mockedData);
    });
  });

  describe('checkNoticeHiddenFields', () => {
    beforeEach(() => {
      jest.spyOn(NoticeSendOptions.prototype, 'isSendOptionsAvailable').mockImplementation(() => true);
      jest.spyOn(NoticeSendOptions.prototype, 'isBeforeOrAfter').mockImplementation(() => true);
      jest.spyOn(NoticeSendOptions.prototype, 'isLoanDueDateTimeSelected').mockImplementation(() => true);
      jest.spyOn(NoticeSendOptions.prototype, 'isLostItemFeesSelected').mockImplementation(() => true);
      jest.spyOn(Notice.prototype, 'isRecurring').mockImplementation(() => true);
    });

    afterAll(() => {
      jest.spyOn(NoticeSendOptions.prototype, 'isSendOptionsAvailable').mockRestore();
      jest.spyOn(NoticeSendOptions.prototype, 'isBeforeOrAfter').mockRestore();
      jest.spyOn(NoticeSendOptions.prototype, 'isLoanDueDateTimeSelected').mockRestore();
      jest.spyOn(NoticeSendOptions.prototype, 'isLostItemFeesSelected').mockRestore();
      jest.spyOn(Notice.prototype, 'isRecurring').mockRestore();
    });

    const mockedData = {
      testSection: [
        {
          sendOptions: defaultSendOptions,
          frequency: 'testData',
        },
      ],
    };

    it('should remove "frequency" and clear "sendOptions" fields if "isSendOptionsAvailable" return false', () => {
      const expectedResult = {
        testSection: [
          {
            sendOptions: {},
          },
        ],
      };

      jest.spyOn(NoticeSendOptions.prototype, 'isSendOptionsAvailable').mockImplementation(() => false);

      expect(checkNoticeHiddenFields('testSection', [], mockedData)).toEqual(expectedResult);
    });

    it('should remove "sendBy", "sendEvery" and "frequency" fields if "isBeforeOrAfter" return false', () => {
      const expectedResult = {
        testSection: [
          {
            sendOptions: {
              sendHow: 'testData',
            },
          },
        ],
      };

      jest.spyOn(NoticeSendOptions.prototype, 'isBeforeOrAfter').mockImplementation(() => false);

      expect(checkNoticeHiddenFields('testSection', [], mockedData)).toEqual(expectedResult);
    });

    it('should remove "sendEvery" field if "isRecurring" return false', () => {
      const expectedResult = {
        'testSection': [
          {
            sendOptions: {
              sendBy: 'testData',
              sendHow: 'testData',
            },
            frequency: 'testData',
          }
        ],
      };

      jest.spyOn(Notice.prototype, 'isRecurring').mockImplementation(() => false);

      expect(checkNoticeHiddenFields('testSection', [], mockedData)).toEqual(expectedResult);
    });

    it('should not remove any fields', () => {
      expect(checkNoticeHiddenFields('testSection', [], mockedData)).toEqual(mockedData);
    });

    it('should remove "realTime" field', () => {
      const sectionName = 'section';
      const policy = {
        [sectionName]: [
          {
            sendOptions: defaultSendOptions,
            frequency: 'testData',
            realTime: 'true',
          },
        ],
      };
      const expectedData = {
        [sectionName]: [
          {
            sendOptions: defaultSendOptions,
            frequency: 'testData',
          },
        ],
      };

      jest.spyOn(NoticeSendOptions.prototype, 'isLoanDueDateTimeSelected').mockImplementationOnce(() => false);
      jest.spyOn(NoticeSendOptions.prototype, 'isLostItemFeesSelected').mockImplementationOnce(() => false);

      expect(checkNoticeHiddenFields(sectionName, [], policy)).toEqual(expectedData);
    });

    it('should not remove "realTime" field', () => {
      const sectionName = 'section';
      const policy = {
        [sectionName]: [
          {
            sendOptions: defaultSendOptions,
            frequency: 'testData',
            realTime: 'true',
          },
        ],
      };

      expect(checkNoticeHiddenFields(sectionName, [], policy)).toEqual(policy);
    });
  });

  describe('normalize', () => {
    const mockedData = {
      loanNotices: [
        {
          sendOptions: defaultSendOptions,
          realTime: 'true',
          frequency: 'testData',
        },
        {
          sendOptions: defaultSendOptions,
          realTime: 'false',
          frequency: 'testData',
        },
      ],
      requestNotices: [
        {
          sendOptions: {
            ...defaultSendOptions,
            sendWhen: 'Hold expiration',
          },
          frequency: 'testData',
        },
        {
          sendOptions: {
            ...defaultSendOptions,
            sendWhen: 'Hold expiration',
          },
          frequency: 'testData',
        },
      ],
      feeFineNotices: [
        {
          sendOptions: {
            ...defaultSendOptions,
            sendWhen: userInitiatedTimeBasedFeeFineEventsIds.ATL_FINE_ITEM_RETURNED,
          },
          realTime: true,
          frequency: 'testData',
        },
        {
          sendOptions: {
            ...defaultSendOptions,
            sendWhen: 'not included type',
          },
          realTime: false,
          frequency: 'testData',
        },
      ],
    };
    const expectedResult = {
      feeFineNotices: [
        {
          realTime: true,
          sendOptions: {
            sendHow: 'Upon At',
            sendWhen: userInitiatedTimeBasedFeeFineEventsIds.ATL_FINE_ITEM_RETURNED,
          },
        },
        {
          realTime: false,
          sendOptions: {
            sendWhen: 'not included type',
          },
        },
      ],
      loanNotices: [
        {
          realTime: false,
          sendOptions: {},
        },
        {
          realTime: false,
          sendOptions: {},
        },
      ],
      requestNotices: [
        {
          realTime: true,
          sendOptions: {
            sendHow: 'testData',
            sendWhen: 'Hold expiration',
          },
        },
        {
          realTime: true,
          sendOptions: {
            sendHow: 'testData',
            sendWhen: 'Hold expiration',
          },
        },
      ],
    };

    it('should process all fields correctly', () => {
      expect(normalize(mockedData)).toEqual(expectedResult);
    });
  });
});
