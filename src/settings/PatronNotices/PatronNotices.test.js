import React from 'react';
import {
  render,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { EntryManager } from '@folio/stripes/smart-components';

import PatronNotices from './PatronNotices';
import PatronNoticeDetail from './PatronNoticeDetail';
import PatronNoticeForm from './PatronNoticeForm';

import {
  patronNoticeCategories,
} from '../../constants';

describe('PatronNotices', () => {
  const labelIds = {
    close: 'ui-circulation.settings.common.close',
    header: 'ui-circulation.settings.patronNotices.denyDelete.header',
    body: 'ui-circulation.settings.patronNotices.denyDelete.body',
  };
  const mockedLabel = 'testLabel';
  const mockedEntries = {
    records: [
      {
        name: 'Zak',
      },
      {
        name: 'John',
      },
      {
        name: 'Alex',
      },
    ],
  };
  const mockedPatronNoticePolicies = {
    entries: {
      records: [{
        test: 'testPatronNoticePoliciesData',
      }],
    },
  };
  const mockedMutator = {
    entries: {
      POST: jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    },
  };
  const defaultProps = {
    label: mockedLabel,
    resources: {
      entries: mockedEntries,
      patronNoticePolicies: mockedPatronNoticePolicies,
    },
    mutator: mockedMutator,
  };

  afterEach(() => {
    EntryManager.mockClear();
  });

  it('"EntryManager" should be executed with correct props', () => {
    const expectedNameOrder = [
      {
        name: 'Alex',
      },
      {
        name: 'John',
      },
      {
        name: 'Zak',
      },
    ];

    render(
      <PatronNotices
        {...defaultProps}
      />
    );

    expect(EntryManager).toBeCalledWith(expect.objectContaining({
      parentMutator: mockedMutator,
      entryList: expectedNameOrder,
      detailComponent: PatronNoticeDetail,
      paneTitle: mockedLabel,
      entryLabel: mockedLabel,
      entryFormComponent: PatronNoticeForm,
      defaultEntry: {
        active: true,
        outputFormats: ['text/html'],
        templateResolver: 'mustache',
        category: patronNoticeCategories[0].id,
      },
      nameKey: 'name',
      permissions: {
        put: 'ui-circulation.settings.notice-templates',
        post: 'ui-circulation.settings.notice-templates',
        delete: 'ui-circulation.settings.notice-templates',
      },
      enableDetailsActionMenu: true,
      editElement: 'both',
      prohibitItemDelete: {
        close: labelIds.close,
        label: labelIds.header,
        message: labelIds.body,
      },
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "records" in "entries"', () => {
    render(
      <PatronNotices
        {...defaultProps}
        resources={{
          ...defaultProps.resources,
          entries: {},
        }}
      />
    );

    expect(EntryManager).toBeCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "entries" in "resources"', () => {
    render(
      <PatronNotices
        {...defaultProps}
        resources={{
          patronNoticePolicies: mockedPatronNoticePolicies,
        }}
      />
    );

    expect(EntryManager).toBeCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });
});
