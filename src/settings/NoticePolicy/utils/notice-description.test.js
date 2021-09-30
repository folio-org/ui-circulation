import noticeDescription from './notice-description';
import {
  timeBasedFeeFineEventsIds,
  userInitiatedTimeBasedFeeFineEventsIds,
  loanUserInitiatedEventsIds,
  loanTimeBasedEventsIds,
  requestItemStateChangeEventsIds,
  requestUserInitiatedEventsIds,
  requestTimeBasedEventsIds,
} from '../../../constants';

const mockedData = {
  'postponedEvents': [
    loanUserInitiatedEventsIds.CHECK_IN,
    loanUserInitiatedEventsIds.CHECK_OUT,
  ],
  'realTimeEvents': [
    loanUserInitiatedEventsIds.RENEWED,
    loanUserInitiatedEventsIds.MANUAL_DUE_DATE_CHANGE,
    loanUserInitiatedEventsIds.ITEM_RECALLED,
    requestItemStateChangeEventsIds.AVAILABLE,
    ...Object.values(requestUserInitiatedEventsIds),
    ...Object.values(requestTimeBasedEventsIds),
    timeBasedFeeFineEventsIds.RENEWED,
    timeBasedFeeFineEventsIds.RETURNED,
    userInitiatedTimeBasedFeeFineEventsIds.ATL_FINE_ITEM_RETURNED,
  ],
  'conditionalEvents': [
    timeBasedFeeFineEventsIds.ATL_FINE_CHARGED,
    loanTimeBasedEventsIds.AGED_TO_LOST,
  ]
};
const eachArrOfKeysTesting = (arrName) => {
  it(`should return right message key when process ${arrName} events`, () => {
    const expectedMessageKey = `ui-circulation.settings.noticePolicy.notices.${arrName}.notification`;

    mockedData[`${arrName}Events`].forEach(item => {
      expect(noticeDescription(item)).toBe(expectedMessageKey);
    });
  });
};

describe('NoticePolicy utils', () => {
  describe('noticeDescription', () => {
    const listOfEventTypes = [
      'postponed',
      'realTime',
      'conditional',
    ];

    listOfEventTypes.forEach(item => eachArrOfKeysTesting(item));

    it('should return null if eventId is invalid', () => {
      expect(noticeDescription('invalidId')).toBe(null);
    });
  });
});
