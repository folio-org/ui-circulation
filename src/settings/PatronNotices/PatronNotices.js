import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';
import {
  sortBy,
  get,
  cloneDeep,
} from 'lodash';

import { EntryManager } from '@folio/stripes/smart-components';
import {
  stripesConnect,
  TitleManager,
} from '@folio/stripes/core';

import PatronNoticeDetail from './PatronNoticeDetail';
import PatronNoticeForm from './PatronNoticeForm';
import {
  patronNoticeCategories,
  MAX_UNPAGED_RESOURCE_COUNT,
  NOTICE_FORMATS,
} from '../../constants';
import { getRecordName } from '../utils/utils';
import {
  getNoticeFormat,
  isSubjectEnabled,
} from './utils';

export const parseInitialValues = (entity = {}) => {
  // There is no need to change the initial values when creating a new entity.
  // Rely on the `metadata` to determine if this is a new entity.
  // The `entity.id` is not a reliable indicator, it is also missing when duplicating the record.
  if (!entity.metadata) {
    return entity;
  }

  // Set the `noticeFormat` using `getNoticeFormat` to support legacy fields.
  const noticeFormat = getNoticeFormat(entity);

  // Reset the `header` field to prevent displaying a value in the "Subject"
  // field when it is disabled.
  const header = isSubjectEnabled(noticeFormat)
    ? entity.localizedTemplates?.en?.header
    : undefined; // set to undefined to satisfy the `pristine`

  return {
    ...entity,
    localizedTemplates: {
      ...entity.localizedTemplates,
      en: {
        ...entity.localizedTemplates?.en,
        header,
      },
    },
    additionalProperties: {
      ...entity.additionalProperties,
      noticeFormat,
    },
  };
};

export const isTemplateExist = (templateId, noticePolicies) => {
  const patronNoticeTemplateIds = noticePolicies.reduce((templateIds, policy) => {
    const notices = [
      ...policy.loanNotices,
      ...policy.requestNotices,
      ...policy.feeFineNotices,
    ];

    const noticeIds = notices.reduce((ids, notice) => {
      return [...ids, notice.templateId];
    }, []);

    return [...templateIds, ...noticeIds];
  }, []);

  return patronNoticeTemplateIds.includes(templateId);
};

export class PatronNotices extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    resources: PropTypes.shape({
      entries: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }),
      patronNoticePolicies: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      entries: PropTypes.shape({
        POST: PropTypes.func,
        PUT: PropTypes.func,
        DELETE: PropTypes.func,
      }),
    }).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      path: 'templates',
      records: 'templates',
      params: {
        query: 'cql.allRecords=1 AND category=""',
      },
      perRequest: MAX_UNPAGED_RESOURCE_COUNT,
    },
    patronNoticePolicies: {
      type: 'okapi',
      records: 'patronNoticePolicies',
      path: 'patron-notice-policy-storage/patron-notice-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      throwErrors: false,
    },
  });

  isTemplateInUse = (templateId) => {
    const noticePolicies = get(this.props, 'resources.patronNoticePolicies.records', []);
    return isTemplateExist(templateId, noticePolicies);
  };

  handleBeforeSave = (values) => {
    const noticeFormat = values?.additionalProperties?.noticeFormat;
    const payload = cloneDeep(values);

    // The "Subject" field is enabled only for the email format, but BE requires
    // the `header` field to be sent for all formats. So, we need to set something.
    if (!isSubjectEnabled(noticeFormat)) {
      const headerValue = noticeFormat === NOTICE_FORMATS.PRINT
        ? NOTICE_FORMATS.PRINT
        : NOTICE_FORMATS.TEXT_MESSAGE;

      payload.localizedTemplates.en.header = headerValue;
    }

    payload.outputFormats = noticeFormat === NOTICE_FORMATS.TEXT_MESSAGE
      ? ['text/plain']
      : ['text/html'];

    // Set the `printOnly` flag to support consumers that still rely on it.
    payload.additionalProperties.printOnly = noticeFormat === NOTICE_FORMATS.PRINT;

    return payload;
  }

  render() {
    const {
      intl: {
        formatMessage,
      },
      location,
    } = this.props;

    const [{ id: defaultCategory }] = patronNoticeCategories;
    const entryList = sortBy((this.props.resources.entries || {}).records || [], ['name']);
    const record = getRecordName({
      entryList,
      location,
      formatMessage,
      optionNameId: 'ui-circulation.settings.title.patronNoticeTemplates',
    });

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={record}
      >
        <EntryManager
          {...this.props}
          parentMutator={this.props.mutator}
          entryList={entryList}
          detailComponent={PatronNoticeDetail}
          paneTitle={this.props.label}
          entryLabel={this.props.label}
          entryFormComponent={PatronNoticeForm}
          parseInitialValues={parseInitialValues}
          defaultEntry={{
            active: true,
            templateResolver: 'mustache',
            category: defaultCategory,
          }}
          nameKey="name"
          permissions={{
            put: 'ui-circulation.settings.notice-templates',
            post: 'ui-circulation.settings.notice-templates',
            delete: 'ui-circulation.settings.notice-templates',
          }}
          enableDetailsActionMenu
          editElement="both"
          isEntryInUse={this.isTemplateInUse}
          prohibitItemDelete={{
            close: formatMessage({ id: 'ui-circulation.settings.common.close' }),
            label: formatMessage({ id: 'ui-circulation.settings.patronNotices.denyDelete.header' }),
            message: formatMessage({ id: 'ui-circulation.settings.patronNotices.denyDelete.body' }),
          }}
          onBeforeSave={this.handleBeforeSave}
        />
      </TitleManager>
    );
  }
}

export default stripesConnect(injectIntl(PatronNotices));
