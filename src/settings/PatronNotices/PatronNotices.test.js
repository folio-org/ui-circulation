import { sortBy } from 'lodash';
import { render } from '@folio/jest-config-stripes/testing-library/react';
import { EntryManager } from '@folio/stripes/smart-components';
import { TitleManager } from '@folio/stripes/core';

// eslint-disable-next-line import/no-named-as-default
import PatronNotices, {
  isTemplateExist,
  parseInitialValues,
  PatronNotices as PatronNoticesClass,
} from './PatronNotices';
import PatronNoticeDetail from './PatronNoticeDetail';
import PatronNoticeForm from './PatronNoticeForm';
import {
  MAX_UNPAGED_RESOURCE_COUNT,
  NOTICE_FORMATS,
  patronNoticeCategories,
} from '../../constants';
import { getRecordName } from '../utils/utils';

const recordName = 'recordName';

jest.mock('./PatronNoticeDetail', () => () => null);
jest.mock('./PatronNoticeForm', () => () => null);
jest.mock('../utils/utils', () => ({
  getRecordName: jest.fn(() => recordName),
}));

describe('PatronNotices', () => {
  const labelIds = {
    close: 'ui-circulation.settings.common.close',
    header: 'ui-circulation.settings.patronNotices.denyDelete.header',
    body: 'ui-circulation.settings.patronNotices.denyDelete.body',
    generalTitle: 'ui-circulation.settings.title.general',
    optionNameId: 'ui-circulation.settings.title.patronNoticeTemplates',
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
    location: {
      pathname: 'pathname',
    },
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
      parseInitialValues: expect.any(Function),
      onBeforeSave: expect.any(Function),
    }), {});
  });

  it('should trigger TitleManager with correct props', () => {
    render(
      <PatronNotices
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
      <PatronNotices
        {...defaultProps}
      />
    );

    const expectedArg = {
      entryList: sortBy(defaultProps.resources.entries.records, 'name'),
      location: defaultProps.location,
      formatMessage: expect.any(Function),
      optionNameId: labelIds.optionNameId,
    };

    expect(getRecordName).toHaveBeenCalledWith(expectedArg);
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

  describe('parseInitialValues', () => {
    it('should return the entity unchanged when it has no "metadata" (new entity)', () => {
      const entity = {
        active: true,
        category: 'testCategory',
      };

      expect(parseInitialValues(entity)).toBe(entity);
    });

    it('should return the entity unchanged when called without arguments', () => {
      expect(parseInitialValues()).toEqual({});
    });

    it('should keep the header and set "noticeFormat" for an existing email notice', () => {
      const entity = {
        metadata: { createdDate: '2024-01-01' },
        localizedTemplates: {
          en: {
            header: 'Existing subject',
            body: 'Existing body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.EMAIL,
        },
      };

      expect(parseInitialValues(entity)).toEqual({
        ...entity,
        localizedTemplates: {
          en: {
            header: 'Existing subject',
            body: 'Existing body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.EMAIL,
        },
      });
    });

    it('should reset the header for an existing print notice', () => {
      const entity = {
        metadata: { createdDate: '2024-01-01' },
        localizedTemplates: {
          en: {
            header: 'print',
            body: 'Existing body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.PRINT,
        },
      };

      expect(parseInitialValues(entity)).toEqual({
        ...entity,
        localizedTemplates: {
          en: {
            header: undefined,
            body: 'Existing body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.PRINT,
        },
      });
    });

    it('should derive "noticeFormat" from the legacy "printOnly" flag when it is not set', () => {
      const entity = {
        metadata: { createdDate: '2024-01-01' },
        localizedTemplates: {
          en: {
            header: 'print',
            body: 'Existing body',
          },
        },
        additionalProperties: {
          printOnly: true,
        },
      };

      const result = parseInitialValues(entity);

      expect(result.additionalProperties.noticeFormat).toBe(NOTICE_FORMATS.PRINT);
      expect(result.localizedTemplates.en.header).toBe(undefined);
    });
  });

  describe('handleBeforeSave', () => {
    const getInstance = () => new PatronNoticesClass(defaultProps);

    it('should keep the header and mark output as html for the email format', () => {
      const values = {
        localizedTemplates: {
          en: {
            header: 'A subject',
            body: 'A body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.EMAIL,
        },
      };

      const result = getInstance().handleBeforeSave(values);

      expect(result.localizedTemplates.en.header).toBe('A subject');
      expect(result.outputFormats).toEqual(['text/html']);
      expect(result.additionalProperties.printOnly).toBe(false);
    });

    it('should overwrite the header and mark output as html for the print format', () => {
      const values = {
        localizedTemplates: {
          en: {
            header: '',
            body: 'A body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.PRINT,
        },
      };

      const result = getInstance().handleBeforeSave(values);

      expect(result.localizedTemplates.en.header).toBe(NOTICE_FORMATS.PRINT);
      expect(result.outputFormats).toEqual(['text/html']);
      expect(result.additionalProperties.printOnly).toBe(true);
    });

    it('should overwrite the header and mark output as plain text for the text message format', () => {
      const values = {
        localizedTemplates: {
          en: {
            header: '',
            body: 'A body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.TEXT_MESSAGE,
        },
      };

      const result = getInstance().handleBeforeSave(values);

      expect(result.localizedTemplates.en.header).toBe(NOTICE_FORMATS.TEXT_MESSAGE);
      expect(result.outputFormats).toEqual(['text/plain']);
      expect(result.additionalProperties.printOnly).toBe(false);
    });

    it('should clear a stale legacy "printOnly" flag when switching away from the print format', () => {
      const values = {
        localizedTemplates: {
          en: {
            header: 'A subject',
            body: 'A body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.EMAIL,
          printOnly: true,
        },
      };

      const result = getInstance().handleBeforeSave(values);

      expect(result.additionalProperties.printOnly).toBe(false);
    });

    it('should not mutate the "values" passed in', () => {
      const values = {
        localizedTemplates: {
          en: {
            header: '',
            body: 'A body',
          },
        },
        additionalProperties: {
          noticeFormat: NOTICE_FORMATS.PRINT,
        },
      };

      getInstance().handleBeforeSave(values);

      expect(values.localizedTemplates.en.header).toBe('');
      expect(values.additionalProperties.printOnly).toBeUndefined();
    });
  });
});
