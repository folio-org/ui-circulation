import React from 'react';
import PropTypes from 'prop-types';
import {
  injectIntl,
} from 'react-intl';
import {
  sortBy,
  get,
  reduce,
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
} from '../../constants';
import { getRecordName } from '../utils/utils';

export const isTemplateExist = (templateId, noticePolicies) => {
  const patronNoticeTemplateIds = reduce(noticePolicies, (templateIds, policy) => {
    const notices = [
      ...policy.loanNotices,
      ...policy.requestNotices,
      ...policy.feeFineNotices,
    ];

    const noticeIds = reduce(notices, (ids, notice) => {
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
        records: PropTypes.arrayOf(PropTypes.object),
      }),
      patronNoticePolicies: PropTypes.shape({
        entries: PropTypes.shape({
          records: PropTypes.arrayOf(PropTypes.object),
        }),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      entries: PropTypes.shape({
        POST: PropTypes.func,
        PUT: PropTypes.func,
        DELETE: PropTypes.func,
      }),
    }).isRequired,
    intl: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
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
          defaultEntry={{
            active: true,
            outputFormats: ['text/html'],
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
        />
      </TitleManager>
    );
  }
}

export default stripesConnect(injectIntl(PatronNotices));
