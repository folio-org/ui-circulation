import React from 'react';
import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';

import { EntryManager } from '@folio/stripes/smart-components';

import NoticePolicySettings, {
  changeToString,
  parseInitialValues,
} from './NoticePolicySettings';
import NoticePolicyDetail from './NoticePolicyDetail';
import NoticePolicyForm from './NoticePolicyForm';
import { NoticePolicy } from '../Models/NoticePolicy';
import normalize from './utils/normalize';

describe('NoticePolicySettings', () => {
  const testIds = {
    isPolicyInUse: 'isPolicyInUse',
  };
  const labelIds = {
    paneTitle: 'ui-circulation.settings.noticePolicy.paneTitle',
    entryLabel: 'ui-circulation.settings.noticePolicy.entryLabel',
    close: 'ui-circulation.settings.common.close',
    header: 'ui-circulation.settings.noticePolicy.denyDelete.header',
    body: 'ui-circulation.settings.noticePolicy.denyDelete.body',
  };
  const mockedPatronNoticePolicies = {
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
  const mockedCirculationRules = {
    records: [{
      rulesAsText: testIds.isPolicyInUse,
    }],
  };
  const mockedMutator = {
    patronNoticePolicies: {
      POST:jest.fn(),
      PUT: jest.fn(),
      DELETE: jest.fn(),
    },
  };
  const defaultProps = {
    resources: {
      patronNoticePolicies: mockedPatronNoticePolicies,
      circulationRules: mockedCirculationRules,
    },
    mutator: mockedMutator,
  };

  afterEach(() => {
    EntryManager.mockClear();
  });

  it('should execute "EntryManager" with passed props', () => {
    const sortedEntyList = [
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
      <NoticePolicySettings
        {...defaultProps}
      />
    );

    expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
      nameKey: 'name',
      resourceKey: 'patronNoticePolicies',
      entryList: sortedEntyList,
      parentMutator: mockedMutator,
      enableDetailsActionMenu: true,
      permissions: {
        put: 'ui-circulation.settings.notice-policies',
        post: 'ui-circulation.settings.notice-policies',
        delete: 'ui-circulation.settings.notice-policies',
      },
      parentResources: defaultProps.resources,
      detailComponent: NoticePolicyDetail,
      entryFormComponent: NoticePolicyForm,
      paneTitle: labelIds.paneTitle,
      entryLabel: labelIds.entryLabel,
      defaultEntry: NoticePolicy.defaultNoticePolicy(),
      prohibitItemDelete: {
        close: labelIds.close,
        label: labelIds.header,
        message: labelIds.body,
      },
      parseInitialValues,
      onBeforeSave: normalize,
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "records" in "patronNoticePolicies"', () => {
    render(
      <NoticePolicySettings
        {...defaultProps}
        resources={{
          ...defaultProps.resources,
          patronNoticePolicies: {},
        }}
      />
    );

    expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });

  it('should execute "EntryManager" with correct props when no "patronNoticePolicies" in "resources"', () => {
    render(
      <NoticePolicySettings
        {...defaultProps}
        resources={{
          circulationRules: mockedCirculationRules,
        }}
      />
    );

    expect(EntryManager).toHaveBeenCalledWith(expect.objectContaining({
      entryList: [],
    }), {});
  });

  describe('isPolicyInUse', () => {
    beforeEach(() => {
      EntryManager.mockImplementationOnce(({ isEntryInUse }) => {
        return isEntryInUse(testIds.isPolicyInUse)
          ? <div data-testid="isPolicyInUse" />
          : null;
      });
    });

    it('should correctly process "isPolicyInUse" method when policy is included', () => {
      render(
        <NoticePolicySettings
          {...defaultProps}
        />
      );

      expect(screen.getByTestId(testIds.isPolicyInUse)).toBeInTheDocument();
    });

    it('should correctly process "isPolicyInUse" method when policy is not included', () => {
      render(
        <NoticePolicySettings
          {...defaultProps}
          resources={{
            circulationRules: {},
          }}
        />
      );

      expect(screen.queryByTestId(testIds.isPolicyInUse)).not.toBeInTheDocument();
    });
  });
});

describe('changeToString', () => {
  it('should make a string from "realTime" property', () => {
    const notice = {
      realTime: true,
    };

    changeToString(notice);

    expect(notice.realTime).toBe('true');
  });
});

describe('parseInitialValues', () => {
  it('should correctly process passed policy', () => {
    const policyForTest = {
      loanNotices: [
        { realTime: false },
        { realTime: true },
        { realTime: true },
      ],
      feeFineNotices: [
        {
          realTime: true,
        },
      ],
    };
    const expectedResult = {
      loanNotices: [
        { realTime: 'false' },
        { realTime: 'true' },
        { realTime: 'true' },
      ],
      feeFineNotices: [
        {
          realTime: 'true',
        },
      ],
    };

    expect(parseInitialValues(policyForTest)).toEqual(expectedResult);
  });

  it('should correctly process passed policy if no "loanNotices" and "feeFineNotices" in it', () => {
    expect(parseInitialValues({})).toEqual({});
  });
});
