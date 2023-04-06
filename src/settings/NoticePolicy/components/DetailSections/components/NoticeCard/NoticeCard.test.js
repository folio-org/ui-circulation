import React from 'react';
import {
  screen,
  render,
  within,
} from '@testing-library/react';

import '../../../../../../../test/jest/__mock__';

import NoticeCard from './NoticeCard';
import {
  loanNoticesTriggeringEvents,
  noticesSendEvents,
} from '../../../../../../constants';
// import { REAL_TIME_NOTICES_TRANSLATION_KEYS } from '../../../../utils/get-real-time-labels';

const POLICY_NOTICES_TRANSLATION_KEY = 'ui-circulation.settings.noticePolicy.notices';
const testIds = {
  noticeCard: 'noticeCard',
  noticeCardTemplate: 'noticeCardTemplate',
  noticeCardViaText: 'noticeCardViaText',
  noticeCardFormat: 'noticeCardFormat',
  noticeCardTriggeringEvent: 'noticeCardTriggeringEvent',
  noticeCardSendHow: 'noticeCardSendHow',
  noticeCardFrequency: 'noticeCardFrequency',
  noticeSend: 'noticeSend',
  noticeCardByText: 'noticeCardByText',
  noticeCardFrequencyLabel: 'noticeCardFrequencyLabel',
  noticeIsRecurring: 'noticeIsRecurring',
  isLoanDueDateTimeSelected: 'isLoanDueDateTimeSelected',
  messageBanner: 'messageBanner',
  noticeCardSendByDuration: 'noticeCardSendByDuration',
  noticeCardSendByIntervalId: 'noticeCardSendByIntervalId',
  noticeCardSendEveryDuration: 'noticeCardSendEveryDuration',
  noticeCardSendEveryIntervalId: 'noticeCardSendEveryIntervalId',
  header: 'header',
};

jest.mock('../../../../utils/get-real-time-labels', () => jest.fn(() => ({
  longTerm: 'ui-circulation.settings.noticePolicy.notices.send.longTerm',
  shortTerm: 'ui-circulation.settings.noticePolicy.notices.send.shortTerm',
})));

const testKeyValues = (testId, label, value) => {
  if (!value) {
    it(`should render ${label}`, () => {
      const testIdValue = screen.getByTestId(testId);

      expect(testIdValue).toBeVisible();
      expect(within(testIdValue).getByText(`${POLICY_NOTICES_TRANSLATION_KEY}.${label}`)).toBeVisible();
    });
  } else {
    it(`should render ${label} with ${value} value`, () => {
      const testIdValue = screen.getByTestId(testId);

      expect(testIdValue).toBeVisible();
      expect(within(testIdValue).getByText(value)).toBeVisible();
      expect(within(testIdValue).getByText(`${POLICY_NOTICES_TRANSLATION_KEY}.${label}`)).toBeVisible();
    });
  }
};
const testNotShownValues = (testId) => {
  it(`should not render ${testId} element`, () => {
    expect(screen.queryByTestId(document.documentElement, testId)).not.toBeInTheDocument();
  });
};

