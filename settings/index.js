import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';

import LoanPolicySettings from './LoanPolicySettings';
import LoanRules from './LoanRules';

const pages = [
  {
    route: 'loan-policies',
    label: 'Loan policies',
    component: LoanPolicySettings,
  },
  {
    route: 'loan-rules',
    label: 'Loan rules',
    component: LoanRules,
  },
];

export default props => <Settings {...props} pages={pages} paneTitle="Circulation" />;
