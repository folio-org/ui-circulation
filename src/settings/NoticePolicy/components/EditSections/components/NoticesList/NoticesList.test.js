import {
  render,
  screen,
  within,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import NoticesList, {
  getAlignedNoticeIds,
  moveNoticeIds,
  reorderNoticeFields,
} from './NoticesList';
import NoticeCard from '../NoticeCard';

const testIds = {
  addNotice: 'addNotice',
};
const labelIds = {
  addNotice: 'ui-circulation.settings.noticePolicy.addNotice',
};

jest.mock('../NoticeCard', () => jest.fn(({
  onRemoveNotice,
  noticeIndex,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={`noticeCard${noticeIndex}`}
    onClick={() => onRemoveNotice(noticeIndex)}
  />
)));

describe('NoticesList', () => {
  const testFieldsNames = [
    'notice1',
    'notice2',
  ];
  const testFieldsValue = [
    {
      value: 'value1',
    },
    {
      value: 'value2',
    },
  ];
  const sendEventTriggeringIds = ['sendEventTriggeringIds'];
  const templates = [
    {
      value: 'templatesValue1',
      label: 'templatesLabel1',
    },
  ];
  const triggeringEvents = [
    {
      value: 'sendEventTriggeringIdsValue',
      label: 'sendEventTriggeringIdsLabel',
    },
  ];
  const testFields = {
    move: jest.fn(),
    push: jest.fn(),
    remove: jest.fn(),
    map: (callback) => testFieldsNames.map(callback),
    value: testFieldsValue,
  };
  const sectionKey = 'feeFineNotices';
  const policy = {
    [sectionKey]: [
      {
        sendOptions: {
          sendWhen: 'sendWhen1',
        },
      },
      {
        sendOptions: {
          sendWhen: 'sendWhen2',
        },
      },
    ],
  };
  const noticesListProps = {
    getSendEvents : jest.fn(),
    fields: testFields,
    sectionKey,
    policy,
    sendEventTriggeringIds,
    templates,
    triggeringEvents,
  };
  const renderComponent = () => {
    render(
      <NoticesList
        {...noticesListProps}
      />
    );
  };

  afterEach(() => {
    NoticeCard.mockClear();
    testFields.move.mockClear();
    testFields.push.mockClear();
    testFields.remove.mockClear();
  });

  describe('reorderNoticeFields', () => {
    it('should move a notice when drop target changes', () => {
      reorderNoticeFields({
        active: { id: testFieldsNames[0] },
        over: { id: testFieldsNames[1] },
      }, testFieldsNames, testFields.move);

      expect(testFields.move).toHaveBeenCalledWith(0, 1);
    });

    it('should not move a notice when dropped onto itself', () => {
      reorderNoticeFields({
        active: { id: testFieldsNames[0] },
        over: { id: testFieldsNames[0] },
      }, testFieldsNames, testFields.move);

      expect(testFields.move).not.toHaveBeenCalled();
    });
  });

  describe('getAlignedNoticeIds', () => {
    it('should append stable ids until the count is reached', () => {
      const createNoticeId = jest
        .fn()
        .mockReturnValueOnce('notice-card-1')
        .mockReturnValueOnce('notice-card-2');

      expect(getAlignedNoticeIds([], 2, createNoticeId)).toEqual([
        'notice-card-1',
        'notice-card-2',
      ]);
    });

    it('should trim extra ids when the count shrinks', () => {
      expect(getAlignedNoticeIds([
        'notice-card-1',
        'notice-card-2',
        'notice-card-3',
      ], 2, jest.fn())).toEqual([
        'notice-card-1',
        'notice-card-2',
      ]);
    });
  });

  describe('moveNoticeIds', () => {
    it('should keep ids attached to the moved notice', () => {
      expect(moveNoticeIds([
        'notice-card-1',
        'notice-card-2',
        'notice-card-3',
      ], 0, 2)).toEqual([
        'notice-card-2',
        'notice-card-3',
        'notice-card-1',
      ]);
    });
  });

  describe(('notice cards'), () => {
    beforeEach(() => {
      renderComponent();
    });

    const generateTests = (testFieldName, noticeIndex) => {
      const currentNoticeCardIndex = noticeIndex + 1;

      describe((`notice card #${currentNoticeCardIndex}`), () => {
        const currentNoticeCardTestId = `noticeCard${noticeIndex}`;

        it('should render notice card', () => {
          expect(NoticeCard).toHaveBeenNthCalledWith(
            currentNoticeCardIndex,
            expect.objectContaining({
              'data-testid': currentNoticeCardTestId,
              noticeIndex,
              pathToNotice: testFieldsNames[noticeIndex],
              notice: policy[sectionKey][noticeIndex],
              sendEventTriggeringIds,
              templates,
              triggeringEvents,
            }), {}
          );
        });

        it('should remove notice', () => {
          const noticeCard = screen.getAllByTestId(currentNoticeCardTestId);

          fireEvent.click(noticeCard[0]);

          expect(testFields.remove).toHaveBeenCalledWith(noticeIndex);
        });
      });
    };

    testFieldsNames.forEach(generateTests);
  });

  describe(('add notice'), () => {
    beforeEach(() => {
      renderComponent();
    });

    it('should render add notice button', () => {
      expect(within(screen.getByTestId(testIds.addNotice)).getByText(labelIds.addNotice)).toBeVisible();
    });

    it('should add notice', () => {
      const addNotice = screen.getByTestId(testIds.addNotice);

      fireEvent.click(addNotice);

      expect(testFields.push).toHaveBeenCalledWith({});
    });
  });
});
