import React from 'react';
import PropTypes from 'prop-types';

import Button from '@folio/stripes-components/lib/Button';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';

class PatronNoticesGeneralConfig extends React.Component {
  render() {
    return (
      <Pane
        paneTitle="Patron notices | Configuration"
        dismissible
        lastMenu={<PaneMenu><Button buttonStyle="primary paneHeaderNewButton">Save</Button></PaneMenu>}
        onClose={() => this.props.history.push('/settings/circulation/patron-notices')}
      >
        <p>Test</p>
      </Pane>
    );
  }
}

export default PatronNoticesGeneralConfig;
