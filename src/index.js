import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from '@folio/stripes/core';

import Settings from './settings';
import LoanPolicySettings from './settings/LoanPolicy/LoanPolicySettings';
import CirculationRules from './settings/CirculationRules';
import RequestCancellationReasons from './settings/RequestCancellationReasons';
import CheckoutSettings from './settings/CheckoutSettings';
import FixedDueDateScheduleManager from './settings/FixedDueDateScheduleManager';
import PatronNotices from './settings/PatronNotices';
import StaffSlips from './settings/StaffSlips';
import NoticePolicySettings from './settings/NoticePolicy';
import RequestPolicySettings from './settings/RequestPolicy';

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
            <Route path={`${path}/loan-policies`} component={LoanPolicySettings} />
          )}
          {stripes.hasPerm('ui-circulation.settings.circulation-rules') && (
            <Route path={`${path}/rules`} exact component={CirculationRules} />
          )}
          {stripes.hasPerm('ui-circulation.settings.fixed-due-date-schedules') && (
            <Route path={`${path}/fixed-due-date-schedules`} component={FixedDueDateScheduleManager} />
          )}
          {stripes.hasPerm('ui-circulation.settings.other-settings') && (
            <Route path={`${path}/checkout`} exact component={CheckoutSettings} />
          )}
          {stripes.hasPerm('ui-circulation.settings.staff-slips') && (
            <Route path={`${path}/staffslips`} component={StaffSlips} />
          )}
          {stripes.hasPerm('ui-circulation.settings.cancellation-reasons') && (
            <Route path={`${path}/cancellation-reasons`} exact component={RequestCancellationReasons} />
          )}
          {stripes.hasPerm('ui-circulation.settings.notice-templates') && (
            <Route path={`${path}/patron-notices`} component={PatronNotices} />
          )}
          {stripes.hasPerm('ui-circulation.settings.notice-policies') && (
            <Route path={`${path}/notice-policies`} component={NoticePolicySettings} />
          )}
          {stripes.hasPerm('ui-circulation.settings.request-policies') && (
            <Route path={`${path}/request-policies`} component={RequestPolicySettings} />
          )}
        </Switch>
      </Route>
    );
  }
}