describe('View NoticeCard in DetailSection', () => {
  const noticeCardPropsCheckout = {
    index: 0,
    intl: { formatMessage: jest.fn() },
    notice: {
      format: 'Email',
      isRecurring: jest.fn(() => true),
      realTime: false,
      sendOptions: {
        isBeforeOrAfter: jest.fn(() => true),
        isFrequencyAvailable: jest.fn(() => true),
        isLoanDueDateTimeSelected: jest.fn(() => true),
        isSendOptionsAvailable: jest.fn(() => true),
        isLostItemFeesSelected: jest.fn(() => true),
        sendWhen: 'Check out',
      },
      templateId: 'testTemplateId',
    },
    sendEventTriggeringIds: [
      'Due date',
      'Aged to lost',
    ],
    sendEvents: [...noticesSendEvents],
    templates: [{
      label: 'TestLabel2',
      value: 'testTemplateId',
    }],
    triggeringEvents: [...loanNoticesTriggeringEvents],
  };
  const noticeCard = {
    header:  'ui-circulation.settings.noticePolicy.countableNotice',
  };

  describe('with default props and send notice when "check out"', () => {
    beforeEach(() => {
      render(<NoticeCard {...noticeCardPropsCheckout} />);
    });

    it(`should render "${testIds.noticeCard}" component`, () => {
      expect(screen.getByTestId(testIds.noticeCard)).toBeVisible();
    });

    it('should render correct header', () => {
      expect(within(screen.getByTestId(testIds.header)).getByText(noticeCard.header)).toBeVisible();
    });

    describe('test KeyValues', () => {
      noticeCardPropsCheckout.templates.forEach(({ label }) => (
        testKeyValues(testIds.noticeCardTemplate, 'template', label)
      ));

      testKeyValues(testIds.noticeCardViaText, 'via');
      testKeyValues(
        testIds.noticeCardFormat,
        'format',
        `${POLICY_NOTICES_TRANSLATION_KEY}.${noticeCardPropsCheckout.notice.format.toLowerCase()}`
      );
      testKeyValues(
        testIds.noticeCardTriggeringEvent,
        'triggeringEvent',
        noticeCardPropsCheckout.triggeringEvents[1].label
      );

      describe('when "sendOptions" is available', () => {
        testKeyValues(testIds.noticeSend, 'send');

        describe('when "isBeforeOrAfter" is "true"', () => {
          testKeyValues(testIds.noticeCardByText, 'by');
        });

        describe('when "isFrequencyAvailable" is "true"', () => {
          testKeyValues(testIds.noticeCardFrequencyLabel, 'frequency');
        });

        describe('when "isRecurring" is "true"', () => {
          testKeyValues(testIds.noticeIsRecurring, 'andEvery');
        });
      });

      describe(`when "${testIds.isLoanDueDateTimeSelected}" is "true" and real time message set to short term`, () => {
        testKeyValues(testIds.isLoanDueDateTimeSelected, 'send.longTerm');
      });

      describe(`when "${testIds.messageBanner}" with warning is shown`, () => {
        testKeyValues(testIds.messageBanner, 'postponed.notification');
      });
    });
  });

  describe('with alternative props when "isSendOptionsAvailable" is "false"', () => {
    const alternativeProps = {
      ...noticeCardPropsCheckout,
      notice: {
        ...noticeCardPropsCheckout.notice,
        realTime: true,
        sendOptions: {
          ...noticeCardPropsCheckout.notice.sendOptions,
          isSendOptionsAvailable: jest.fn(() => false),
        },
      },
    };

    beforeEach(() => {
      render(<NoticeCard {...alternativeProps} />);
    });

    describe('when "sendOptions" is not available', () => {
      testNotShownValues(testIds.noticeSend);
    });

    describe(`when "${testIds.isLoanDueDateTimeSelected}" is "true" and real time message set to short term`, () => {
      testKeyValues(testIds.isLoanDueDateTimeSelected, 'send.shortTerm');
    });
  });

  describe('with alternative props when "sendOptions" set as "false"', () => {
    const alternativeProps = {
      ...noticeCardPropsCheckout,
      notice: {
        ...noticeCardPropsCheckout.notice,
        sendOptions: {
          ...noticeCardPropsCheckout.notice.sendOptions,
          isBeforeOrAfter: jest.fn(() => false),
          isFrequencyAvailable: jest.fn(() => false),
          isLoanDueDateTimeSelected: jest.fn(() => false),
          isLostItemFeesSelected: jest.fn(() => false),
        },
      },
    };

    beforeEach(() => {
      render(<NoticeCard {...alternativeProps} />);
    });

    describe('when "isBeforeOrAfter" is "false"', () => {
      testNotShownValues(testIds.noticeCardByText);
    });

    describe('when "isFrequencyAvailable" is "false"', () => {
      testNotShownValues(testIds.noticeCardFrequencyLabel);
    });

    describe('when "isLoanDueDateTimeSelected" and "isLostItemFeesSelected" are "false"', () => {
      it('should not render real time message', () => {
        expect(screen.queryByText(`${POLICY_NOTICES_TRANSLATION_KEY}.send.shortTerm`))
          .not.toBeInTheDocument();
        expect(screen.queryByText(`${POLICY_NOTICES_TRANSLATION_KEY}.send.longTerm`))
          .not.toBeInTheDocument();
      });
    });
  });

  describe('with alternative props when "isRecurring" set as "false"', () => {
    const alternativeProps = {
      ...noticeCardPropsCheckout,
      notice: {
        ...noticeCardPropsCheckout.notice,
        sendOptions: {
          ...noticeCardPropsCheckout.notice.sendOptions,
          isRecurring: jest.fn(() => false),
        },
      },
    };

    beforeEach(() => {
      render(<NoticeCard {...alternativeProps} />);
    });

    describe('when "isRecurring" is "false"', () => {
      testNotShownValues(testIds.noticeIsRecurring);
    });
  });

  describe('with default props and send notice when "loan due date/time"', () => {
    const noticeCardPropsDueDate = {
      ...noticeCardPropsCheckout,
      notice: {
        ...noticeCardPropsCheckout.notice,
        frequency: 'One time',
        sendOptions: {
          ...noticeCardPropsCheckout.notice.sendOptions,
          sendBy: {
            duration: 2,
            intervalId: 'Minutes',
          },
          sendEvery: {
            duration: 5,
            intervalId: 'Hours',
          },
          sendHow: 'Before',
          sendWhen: 'Due date',
        },
      },
    };

    beforeEach(() => {
      render(<NoticeCard {...noticeCardPropsDueDate} />);
    });

    it(`should render "${testIds.noticeCard}" component`, () => {
      expect(screen.getByTestId(testIds.noticeCard)).toBeVisible();
    });

    describe('test KeyValues', () => {
      testKeyValues(
        testIds.noticeCardTriggeringEvent,
        'triggeringEvent',
        noticeCardPropsCheckout.triggeringEvents[3].label
      );
      testKeyValues(testIds.noticeCardSendHow, noticeCardPropsDueDate.notice.sendOptions.sendHow.toLowerCase());
      testKeyValues(testIds.noticeCardFrequency, 'oneTime');

      it(`should render "${testIds.noticeCardSendByDuration}" with value`, () => {
        const testIdValue = screen.getByTestId(testIds.noticeCardSendByDuration);

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(noticeCardPropsDueDate.notice.sendOptions.sendBy.duration))
          .toBeVisible();
      });

      it(`should render "${testIds.noticeCardSendByIntervalId}" with value`, () => {
        const testIdValue = screen.getByTestId(testIds.noticeCardSendByIntervalId);

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(`ui-circulation.settings.common.${noticeCardPropsDueDate.notice.sendOptions.sendBy.intervalId.toLowerCase()}`))
          .toBeVisible();
      });

      it(`should render "${testIds.noticeCardSendEveryDuration}" with value`, () => {
        const testIdValue = screen.getByTestId(testIds.noticeCardSendEveryDuration);

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(noticeCardPropsDueDate.notice.sendOptions.sendEvery.duration))
          .toBeVisible();
      });

      it(`should render "${testIds.noticeCardSendEveryIntervalId}" with value`, () => {
        const testIdValue = screen.getByTestId(testIds.noticeCardSendEveryIntervalId);

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(`ui-circulation.settings.common.${noticeCardPropsDueDate.notice.sendOptions.sendEvery.intervalId.toLowerCase()}`))
          .toBeVisible();
      });
    });
  });
});
