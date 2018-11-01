import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@folio/stripes-components/lib/Button';
import { makeQueryFunction } from '@folio/stripes/smart-components';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';

import PatronNoticesGeneralConfig from './PatronNoticesGeneralConfig';

class PatronNotices extends React.Component {
  static manifest = Object.freeze({
    addressTypes: {
      type: 'okapi',
      path: 'addresstypes',
      records: 'addressTypes',
    },
    patronNoticeTemplates: {
      type: 'okapi',
      path: 'template',
      records: 'templates',
      // GET: {
      //   params: {
      //     query: makeQueryFunction(
      //       'cql.allRecords=1',
      //       '',
      //     //  '(requester.barcode="${query.query}" or item.title="${query.query}" or title="${query.query}")',
      //       {},
      //     //  filterConfig,
      //     )
      //   },
      //   staticFallback: { params: {} },
      // },
      // resourceShouldRefresh: true,
    },
  });

  static propTypes = {
    resources: PropTypes.object.isRequired,
    stripes: PropTypes.object.isRequired,
  };

  render() {
    console.log("records", this.props.resources.patronNoticeTemplates)
    return (
      <Pane
        defaultWidth="fill"
        paneTitle="Patron notices"
        lastMenu={<PaneMenu><Button buttonStyle="primary paneHeaderNewButton">+ New</Button></PaneMenu>}
      >
        <Link to="patron-notices/general">General configuration</Link>
      </Pane>
    );
  }
}

export default PatronNotices;
