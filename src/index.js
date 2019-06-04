import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from '@folio/stripes/core';

import Settings from './settings';
import LoanHistory from './settings/LoanHistory/LoanHistory';
import LoanPolicySettings from './settings/LoanPolicy/LoanPolicySettings';
import CirculationRules from './settings/CirculationRules';
import RequestCancellationReasons from './settings/RequestCancellationReasons';
import CheckoutSettings from './settings/CheckoutSettings';
import FixedDueDateScheduleManager from './settings/FixedDueDateScheduleManager';
import PatronNotices from './settings/PatronNotices';
import StaffSlips from './settings/StaffSlips';
import NoticePolicySettings from './settings/NoticePolicy';
import RequestPolicySettings from './settings/RequestPolicy';

export const settingsRoutes = [
  {
    route: 'loan-history',
    label: 'ui-circulation.settings.index.loanHistory',
    component: LoanHistory,
    perm: 'ui-circulation.settings.loan-history',
  },
  {
    route: 'loan-policies',
    label: 'ui-circulation.settings.index.loanPolicies',
    component: LoanPolicySettings,
    perm: 'ui-circulation.settings.loan-policies',
  },
  {
    route: 'rules',
    label: 'ui-circulation.settings.index.circulationRules',
    component: CirculationRules,
    perm: 'ui-circulation.settings.circulation-rules',
  },
  {
    route: 'fixed-due-date-schedules',
    label: 'ui-circulation.settings.index.fdds',
    component: FixedDueDateScheduleManager,
    perm: 'ui-circulation.settings.fixed-due-date-schedules',
  },
  {
    route: 'checkout',
    label: 'ui-circulation.settings.index.otherSettings',
    component: CheckoutSettings,
    perm: 'ui-circulation.settings.other-settings',
  },
  {
    route: 'staffslips',
    label: 'ui-circulation.settings.index.staffSlips',
    component: StaffSlips,
    perm: 'ui-circulation.settings.staff-slips',
  },
  {
    route: 'cancellation-reasons',
    label: 'ui-circulation.settings.index.requestCancellationReasons',
    component: RequestCancellationReasons,
    perm: 'ui-circulation.settings.cancellation-reasons',
  },
  {
    route: 'patron-notices',
    label: 'ui-circulation.settings.index.patronNotices',
    component: PatronNotices,
    perm: 'ui-circulation.settings.notice-templates',
  },
  {
    route: 'notice-policies',
    label: 'ui-circulation.settings.index.noticePolicies',
    component: NoticePolicySettings,
    perm: 'ui-circulation.settings.notice-policies',
  },
  {
    route: 'request-policies',
    label: 'ui-circulation.settings.index.requestPolicies',
    component: RequestPolicySettings,
    perm: 'ui-circulation.settings.request-policies',
  },
];

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
          {settingsRoutes
            .filter(setting => stripes.hasPerm(setting.perm))
            .map(setting => <Route path={`${path}/${setting.route}`} key={setting.route} component={setting.component} />)
          }
        </Switch>
      </Route>
    );
  }
}
