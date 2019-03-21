import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

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
        defaultEntry={{ active: true, outputFormats: ['text/html'], templateResolver: 'mustache' }}
        nameKey="name"
        permissions={{
          put: 'ui-circulation.settings.notice-templates',
          post: 'ui-circulation.settings.notice-templates',
          delete: 'ui-circulation.settings.notice-templates',
        }}
        uniquenessValidator={this.props.mutator}
        enableDetailsActionMenu
        editElement="both"
      />
    );
  }
}

export default stripesConnect(PatronNotices);
