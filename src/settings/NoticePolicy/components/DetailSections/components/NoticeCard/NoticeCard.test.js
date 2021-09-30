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

const testKeyValues = (testId, label, value) => {
  if (!value) {
    it(`should render ${label}`, () => {
      const testIdValue = screen.getByTestId(testId);

      expect(testIdValue).toBeVisible();
      expect(within(testIdValue).getByText(`ui-circulation.settings.noticePolicy.notices.${label}`)).toBeVisible();
    });
  } else {
    it(`should render ${label} with ${value} value`, () => {
      const testIdValue = screen.getByTestId(testId);

      expect(testIdValue).toBeVisible();
      expect(within(testIdValue).getByText(value)).toBeVisible();
      expect(within(testIdValue).getByText(`ui-circulation.settings.noticePolicy.notices.${label}`)).toBeVisible();
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

    it('should render "NoticeCard" component', () => {
      expect(screen.getByTestId('noticeCard')).toBeVisible();
    });

    it('should render correct header', () => {
      expect(within(screen.getByTestId('header')).getByText(noticeCard.header)).toBeVisible();
    });

    describe('test KeyValues', () => {
      noticeCardPropsCheckout.templates.map((template) => {
        return testKeyValues('noticeCardTemplate', 'template', template.label);
      });

      testKeyValues('noticeCardViaText', 'via');
      testKeyValues(
        'noticeCardFormat',
        'format',
        `ui-circulation.settings.noticePolicy.notices.${noticeCardPropsCheckout.notice.format.toLowerCase()}`
      );
      testKeyValues(
        'noticeCardTriggeringEvent',
        'triggeringEvent',
        noticeCardPropsCheckout.triggeringEvents[1].label
      );

      describe('when "sendOptions" is available', () => {
        testKeyValues('noticeSend', 'send');

        describe('when "isBeforeOrAfter" is "true"', () => {
          testKeyValues('noticeCardByText', 'by');
        });

        describe('when "isFrequencyAvailable" is "true"', () => {
          testKeyValues('noticeCardFrequencyLabel', 'frequency');
        });

        describe('when "isRecurring" is "true"', () => {
          testKeyValues('noticeIsRecurring', 'andEvery');
        });
      });

      describe('when "isLoanDueDateTimeSelected" is "true" and real time message set to short term', () => {
        testKeyValues('isLoanDueDateTimeSelected', 'send.longTerm');
      });

      describe('when "messageBanner" with warning is shown', () => {
        testKeyValues('messageBanner', 'postponed.notification');
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
      testNotShownValues('noticeSend');
    });

    describe('when "isLoanDueDateTimeSelected" is "true" and real time message set to short term', () => {
      testKeyValues('isLoanDueDateTimeSelected', 'send.shortTerm');
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
        },
      },
    };

    beforeEach(() => {
      render(<NoticeCard {...alternativeProps} />);
    });

    describe('when "isBeforeOrAfter" is "false"', () => {
      testNotShownValues('noticeCardByText');
    });

    describe('when "isFrequencyAvailable" is "false"', () => {
      testNotShownValues('noticeCardFrequencyLabel');
    });

    describe('when "isLoanDueDateTimeSelected" is "false"', () => {
      it('should not render real time message', () => {
        expect(screen.queryByText('ui-circulation.settings.noticePolicy.notices.send.shortTerm'))
          .not.toBeInTheDocument();
        expect(screen.queryByText('ui-circulation.settings.noticePolicy.notices.send.longTerm'))
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
      testNotShownValues('noticeIsRecurring');
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

    it('should render "NoticeCard" component', () => {
      expect(screen.getByTestId('noticeCard')).toBeVisible();
    });

    describe('test KeyValues', () => {
      testKeyValues(
        'noticeCardTriggeringEvent',
        'triggeringEvent',
        noticeCardPropsCheckout.triggeringEvents[3].label
      );
      testKeyValues('noticeCardSendHow', noticeCardPropsDueDate.notice.sendOptions.sendHow.toLowerCase());
      testKeyValues('noticeCardFrequency', 'oneTime');

      it('should render "noticeCardSendByDuration" with value', () => {
        const testIdValue = screen.getByTestId('noticeCardSendByDuration');

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(noticeCardPropsDueDate.notice.sendOptions.sendBy.duration))
          .toBeVisible();
      });

      it('should render "noticeCardSendByIntervalId" with value', () => {
        const testIdValue = screen.getByTestId('noticeCardSendByIntervalId');

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(`ui-circulation.settings.common.${noticeCardPropsDueDate.notice.sendOptions.sendBy.intervalId.toLowerCase()}`))
          .toBeVisible();
      });

      it('should render "noticeCardSendEveryDuration" with value', () => {
        const testIdValue = screen.getByTestId('noticeCardSendEveryDuration');

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(noticeCardPropsDueDate.notice.sendOptions.sendEvery.duration))
          .toBeVisible();
      });

      it('should render "noticeCardSendEveryIntervalId" with value', () => {
        const testIdValue = screen.getByTestId('noticeCardSendEveryIntervalId');

        expect(testIdValue).toBeVisible();
        expect(within(testIdValue)
          .getByText(`ui-circulation.settings.common.${noticeCardPropsDueDate.notice.sendOptions.sendEvery.intervalId.toLowerCase()}`))
          .toBeVisible();
      });
    });
  });
});
