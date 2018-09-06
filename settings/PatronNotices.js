import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '@folio/stripes-components/lib/Button';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';

class PatronNotices extends React.Component {
  render() {
    return (
      <Pane
        paneTitle="Patron notices"
        lastMenu={<PaneMenu><Button buttonStyle="primary paneHeaderNewButton">+ New</Button></PaneMenu>}
      >
        <Link to="cornell.edu">General configuration</Link>
      </Pane>
    );
  }
}

export default PatronNotices;
