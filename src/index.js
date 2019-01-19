import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from './router';
import Settings from './settings';
import LoanPolicySettings from './settings/LoanPolicy/LoanPolicySettings';
import LoanRules from './settings/LoanRules';
import RequestCancellationReasons from './settings/RequestCancellationReasons';
import CheckoutSettings from './settings/CheckoutSettings';
import FixedDueDateScheduleManager from './settings/FixedDueDateScheduleManager';
import PatronNotices from './settings/PatronNotices';
import StaffSlips from './settings/StaffSlips';
import NoticePolicySettings from './settings/NoticePolicy';

export default class Circulation extends Component {
  static actionNames = ['stripesHome', 'usersSortByName'];

  static propTypes = {
    stripes: PropTypes.shape({
      connect: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.object.isRequired,
  }

  render() {
    const {
      match: { path },
      stripes,
    } = this.props;

    return (
      <Route path={path} component={Settings}>
        <Switch>
          {stripes.hasPerm('ui-circulation.settings.loan-policies') && (
            <Route path={`${path}/loan-policies`} exact component={LoanPolicySettings} />
          )}
          {stripes.hasPerm('ui-circulation.settings.loan-rules') && (
            <Route path={`${path}/loan-rules`} exact component={LoanRules} />
          )}
          {stripes.hasPerm('ui-circulation.settings.loan-rules') && (
            <Route path={`${path}/fixed-due-date-schedules`} exact component={FixedDueDateScheduleManager} />
          )}
          <Route path={`${path}/checkout`} exact component={CheckoutSettings} />
          <Route path={`${path}/staffslips`} exact component={StaffSlips} />
          {stripes.hasPerm('ui-circulation.settings.cancellation-reasons') && (
            <Route path={`${path}/cancellation-reasons`} exact component={RequestCancellationReasons} />
          )}
          <Route path={`${path}/patron-notices`} exact component={PatronNotices} />
          <Route path={`${path}/notice-policies`} exact component={NoticePolicySettings} />
        </Switch>
      </Route>
    );
  }
}
