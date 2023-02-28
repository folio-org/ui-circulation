import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { KeyValue } from '@folio/stripes/components';

import PatronNoticeAboutSection from './PatronNoticeAboutSection';

describe('PatronNoticeAboutSection', () => {
  const testNotice = {
    name: 'testName',
    active: true,
    description: 'testDescription',
    category: 'testCategory',
  };
  const keyValueCallOrderByPlace = {
    noticeName: 1,
    noticeActive: 2,
    noticeDescription: 3,
    noticeCategory: 4,
  };
  const getItemByTestId = (id) => within(screen.getByTestId(id));
  const labelIds = {
    noticeName: 'ui-circulation.settings.patronNotices.notice.name',
    noticeActive: 'ui-circulation.settings.patronNotices.notice.active',
    noticeDescription: 'ui-circulation.settings.patronNotices.notice.description',
    noticeCategory: 'ui-circulation.settings.patronNotices.notice.category',
    noticeActiveYes: 'ui-circulation.settings.patronNotices.yes',
    noticeActiveNo: 'ui-circulation.settings.patronNotices.no',
  };
  const testIds = {
    patronNoticeAboutSectionTestId: 'patronNoticeAboutSectionTestId',
    patronNoticeTemplateName: 'patronNoticeTemplateName',
    patronNoticeActive: 'patronNoticeActive',
    patronNoticeDescription: 'patronNoticeDescription',
    patronNoticeCategory: 'patronNoticeCategory',
  };

  afterEach(() => {
    KeyValue.mockClear();
  });

  describe('when notice is active ', () => {
    beforeEach(() => {
      render(
        <PatronNoticeAboutSection
          notice={testNotice}
        />
      );
    });

    it('should render component', () => {
      expect(getItemByTestId(testIds.patronNoticeAboutSectionTestId)).toBeTruthy();
    });

    it('should render label of "name" field', () => {
      expect(getItemByTestId(testIds.patronNoticeTemplateName).getByText(labelIds.noticeName)).toBeVisible();
    });

    it('should render label of "active" field', () => {
      expect(getItemByTestId(testIds.patronNoticeActive).getByText(labelIds.noticeActiveYes)).toBeVisible();
    });

    it('should render label of "description" field', () => {
      expect(getItemByTestId(testIds.patronNoticeDescription).getByText(labelIds.noticeDescription)).toBeVisible();
    });

    it('should render label of "category" field', () => {
      expect(getItemByTestId(testIds.patronNoticeCategory).getByText(labelIds.noticeCategory)).toBeVisible();
    });

    it('should render "notice name" KeyValue', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(
        keyValueCallOrderByPlace.noticeName,
        expect.objectContaining({
          // label: labelIds.noticeName,
          value: testNotice.name,
        }), {}
      );
    });

    it('should render "notice active" KeyValue', () => {
      expect(getItemByTestId(testIds.patronNoticeActive).getByText(labelIds.noticeActive)).toBeVisible();
    });

    it('should render "notice description" KeyValue', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(
        keyValueCallOrderByPlace.noticeDescription,
        expect.objectContaining({
          // label: labelIds.noticeDescription,
          value: testNotice.description,
        }), {}
      );
    });

    it('should render "notice category" KeyValue', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(
        keyValueCallOrderByPlace.noticeCategory,
        expect.objectContaining({
          // label: labelIds.noticeCategory,
          value: testNotice.category,
        }), {}
      );
    });
  });

  describe('when notice is not active ', () => {
    const testNoticeInactive = {
      ...testNotice,
      active: false,
    };

    beforeEach(() => {
      render(
        <PatronNoticeAboutSection
          notice={testNoticeInactive}
        />
      );
    });

    it('should render label of "active" field', () => {
      expect(getItemByTestId(testIds.patronNoticeActive).getByText(labelIds.noticeActiveNo)).toBeVisible();
    });
  });
});
