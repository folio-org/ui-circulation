import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Settings } from '@folio/stripes/smart-components';

import LoanPolicySettings from './LoanPolicySettings';
import LoanRules from './LoanRules';
import RequestCancellationReasons from './RequestCancellationReasons';
import CheckoutSettings from './CheckoutSettings';
import FixedDueDateScheduleManager from './FixedDueDateScheduleManager';
import PatronNotices from './PatronNotices';
import StaffSlips from './StaffSlips';

class Circulation extends React.Component {
  constructor(props) {
    super(props);

    this.pages = [
      {
        route: 'loan-policies',
        label: <FormattedMessage id="ui-circulation.settings.index.loanPolicies" />,
        component: LoanPolicySettings,
        perm: 'ui-circulation.settings.loan-policies',
      },
      {
        route: 'loan-rules',
        label: <FormattedMessage id="ui-circulation.settings.index.loanRules" />,
        component: LoanRules,
        perm: 'ui-circulation.settings.loan-rules',
      },
      {
        route: 'fixed-due-date-schedules',
        label: <FormattedMessage id="ui-circulation.settings.index.fdds" />,
        component: FixedDueDateScheduleManager,
        perm: 'ui-circulation.settings.fdds',
      },
      {
        route: 'checkout',
        label: <FormattedMessage id="ui-circulation.settings.index.otherSettings" />,
        component: CheckoutSettings,
        perm: 'ui-circulation.settings.otherSettings',
      },
      {
        route: 'staffslips',
        label: <FormattedMessage id="ui-circulation.settings.index.staffSlips" />,
        component: StaffSlips,
        perm: 'ui-circulation.settings.staffSlips',
      },
      {
        route: 'cancellation-reasons',
        label: <FormattedMessage id="ui-circulation.settings.index.requestCancellationReasons" />,
        component: RequestCancellationReasons,
        perm: 'ui-circulation.settings.cancellation-reasons',
      },
      {
        route: 'patron-notices',
        label: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.index.patronNotices' }),
        component: PatronNotices,
        perm: 'ui-circulation.settings.patronNotices',
      },
    ];
  }

  render() {
    return (
      <Settings
        {...this.props}
        pages={this.pages}
        paneTitle={<FormattedMessage id="ui-circulation.settings.index.paneTitle" />}
      />
    );
  }
}

export default Circulation;
