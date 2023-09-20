import { render } from '@folio/jest-config-stripes/testing-library/react';
import { EntryManager } from '@folio/stripes/smart-components';

// eslint-disable-next-line import/no-named-as-default
import PatronNotices, {
  isTemplateExist,
  PatronNotices as PatronNoticesClass,
} from './PatronNotices';
import PatronNoticeDetail from './PatronNoticeDetail';
import PatronNoticeForm from './PatronNoticeForm';
import {
  MAX_UNPAGED_RESOURCE_COUNT,
  patronNoticeCategories,
} from '../../constants';

jest.mock('./PatronNoticeDetail', () => () => null);
jest.mock('./PatronNoticeForm', () => () => null);

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
        name: 'Bob',
      },
      {
        name: 'John',
      },
      {
        name: 'Ann',
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
        name: 'Ann',
      },
      {
        name: 'Bob',
      },
      {
        name: 'John',
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

  describe('manifest', () => {
    describe('patronNoticePolicies', () => {
      it('should have limit from config', () => {
        const maxUnpagedResourceCount = 10;
        const limitProps = {
          stripes: {
            config: {
              maxUnpagedResourceCount,
            }
          }
        };
        const result = PatronNoticesClass.manifest.patronNoticePolicies.params.limit('', '', '', '', limitProps);

        expect(result).toBe(maxUnpagedResourceCount);
      });

      it('should have default limit', () => {
        const limitProps = {
          stripes: {
            config: {}
          }
        };
        const result = PatronNoticesClass.manifest.patronNoticePolicies.params.limit('', '', '', '', limitProps);

        expect(result).toBe(MAX_UNPAGED_RESOURCE_COUNT);
      });
    });
  });

  describe('isTemplateExist', () => {
    const templateId = 'templateId';
    const commonNoticePolicies = {
      loanNotices: [{
        templateId: '1',
      }],
      requestNotices: [{
        templateId: '2',
      }],
    };

    describe('when template already exists', () => {
      it('should return true', () => {
        const noticePolicies = [{
          ...commonNoticePolicies,
          feeFineNotices: [{
            templateId,
          }],
        }];

        expect(isTemplateExist(templateId, noticePolicies)).toBe(true);
      });
    });

    describe('when template does not exist', () => {
      it('should return false', () => {
        const noticePolicies = [{
          ...commonNoticePolicies,
          feeFineNotices: [{
            templateId: '3',
          }],
        }];

        expect(isTemplateExist(templateId, noticePolicies)).toBe(false);
      });
    });
  });
});
