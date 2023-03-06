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
    patronNoticeAboutSection: 'patronNoticeAboutSection',
    patronNoticeTemplateName: 'patronNoticeTemplateName',
    patronNoticeActive: 'patronNoticeActive',
    patronNoticeDescription: 'patronNoticeDescription',
    patronNoticeCategory: 'patronNoticeCategory',
  };

  afterEach(() => {
    KeyValue.mockClear();
  });

  describe('with default props ', () => {
    beforeEach(() => {
      render(
        <PatronNoticeAboutSection
          notice={testNotice}
        />
      );
    });

    it('should render component', () => {
      expect(getItemByTestId(testIds.patronNoticeAboutSection)).toBeTruthy();
    });

    it('should render label of "name" field', () => {
      expect(getItemByTestId(testIds.patronNoticeTemplateName).getByText(labelIds.noticeName)).toBeVisible();
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
          value: testNotice.description,
        }), {}
      );
    });

    it('should render "notice category" KeyValue', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(
        keyValueCallOrderByPlace.noticeCategory,
        expect.objectContaining({
          value: testNotice.category,
        }), {}
      );
    });
  });

  [
    false,
    true,
  ].forEach((active) => {
    describe(`when 'active' is ${active}`, () => {
      beforeEach(() => {
        const props = {
          notice: {
            ...testNotice,
            active,
          },
        };

        afterEach(() => {
          KeyValue.mockClear();
        });

        render(<PatronNoticeAboutSection {...props} />);
      });

      it('should render "notice active" KeyValue', () => {
        expect(getItemByTestId(testIds.patronNoticeActive).getByText(
          labelIds[active ? 'noticeActiveYes' : 'noticeActiveNo']
        )).toBeVisible();
      });
    });
  });
});
