import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';

import PatronNoticeDetail from './PatronNoticeDetail';
import PatronNoticeForm from './PatronNoticeForm';

class PatronNotices extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    resources: PropTypes.shape({
      entries: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
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

  // constructor(props) {
  //   super(props);
  // }

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      path: 'templates',
      records: 'templates',
    },
  });

  render() {
    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={sortBy((this.props.resources.entries || {}).records || [], ['name'])}
        detailComponent={PatronNoticeDetail}
        paneTitle={this.props.label}
        entryLabel={this.props.label}
        entryFormComponent={PatronNoticeForm}
        // validate={this.validate}
        nameKey="id"
        // TODO: use real permissions once they exist (EntryManager crashes without a permissions object)
        permissions={{
          put: 'settings.organization.enabled',
          post: 'ui-circulation.settings.patronnotices.post',
          delete: 'ui-circulation.settings.patronnotices.delete',
        }}
      />
    );
  }
}

export default PatronNotices;
