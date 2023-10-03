import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import LoanNoticesSection from './LoanNoticesSection';
import NoticeCard from '../components';
import {
  noticesSendEvents,
  loanTimeBasedEventsIds,
  loanNoticesTriggeringEvents,
} from '../../../../../constants';

jest.mock('../components', () => jest.fn(() => null));

const testIds = {
  viewLoanNoticesTestId: 'viewLoanNoticesTestId',
};
const labelIds = {
  loanNoticesId: 'ui-circulation.settings.noticePolicy.loanNotices',
};

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
      expect(screen.getByTestId(testIds.viewLoanNoticesTestId)).toBeVisible();
      expect(within(screen.getByTestId(testIds.viewLoanNoticesTestId)).getByText(labelIds.loanNoticesId)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId(testIds.viewLoanNoticesTestId)).toHaveAttribute('open');
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
      expect(screen.getByTestId(testIds.viewLoanNoticesTestId)).not.toHaveAttribute('open');
    });
  });
});
