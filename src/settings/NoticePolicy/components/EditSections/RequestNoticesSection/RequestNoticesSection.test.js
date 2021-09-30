import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import { FieldArray } from 'react-final-form-arrays';

import '../../../../../../test/jest/__mock__';

import NoticesList from '../components';
import RequestNoticesSection, {
  getSendEvents,
} from './RequestNoticesSection';
import {
  requestTimeBasedEventsIds,
  uponAndBeforeSendEvents,
  requestNoticesTriggeringEvents,
} from '../../../../../constants';

jest.mock('react-final-form-arrays', () => ({
  FieldArray: jest.fn(() => null),
}));

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

    it('should render accordion label correctly', () => {
      expect(within(screen.getByTestId('editRequestNotices')).getByText(requestNoticesId)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId('editRequestNotices')).toHaveAttribute('open');
    });

    it('should execute "FieldArray" with correct props', () => {
      const expectedProps = {
        name: 'requestNotices',
        sectionKey: 'requestNotices',
        component: NoticesList,
        policy: mockedPolicy,
        getSendEvents,
        sendEventTriggeringIds: Object.values(requestTimeBasedEventsIds),
        templates: mockedTemplates,
        triggeringEvents: requestNoticesTriggeringEvents,
      };

      expect(FieldArray).toHaveBeenLastCalledWith(expectedProps, {});
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
      expect(screen.getByTestId('editRequestNotices')).not.toHaveAttribute('open');
    });
  });

  describe('getSendEvents', () => {
    it('should return list of "uponAndBeforeSendEvents"', () => {
      expect(getSendEvents()).toEqual(uponAndBeforeSendEvents);
    });
  });
});
