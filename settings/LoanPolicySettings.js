import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { stripesShape } from '@folio/stripes-core/src/Stripes';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';
import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import { loanProfileMap } from '../constants';

const defaultPolicy = {
  name: '',
  loanable: true,
  loansPolicy: {
    profileId: loanProfileMap.ROLLING,
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
      loanPolicies: PropTypes.object,
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      loanPolicies: PropTypes.shape({
        POST: PropTypes.func,
        DELETE: PropTypes.func,
      }),
    }).isRequired,
    stripes: stripesShape.isRequired,
  };

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
      dataKey: 'fixed-due-date-schedules',
    },
  });

  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
  }

  validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.validate.fillIn' });
    }

    const loansPolicy = values.loansPolicy || {};

    if (loansPolicy.profileId === loanProfileMap.FIXED
      && !loansPolicy.fixedDueDateSchedule) {
      errors.loansPolicy = { fixedDueDateSchedule: this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectFDDS' }) };
    }
    return errors;
  }

  render() {
    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={_.sortBy((this.props.resources.loanPolicies || {}).records || [], ['name'])}
        resourceKey="loanPolicies"
        detailComponent={LoanPolicyDetail}
        formComponent={LoanPolicyForm}
        paneTitle={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.loanPolicy.paneTitle' })}
        entryLabel={this.props.stripes.intl.formatMessage({ id: 'ui-circulation.settings.loanPolicy.entryLabel' })}
        nameKey="name"
        defaultEntry={defaultPolicy}
        permissions={{
          put: 'ui-circulation.settings.loan-policies',
          post: 'ui-circulation.settings.loan-policies',
          delete: 'ui-circulation.settings.loan-policies',
        }}
        validate={this.validate}
      />
    );
  }
}

export default LoanPolicySettings;
