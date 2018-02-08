import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';

import LoanPolicySettings from './LoanPolicySettings';
import LoanRules from './LoanRules';
import ScanCheckoutSettings from './ScanCheckoutSettings';
import FixedDueDateScheduleManager from './FixedDueDateScheduleManager';

const pages = [
  {
    route: 'loan-policies',
    label: 'Loan policies',
    component: LoanPolicySettings,
    perm: 'ui-circulation.settings.loan-policies',
  },
  {
    route: 'loan-rules',
    label: 'Loan rules',
    component: LoanRules,
    perm: 'ui-circulation.settings.loan-rules',
  },
  {
    route: 'fixed-due-date-schedules',
    label: 'Fixed due date schedules',
    component: FixedDueDateScheduleManager,
    perm: 'ui-circulation.settings.loan-rules',
  },
  {
    route: 'checkout',
    label: 'Scan ID',
    component: ScanCheckoutSettings,
  },
];

export default props => <Settings {...props} pages={pages} paneTitle="Circulation" />;
