import React from 'react';
import Settings from '@folio/stripes-components/lib/Settings';

import LoanPolicySettings from './LoanPolicySettings';

const pages = [
  {
    route: 'loan-policies',
    label: 'Loan policies',
    component: LoanPolicySettings,
  },
];

export default props => <Settings {...props} pages={pages} paneTitle="Circulation" />;
