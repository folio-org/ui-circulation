import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { FieldArray } from 'react-final-form-arrays';
import NoticesList from '../components';
import LoanNoticesSection, {
  getSendEvents,
} from './LoanNoticesSection';
import {
  loanNoticesTriggeringEvents,
  loanTimeBasedEventsIds,
  uponAndAfterSendEvents,
  noticesSendEvents,
} from '../../../../../constants';

jest.mock('react-final-form-arrays', () => ({
  FieldArray: jest.fn(() => null),
}));

jest.mock('../components', () => jest.fn(() => null));

describe('LoanNoticesSection', () => {
  const mockedPolicy = {
    policy: 'testPolicyData',
  };
  const mockedTemplates = [
    {
      value: 'firstTestValue',
      label: 'firstTestLabel',
    },
    {
      value: 'secondTestValue',
      label: 'secondTestLabel',
    },
  ];

  describe('when it is open', () => {
    const loanNoticesId = 'ui-circulation.settings.noticePolicy.loanNotices';

    beforeEach(() => {
      render(
        <LoanNoticesSection
          isOpen
          policy={mockedPolicy}
          templates={mockedTemplates}
        />
      );
    });

    afterEach(() => {
      FieldArray.mockClear();
    });

    it('should render accordion with label', () => {
      expect(within(screen.getByTestId('editLoanNotices')).getByText(loanNoticesId)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId('editLoanNotices')).toHaveAttribute('open');
    });

    it('should execute "FieldArray" with correct props', () => {
      const expectedResult = {
        name: 'loanNotices',
        sectionKey: 'loanNotices',
        component: NoticesList,
        policy: mockedPolicy,
        templates: mockedTemplates,
        getSendEvents,
        sendEventTriggeringIds: Object.values(loanTimeBasedEventsIds),
        triggeringEvents: loanNoticesTriggeringEvents,
      };

      expect(FieldArray).toHaveBeenCalledWith(expectedResult, {});
    });
  });

  describe('when it is not open', () => {
    beforeEach(() => {
      render(
        <LoanNoticesSection
          isOpen={false}
          policy={mockedPolicy}
          templates={mockedTemplates}
        />
      );
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId('editLoanNotices')).not.toHaveAttribute('open');
    });
  });

  describe('getSendEvents function', () => {
    it('should return "uponAndAfterSendEvents"', () => {
      expect(getSendEvents(loanTimeBasedEventsIds.AGED_TO_LOST)).toEqual(uponAndAfterSendEvents);
    });

    it('should return "noticesSendEvents"', () => {
      expect(getSendEvents('somethingElse')).toEqual(noticesSendEvents);
    });
  });
});