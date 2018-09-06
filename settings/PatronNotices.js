import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import PatronNoticesList from './PatronNoticesList';
import PatronNoticesGeneralConfig from './PatronNoticesGeneralConfig';

class PatronNotices extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/settings/circulation/patron-notices/general" component={PatronNoticesGeneralConfig} />
        <Route component={PatronNoticesList} />
      </Switch>
    );
  }
}

export default PatronNotices;
