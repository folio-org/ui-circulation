import React from 'react';
import PropTypes from 'prop-types';
import {
  get,
  sortBy,
} from 'lodash';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import LoanPolicy from '../Models/LoanPolicy';
import { normalize } from './utils/normalize';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../../constants';

class LoanPolicySettings extends React.Component {
  static manifest = Object.freeze({
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
    },
    fixedDueDateSchedules: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
      path: 'fixed-due-date-schedule-storage/fixed-due-date-schedules',
      resourceShouldRefresh: true,
      params: {
        query: 'cql.allRecords=1',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
    },
    loans: {
      type: 'okapi',
      records: 'loans',
      path: 'circulation/loans',
      params: {
        query: 'status.name==Open',
        limit: () => 500000,
      },
    },
  });

  isPolicyInUse = (templateId) => {
    // Loans store policy names rather than IDs (why?), so we need a list of policy names to start
    const policies = get(this.props, 'resources.loanPolicies.records', []).map(p => p.name);
    const loans = get(this.props, 'resources.loans.records', []);
    return !!loans.find(loan => loan?.loanPolicyId === templateId);
  }

  static propTypes = {
    intl: PropTypes.object.isRequired,
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
        isEntryInUse={this.isPolicyInUse}
        parentMutator={mutator}
        permissions={permissions}
        parentResources={resources}
        prohibitItemDelete={{
          close: <FormattedMessage id="ui-circulation.settings.common.close" />,
          label: <FormattedMessage id="ui-circulation.settings.loanPolicy.denyDelete.header" />,
          message: <FormattedMessage id="ui-circulation.settings.policy.denyDelete.body" />,
        }}
        detailComponent={LoanPolicyDetail}
        enableDetailsActionMenu
        entryFormComponent={LoanPolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.loanPolicy.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.loanPolicy.entryLabel' })}
        defaultEntry={LoanPolicy.defaultLoanPolicy()}
        onBeforeSave={normalize}
      />
    );
  }
}

export default stripesConnect(injectIntl(LoanPolicySettings));
