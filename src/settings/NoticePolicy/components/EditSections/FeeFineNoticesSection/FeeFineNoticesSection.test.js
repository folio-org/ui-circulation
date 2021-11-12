import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

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

jest.mock('react-final-form-arrays', () => ({
  FieldArray: jest.fn(() => null),
}));

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

  describe('when "Accordion" is open"', () => {
    beforeEach(() => {
      render(
        <FeeFineNoticesSection
          isOpen
          policy={mockedPolicy}
          templates={mockedTemplates}
        />
      );
    });

    it('should execute "Accordion" with passed props', () => {
      const expectedResult = {
        id: 'editFeeFineNotices',
        open: true,
      };

      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining(expectedResult), {});
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
  });

  describe('when "Accordion" is closed', () => {
    it('should execute "Accordion" with passed props', () => {
      const expectedResult = {
        open: false,
      };

      render(
        <FeeFineNoticesSection
          isOpen={false}
          policy={mockedPolicy}
          templates={mockedTemplates}
        />
      );

      expect(Accordion).toHaveBeenLastCalledWith(expect.objectContaining(expectedResult), {});
    });
  });

  describe('getSendEvents', () => {
    it('should return "uponAndAfterSendEvents"', () => {
      expect(getSendEvents()).toEqual(uponAndAfterSendEvents);
    });
  });
});
