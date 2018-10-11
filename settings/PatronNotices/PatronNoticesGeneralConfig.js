import React from 'react';
import PropTypes from 'prop-types';

import Button from '@folio/stripes-components/lib/Button';
import Pane from '@folio/stripes-components/lib/Pane';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import ConfigManager from '@folio/stripes-smart-components/lib/ConfigManager';
import { stripesShape } from '@folio/stripes-core/src/Stripes';

class PatronNoticesGeneralConfig extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.configManager = props.stripes.connect(ConfigManager);
  }

  render() {
    return (
      <this.configManager
        label="Patron notices | Configuration"
        moduleName="CIRCULATION"
        configName="patron_notices_config"
        stripes={this.props.stripes}
      />
    );
  }
}

export default PatronNoticesGeneralConfig;
