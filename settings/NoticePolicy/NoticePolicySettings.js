import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';

import NoticePolicyDetail from './NoticePolicyDetail';
import NoticePolicyForm from './NoticePolicyForm';
import validate from '../Validation/NoticePolicy';
import NoticePolicy from '../Models/NoticePolicy';

class NoticePolicySettings extends React.Component {
  static manifest = Object.freeze({
    noticePolicies: {
      type: 'okapi',
      records: 'noticePolicies',
      path: 'notice-policy-storage/notice-policies',
    },
  });

  static propTypes = {
    resources: PropTypes.shape({
      noticePolicies: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      noticePolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
  };

  render() {
    const {
      resources,
      mutator,
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.notice-policies',
      post: 'ui-circulation.settings.notice-policies',
      delete: 'ui-circulation.settings.notice-policies',
    };

    const entryList = sortBy((resources.noticePolicies || {}).records, ['name']);

    return (
      <EntryManager
        {...this.props}
        parentMutator={mutator}
        parentResources={resources}
        entryList={entryList}
        resourceKey="noticePolicies"
        detailComponent={NoticePolicyDetail}
        entryFormComponent={NoticePolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.noticePolicy.paneTitle" />}
        entryLabel={<FormattedMessage id="ui-circulation.settings.noticePolicy.entryLabel" />}
        nameKey="name"
        permissions={permissions}
        validate={validate}
        enableDetailsActionMenu
        defaultEntry={NoticePolicy.defaultNoticePolicy()}
      />
    );
  }
}

export default NoticePolicySettings;
