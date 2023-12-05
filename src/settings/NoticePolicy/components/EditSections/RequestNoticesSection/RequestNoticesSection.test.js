import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

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

  beforeEach(() => {
    render(
      <RequestNoticesSection
        policy={mockedPolicy}
        templates={mockedTemplates}
      />
    );
  });

  it('should render accordion label correctly', () => {
    expect(within(screen.getByTestId(testIds.editRequestNotices)).getByText(labelIds.requestNoticesId)).toBeVisible();
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

  describe('getSendEvents', () => {
    it('should return list of "uponAndBeforeSendEvents"', () => {
      expect(getSendEvents()).toEqual(uponAndBeforeSendEvents);
    });
  });
});
