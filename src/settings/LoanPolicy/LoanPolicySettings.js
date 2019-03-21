import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';

import stripesConnect from '../../connect';
import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import LoanPolicy from '../Models/LoanPolicy';
import { LoanPolicy as validateLoanPolicy } from '../Validation';

class LoanPolicySettings extends React.Component {
  static manifest = Object.freeze({
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      perRequest: 100,
      path: 'loan-policy-storage/loan-policies',
    },
    fixedDueDateSchedules: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
      perRequest: 100,
      path: 'fixed-due-date-schedule-storage/fixed-due-date-schedules',
      resourceShouldRefresh: true,
    },
  });

  static propTypes = {
    intl: intlShape.isRequired,
    resources: PropTypes.shape({
      loanPolicies: PropTypes.object,
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      loanPolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
  };

  render() {
    const {
      resources,
      mutator,
      intl: {
        formatMessage,
      },
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.loan-policies',
      post: 'ui-circulation.settings.loan-policies',
      delete: 'ui-circulation.settings.loan-policies',
    };

    const entryList = sortBy((resources.loanPolicies || {}).records, ['name']);

    return (
      <EntryManager
        {...this.props}
        nameKey="name"
        resourceKey="loanPolicies"
        entryList={entryList}
        parentMutator={mutator}
        permissions={permissions}
        parentResources={resources}
        detailComponent={LoanPolicyDetail}
        entryFormComponent={LoanPolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.loanPolicy.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.loanPolicy.entryLabel' })}
        defaultEntry={LoanPolicy.defaultLoanPolicy()}
        validate={validateLoanPolicy}
      />
    );
  }
}

export default stripesConnect(injectIntl(LoanPolicySettings));
