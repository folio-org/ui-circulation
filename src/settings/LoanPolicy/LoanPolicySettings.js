import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { FormattedMessage } from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';

import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import validate from '../Validation/LoanPolicy';
import LoanPolicy from '../Models/LoanPolicy';

class LoanPolicySettings extends React.Component {
  static manifest = Object.freeze({
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
    },
    fixedDueDateSchedules: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
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
        POST: PropTypes.func,
        DELETE: PropTypes.func,
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
      <EntryManager
        {...this.props}
        parentMutator={mutator}
        parentResources={resources}
        entryList={entryList}
        resourceKey="loanPolicies"
        detailComponent={LoanPolicyDetail}
        entryFormComponent={LoanPolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.loanPolicy.paneTitle" />}
        entryLabel={<FormattedMessage id="ui-circulation.settings.loanPolicy.entryLabel" />}
        nameKey="name"
        permissions={permissions}
        validate={validate}
        defaultEntry={LoanPolicy.defaultLoanPolicy()}
      />
    );
  }
}

export default LoanPolicySettings;
