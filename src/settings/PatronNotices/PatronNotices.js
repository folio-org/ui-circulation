import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  sortBy,
  get,
  reduce
} from 'lodash';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import PatronNoticeDetail from './PatronNoticeDetail';
import PatronNoticeForm from './PatronNoticeForm';
import { patronNoticeCategories } from '../../constants';
import { PatronNoticeTemplate as validatePatronNoticeTemplate } from '../Validation';

class PatronNotices extends React.Component {
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
    stripes: PropTypes.shape({
      intl: PropTypes.object.isRequired,
    }),
  };

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      path: 'templates',
      records: 'templates',
      params: {
        query: 'cql.allRecords=1 AND category=""',
      },
      recordsRequired: 50,
      perRequest: 50,
    },
    nameUniquenessValidator: {
      type: 'okapi',
      records: 'templates',
      accumulate: 'true',
      path: 'templates',
      fetch: false,
    },
    patronNoticePolicies: {
      type: 'okapi',
      records: 'patronNoticePolicies',
      path: 'patron-notice-policy-storage/patron-notice-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: '1000',
      },
      throwErrors: false,
    },
  });

  isTemplateInUse = (templateId) => {
    const noticePolicies = get(this.props, 'resources.patronNoticePolicies.records', []);
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

  render() {
    const [{ id: defaultCategory }] = sortBy(patronNoticeCategories, ['label']);

    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={sortBy((this.props.resources.entries || {}).records || [], ['name'])}
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
        uniquenessValidator={this.props.mutator}
        enableDetailsActionMenu
        editElement="both"
        validate={validatePatronNoticeTemplate}
        isEntryInUse={this.isTemplateInUse}
        prohibitItemDelete={{
          close: <FormattedMessage id="ui-circulation.settings.common.close" />,
          label: <FormattedMessage id="ui-circulation.settings.patronNotices.denyDelete.header" />,
          message: <FormattedMessage id="ui-circulation.settings.patronNotices.denyDelete.body" />,
        }}
      />
    );
  }
}

export default stripesConnect(PatronNotices);
