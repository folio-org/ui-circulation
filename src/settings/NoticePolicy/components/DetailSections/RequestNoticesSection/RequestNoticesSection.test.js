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

const testIds = {
  viewRequestNoticesTestId: 'viewRequestNoticesTestId',
};
const labelIds = {
  requestNoticesId: 'ui-circulation.settings.noticePolicy.requestNotices',
};

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

  describe('when "isOpen" prop is true', () => {
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
      expect(within(screen.getByTestId(testIds.viewRequestNoticesTestId)).getByText(labelIds.requestNoticesId)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId(testIds.viewRequestNoticesTestId)).toHaveAttribute('open');
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

  describe('when "isOpen" prop is false', () => {
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
      expect(screen.getByTestId(testIds.viewRequestNoticesTestId)).not.toHaveAttribute('open');
    });
  });
});
