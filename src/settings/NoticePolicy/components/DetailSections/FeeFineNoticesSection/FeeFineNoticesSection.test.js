import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import FeeFineNoticesSection from './FeeFineNoticesSection';
import NoticeCard from '../components';
import {
  feeFineNoticesTriggeringEvents,
  timeBasedFeeFineEventsIds,
  uponAndAfterSendEvents,
} from '../../../../../constants';

jest.mock('../components', () => (
  jest.fn(() => null)
));

const testIds = {
  accordionTestId: 'accordionTestId',
};
const labelIds = {
  feeFineNotices: 'ui-circulation.settings.noticePolicy.feeFineNotices',
};
const isOpen = true;

const mockedFeeFineNotice = {
  format: 'Email',
  frequency: 'Recurring',
  realTime: true,
  sendOptions: {
    sendHow: 'After',
    sendWhen: 'Overdue fine returned',
    sendBy: {
      duration: 1,
      intervalId: 'Weeks',
    },
    sendEvery: {
      duration: 2,
      intervalId: 'Months',
    },
  },
  templateId: 'aff275cf-e292-42f9-bc4f-e381fa6a391c',
};

const mockedPolicy = {
  feeFineNotices: [
    mockedFeeFineNotice,
    {
      ...mockedFeeFineNotice,
      realTime: false,
      templateId: 'aff275cf-bc4f-e292-42f9-e381fa6a391c',
    },
  ],
};

const mockedTemplates = [
  {
    label: 'first test template',
    value: 'templateId-1',
  },
  {
    label: 'second test template',
    value: 'templateId-2',
  }
];

const expectedProps = {
  triggeringEvents: feeFineNoticesTriggeringEvents,
  sendEventTriggeringIds: Object.values(timeBasedFeeFineEventsIds),
  sendEvents: uponAndAfterSendEvents,
  templates: mockedTemplates,
};

const eachRowTesting = (notice, index) => {
  const number = index + 1;
  const expectedPropsForEachRow = {
    ...expectedProps,
    notice,
    index,
  };

  it(`should accept correct props at the ${number} call`, () => {
    expect(NoticeCard).toHaveBeenNthCalledWith(number, expectedPropsForEachRow, {});
  });
};

describe('FeeFineNoticesSection', () => {
  beforeEach(() => {
    render(
      <FeeFineNoticesSection
        isOpen={isOpen}
        policy={mockedPolicy}
        templates={mockedTemplates}
      />
    );
  });

  it('should render component', () => {
    expect(screen.getByTestId(testIds.accordionTestId)).toBeTruthy();
  });

  it('should render label', () => {
    expect(screen.getByText(labelIds.feeFineNotices)).toBeTruthy();
  });

  describe('inner NoticeCard component', () => {
    mockedPolicy.feeFineNotices.map(eachRowTesting);
  });
});
