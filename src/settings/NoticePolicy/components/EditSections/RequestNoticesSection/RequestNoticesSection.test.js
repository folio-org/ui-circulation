import React from 'react';
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import { FieldArray } from 'react-final-form-arrays';

import NoticesList from '../components';
import RequestNoticesSection, {
  getSendEvents,
} from './RequestNoticesSection';
import {
  requestTimeBasedEventsIds,
  uponAndBeforeSendEvents,
  requestNoticesTriggeringEvents,
} from '../../../../../constants';

jest.mock('../components', () => jest.fn(() => null));

const testIds = {
  editRequestNotices: 'editRequestNotices',
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
      expect(within(screen.getByTestId(testIds.editRequestNotices)).getByText(labelIds.requestNoticesId)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId(testIds.editRequestNotices)).toHaveAttribute('open');
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
      expect(screen.getByTestId(testIds.editRequestNotices)).not.toHaveAttribute('open');
    });
  });

  describe('getSendEvents', () => {
    it('should return list of "uponAndBeforeSendEvents"', () => {
      expect(getSendEvents()).toEqual(uponAndBeforeSendEvents);
    });
  });
});
