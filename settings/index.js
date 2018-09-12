import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';
import { stripesShape } from '@folio/stripes-core/src/Stripes';

import LoanPolicySettings from './LoanPolicySettings';
import LoanRules from './LoanRules';
import RequestCancellationReasons from './RequestCancellationReasons';
import CheckoutSettings from './CheckoutSettings';
import FixedDueDateScheduleManager from './FixedDueDateScheduleManager';
import StaffSlips from './StaffSlips';

class Circulation extends React.Component {
  static propTypes = {
    stripes: stripesShape.isRequired,
  }

  constructor(props) {
    super(props);
    this.pages = [
      {
        route: 'loan-policies',
        label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.loanPolicies' }),
        component: LoanPolicySettings,
        perm: 'ui-circulation.settings.loan-policies',
      },
      {
        route: 'loan-rules',
        label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.loanRules' }),
        component: LoanRules,
        perm: 'ui-circulation.settings.loan-rules',
      },
      {
        route: 'fixed-due-date-schedules',
        label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.fdds' }),
        component: FixedDueDateScheduleManager,
        perm: 'ui-circulation.settings.loan-rules',
      },
      {
        route: 'checkout',
        label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.otherSettings' }),
        component: CheckoutSettings,
      },
      {
        route: 'staffslips',
        label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.staffSlips' }),
        component: StaffSlips,
      },
      {
        route: 'cancellation-reasons',
        label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.requestCancellationReasons' }),
        component: RequestCancellationReasons,
        perm: 'ui-circulation.settings.cancellation-reasons',
      },
    ];
  }

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.paneTitle' })}
      />
    );
  }
}

export default Circulation;
