import React from 'react';
import PropTypes from 'prop-types';
import {
  get,
  sortBy,
} from 'lodash';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import NoticePolicyDetail from './NoticePolicyDetail';
import NoticePolicyForm from './NoticePolicyForm';
import { NoticePolicy } from '../Models/NoticePolicy';
import { NoticePolicy as validateNoticePolicy } from '../Validation';

class NoticePolicySettings extends React.Component {
  static manifest = Object.freeze({
    patronNoticePolicies: {
      type: 'okapi',
      records: 'patronNoticePolicies',
      path: 'patron-notice-policy-storage/patron-notice-policies',
    },
    templates: {
      type: 'okapi',
      records: 'templates',
      path: 'templates',
      params: {
        query: 'cql.allRecords=1 AND category=""',
      },
    },
    circulationRules: {
      type: 'okapi',
      path: 'circulation/rules',
      resourceShouldRefresh: true,
    },
  });

  static propTypes = {
    intl: intlShape.isRequired,
    resources: PropTypes.shape({
      patronNoticePolicies: PropTypes.object,
      templates: PropTypes.object,
      circulationRules: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      patronNoticePolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
  };

  isPolicyInUse = (policyId) => {
    const [
      circulationRules = { rulesAsText: '' },
    ] = get(this.props, 'resources.circulationRules.records', []);

    return circulationRules.rulesAsText.includes(policyId);
  };

  render() {
    const {
      resources,
      mutator,
      intl: {
        formatMessage,
      },
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.notice-policies',
      post: 'ui-circulation.settings.notice-policies',
      delete: 'ui-circulation.settings.notice-policies',
    };

    const entryList = sortBy((resources.patronNoticePolicies || {}).records, ['name']);

    return (
      <EntryManager
        {...this.props}
        nameKey="name"
        resourceKey="patronNoticePolicies"
        entryList={entryList}
        parentMutator={mutator}
        enableDetailsActionMenu
        permissions={permissions}
        parentResources={resources}
        detailComponent={NoticePolicyDetail}
        entryFormComponent={NoticePolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.noticePolicy.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.noticePolicy.entryLabel' })}
        validate={validateNoticePolicy}
        defaultEntry={NoticePolicy.defaultNoticePolicy()}
        isEntryInUse={this.isPolicyInUse}
        prohibitItemDelete={{
          close: <FormattedMessage id="ui-circulation.settings.common.close" />,
          label: <FormattedMessage id="ui-circulation.settings.noticePolicy.denyDelete.header" />,
          message: <FormattedMessage id="ui-circulation.settings.noticePolicy.denyDelete.body" />,
        }}
      />
    );
  }
}

export default injectIntl(stripesConnect(NoticePolicySettings));
