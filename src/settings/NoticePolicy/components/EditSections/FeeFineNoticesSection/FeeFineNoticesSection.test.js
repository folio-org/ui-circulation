import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { FieldArray } from 'react-final-form-arrays';

import { Accordion } from '@folio/stripes/components';
import FeeFineNoticesSection, {
  getSendEvents,
} from './FeeFineNoticesSection';
import NoticesList from '../components';

import {
  feeFineNoticesTriggeringEvents,
  timeBasedFeeFineEventsIds,
  uponAndAfterSendEvents,
} from '../../../../../constants';

const mockedCatchFunc = jest.fn();

describe('FeeFineNoticesSection', () => {
  const mockedPolicy = {
    data: 'mockedPolicy',
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
  const feeFineNoticesLabel = 'ui-circulation.settings.noticePolicy.feeFineNotices';

  afterEach(() => {
    Accordion.mockClear();
    FieldArray.mockClear();
    mockedCatchFunc.mockClear();
  });

  beforeEach(() => {
    render(
      <FeeFineNoticesSection
        policy={mockedPolicy}
        templates={mockedTemplates}
      />
    );
  });

  it('should render "Accordion" label', () => {
    expect(screen.getByText(feeFineNoticesLabel)).toBeVisible();
  });

  it('should execute "FieldArray" with passed props', () => {
    const expectedResult = {
      name: 'feeFineNotices',
      sectionKey: 'feeFineNotices',
      component: NoticesList,
      policy: mockedPolicy,
      getSendEvents,
      sendEventTriggeringIds: Object.values(timeBasedFeeFineEventsIds),
      templates: mockedTemplates,
      triggeringEvents: feeFineNoticesTriggeringEvents,
    };

    expect(FieldArray).toHaveBeenLastCalledWith(expect.objectContaining(expectedResult), {});
  });

  describe('getSendEvents', () => {
    it('should return "uponAndAfterSendEvents"', () => {
      expect(getSendEvents()).toEqual(uponAndAfterSendEvents);
    });
  });
});
