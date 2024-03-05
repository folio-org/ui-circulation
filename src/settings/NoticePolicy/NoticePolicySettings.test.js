import { sortBy } from 'lodash';

import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { EntryManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

import NoticePolicySettings, {
  changeToString,
  parseInitialValues,
} from './NoticePolicySettings';
import NoticePolicyDetail from './NoticePolicyDetail';
import NoticePolicyForm from './NoticePolicyForm';
import { NoticePolicy } from '../Models/NoticePolicy';
import normalize from './utils/normalize';
import { getRecordName } from '../utils/utils';

const recordName = 'recordName';

jest.mock('../utils/utils', () => ({
  getRecordName: jest.fn(() => recordName),
}));

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
    generalTitle: 'ui-circulation.settings.title.general',
    optionNameId: 'ui-circulation.settings.title.patronNoticePolicies',
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
    location: {
      pathname: 'pathname',
    },
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

  it('should trigger TitleManager with correct props', () => {
    render(
      <NoticePolicySettings
        {...defaultProps}
      />
    );

    const expectedProps = {
      page: labelIds.generalTitle,
      record: recordName,
    };

    expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
  });

  it('should get record name', () => {
    render(
      <NoticePolicySettings
        {...defaultProps}
      />
    );

    const expectedArg = {
      entryList: sortBy(defaultProps.resources.patronNoticePolicies.records, 'name'),
      location: defaultProps.location,
      formatMessage: expect.any(Function),
      optionNameId: labelIds.optionNameId,
    };

    expect(getRecordName).toHaveBeenCalledWith(expectedArg);
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
