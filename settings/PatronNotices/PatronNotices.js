import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PatronNoticesList from './PatronNoticesList';
import PatronNoticesGeneralConfig from './PatronNoticesGeneralConfig';
import { stripesShape } from '@folio/stripes-core/src/Stripes';

class PatronNotices extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);
    this.generalConfig = props.stripes.connect(PatronNoticesGeneralConfig);
    this.noticesList = props.stripes.connect(PatronNoticesList);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/settings/circulation/patron-notices/general" render={(props) => <this.generalConfig {...props} stripes={this.props.stripes} />} />
        <Route component={this.noticesList} />
      </Switch>
    );
  }
}

export default PatronNotices;
