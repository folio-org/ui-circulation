import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';

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
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.loan-policies',
      post: 'ui-circulation.settings.loan-policies',
      delete: 'ui-circulation.settings.loan-policies',
    };

    const entryList = sortBy((resources.loanPolicies || {}).records, ['name']);

    return (
      <FormattedMessage id="ui-circulation.settings.loanPolicy.entryLabel">
        { entryLabel => (
          <EntryManager
            {...this.props}
            parentMutator={mutator}
            parentResources={resources}
            entryList={entryList}
            resourceKey="loanPolicies"
            detailComponent={LoanPolicyDetail}
            entryFormComponent={LoanPolicyForm}
            paneTitle={<FormattedMessage id="ui-circulation.settings.loanPolicy.paneTitle" />}
            entryLabel={entryLabel}
            nameKey="name"
            permissions={permissions}
            validate={validateLoanPolicy}
            defaultEntry={LoanPolicy.defaultLoanPolicy()}
          />
        )}
      </FormattedMessage>
    );
  }
}

export default LoanPolicySettings;
