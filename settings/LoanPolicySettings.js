import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';
import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';

const defaultPolicy = {
  name: '',
  loanable: true,
  loansPolicy: {
    profileId: '2', // TODO: update when this is switched to a GUID
    closedLibraryDueDateManagementId: '4', // TODO: update when this is switched to a GUID
  },
  renewable: true,
  renewalsPolicy: {
    unlimited: false,
    renewFromId: '2', // TODO: update when this is switched to a GUID
    differentPeriod: false,
  },
};

class LoanPolicySettings extends React.Component {

  static propTypes = {
    resources: PropTypes.shape({
      entries: PropTypes.object,
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      entries: PropTypes.shape({
        POST: PropTypes.func,
        DELETE: PropTypes.func,
      }),
    }).isRequired,
  };

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
    },
    fixedDueDateSchedules: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
      path: 'fixed-due-date-schedule-storage/fixed-due-date-schedules',
    },
  });

  render() {
    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={_.sortBy((this.props.resources.entries || {}).records || [], ['name'])}
        detailComponent={LoanPolicyDetail}
        formComponent={LoanPolicyForm}
        paneTitle="Loan Policies"
        entryLabel="Loan Policy"
        nameKey="name"
        defaultEntry={defaultPolicy}
        permissions={{
          put: 'ui-circulation.settings.loan-policies',
          post: 'ui-circulation.settings.loan-policies',
          delete: 'ui-circulation.settings.loan-policies',
        }}
        validate={validate}
      />
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = 'Please fill this in to continue';
  }
  if (values.loansPolicy.profileId === '1' // 1 is for 'fixed'
    && !values.loansPolicy.fixedDueDateSchedule) {
    errors.loansPolicy = { fixedDueDateSchedule: 'Please select a schedule' };
  }
  return errors;
}

export default LoanPolicySettings;
