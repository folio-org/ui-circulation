import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import LoanNoticesSection from './LoanNoticesSection';
import NoticeCard from '../components';
import {
  noticesSendEvents,
  loanTimeBasedEventsIds,
  loanNoticesTriggeringEvents,
} from '../../../../../constants';

jest.mock('../components', () => jest.fn(() => null));

describe('LoanNoticesSection', () => {
  const mockedPolicy = {
    loanNotices: ['firstTestNotice', 'secondTestNotice'],
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
  const loanNoticesId = 'ui-circulation.settings.noticePolicy.loanNotices';
  const eachNoticeTest = (notice, index) => {
    const number = index + 1;
    const expectedResult = {
      index,
      notice,
      sendEvents: noticesSendEvents,
      sendEventTriggeringIds: Object.values(loanTimeBasedEventsIds),
      templates: mockedTemplates,
      triggeringEvents: loanNoticesTriggeringEvents,
    };

    it(`should execute ${number} "NoticeCard" with correct props`, () => {
      expect(NoticeCard).toHaveBeenNthCalledWith(number, expectedResult, {});
    });
  };

  describe('when it is open', () => {
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
      NoticeCard.mockClear();
    });

    it('should render accrodion with label', () => {
      expect(screen.getByTestId('viewLoanNoticesTestId')).toBeVisible();
      expect(within(screen.getByTestId('viewLoanNoticesTestId')).getByText(loanNoticesId)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId('viewLoanNoticesTestId')).toHaveAttribute('open');
    });

    mockedPolicy.loanNotices.map(eachNoticeTest);
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
      expect(screen.getByTestId('viewLoanNoticesTestId')).not.toHaveAttribute('open');
    });
  });
});
