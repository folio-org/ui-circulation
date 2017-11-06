import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';
import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';

const defaultPolicy = {
  name: 'Untitled',
  loanable: true,
  loansPolicy: {
    profileId: '2',  // TODO: update when this is switched to a GUID
    closedLibraryDueDateManagementId: '4',  // TODO: update when this is switched to a GUID
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
  });

  render() {
    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={_.sortBy((this.props.resources.entries || {}).records || [], ['name'])}
        detailComponent={LoanPolicyDetail}
        formComponent={LoanPolicyForm}
        paneTitle="Loan Rules"
        entryLabel="Loan Rule"
        nameKey="name"
        defaultEntry={defaultPolicy}
        permissions={{
          put: 'ui-circulation.settings.loan-rules',
          post: 'ui-circulation.settings.loan-rules',
          delete: 'ui-circulation.settings.loan-rules',
        }}
      />
    );
  }
}

export default LoanPolicySettings;
