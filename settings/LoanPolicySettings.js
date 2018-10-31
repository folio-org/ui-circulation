import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { intlShape, injectIntl } from 'react-intl';
import { EntryManager } from '@folio/stripes/smart-components';
import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import { loanProfileMap, renewFromIds } from '../constants';

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
    renewFromId: renewFromIds.SYSTEM_DATE,
    differentPeriod: false,
  },
};

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
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
  }

  validate(values) {
    const errors = {};
    const { formatMessage } = this.props.intl;

    if (!values.name) {
      errors.name = formatMessage({ id: 'ui-circulation.settings.validate.fillIn' });
    }

    const loansPolicy = values.loansPolicy || {};

    if (loansPolicy.profileId === loanProfileMap.FIXED
      && !loansPolicy.fixedDueDateSchedule) {
      errors.loansPolicy = { fixedDueDateSchedule: formatMessage({ id: 'ui-circulation.settings.loanPolicy.selectFDDS' }) };
    }
    return errors;
  }

  render() {
    const {
      intl: { formatMessage },
      resources,
      mutator,
    } = this.props;

    return (
      <EntryManager
        {...this.props}
        parentMutator={mutator}
        parentResources={resources}
        entryList={_.sortBy((resources.loanPolicies || {}).records || [], ['name'])}
        resourceKey="loanPolicies"
        detailComponent={LoanPolicyDetail}
        formComponent={LoanPolicyForm}
        paneTitle={formatMessage({ id: 'ui-circulation.settings.loanPolicy.paneTitle' })}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.loanPolicy.entryLabel' })}
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

export default injectIntl(LoanPolicySettings);
