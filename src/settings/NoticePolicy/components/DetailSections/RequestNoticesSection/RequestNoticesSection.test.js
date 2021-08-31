import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import RequestNoticesSection from './RequestNoticesSection';
import NoticeCard from '../components';
import {
  requestTimeBasedEventsIds,
  uponAndBeforeSendEvents,
  requestNoticesTriggeringEvents,
} from '../../../../../constants';

jest.mock('../components', () => jest.fn(() => null));

describe('RequestNoticesSection', () => {
  const mockedPolicy = {
    requestNotices: [
      'firstTestNotice',
      'secondTestNotice',
    ],
  };
  const mockedTemplates = [
    {
      value: 'firstTemplate',
      label: 'fitstTemplateData',
    },
    {
      value: 'secondTemplate',
      label: 'secondTemplateData',
    },
  ];
  const requestNoticesId = 'ui-circulation.settings.noticePolicy.requestNotices';

  describe('with positive props', () => {
    beforeEach(() => {
      render(
        <RequestNoticesSection
          isOpen
          policy={mockedPolicy}
          templates={mockedTemplates}
        />
      );
    });

    afterEach(() => {
      NoticeCard.mockClear();
    });

    it('should render accordion label correctly', () => {
      expect(within(screen.getByTestId('viewRequestNoticesTestId')).getByText(requestNoticesId)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId('viewRequestNoticesTestId')).toHaveAttribute('open');
    });

    it('should execute each "NoticeCard" with correct props', () => {
      mockedPolicy.requestNotices.forEach((notice, index) => {
        const expectedResult = {
          index,
          notice,
          sendEvents: uponAndBeforeSendEvents,
          sendEventTriggeringIds: Object.values(requestTimeBasedEventsIds),
          templates: mockedTemplates,
          triggeringEvents: requestNoticesTriggeringEvents,
        };

        expect(NoticeCard).toHaveBeenNthCalledWith(index + 1, expectedResult, {});
      });
    });
  });

  describe('with negative props', () => {
    beforeEach(() => {
      render(
        <RequestNoticesSection
          isOpen={false}
          policy={mockedPolicy}
          templates={mockedTemplates}
        />
      );
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId('viewRequestNoticesTestId')).not.toHaveAttribute('open');
    });
  });
});
