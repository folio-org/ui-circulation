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

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      path: 'templates',
      records: 'templates',
    },
  });

  constructor(props) {
    super(props);

    // this.props.resources.entries
    // temporary list of templates for development
    // this.entries = {
    //   isPending: false,
    //   dataKey: 'patron-notices',
    //   records: [
    //     {
    //       id: '12345',
    //       name: 'Test 1',
    //       active: true,
    //       description: 'Just a test template',
    //       category: 'Request',
    //       subject: 'Need some stuff',
    //       outputFormats: [
    //         'text/plain',
    //       ],
    //       templateResolver: 'mustache',
    //       localizedTemplates: {
    //         "email": {
    //           "body": "<h2>Notice</h2><p>This is a template test for email. Your item is at {{location}} and will be kept until {{hold_expiration}}.</p>"
    //         },
    //         "sms":
    //         {
    //           "body": "<p>This is a {template} test for sms.</p>"
    //         },
    //         "print":
    //         {
    //           "body": "<p>This is a {template} test for print.</p>"
    //         }
    //       }
    //     }
    //   ]
    // };
  }

  render() {
    console.log("entries", this.props.resources.entries)
    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={sortBy((this.props.resources.entries || {}).records || [], ['name'])}
        detailComponent={PatronNoticeDetail}
        paneTitle={this.props.label}
        entryLabel={this.props.label}
        entryFormComponent={PatronNoticeForm}
        defaultEntry={{ outputFormats: ['html'], templateResolver: 'mustache' }}
        // validate={this.validate}
        nameKey="name"
        // TODO: use real permissions once they exist (EntryManager crashes without a permissions object)
        permissions={{
          put: 'settings.organization.enabled',
          post: 'settings.organization.enabled',
          delete: 'settings.organization.enabled',
        }}
      />
    );
  }
}

export default PatronNotices;
