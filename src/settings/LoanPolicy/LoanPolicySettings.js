import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
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
    selectedPolicyId: {},
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
        query: 'status.name==Open and loanPolicyId==%{selectedPolicyId}',
      },
    },
  });

  static propTypes = {
    intl: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    resources: PropTypes.shape({
      loanPolicies: PropTypes.object,
      loans: PropTypes.object,
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      loanPolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
      selectedPolicyId: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
    }).isRequired,
    stripes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.updateSelectedPolicy = this.updateSelectedPolicy.bind(this);
    this.updateSelectedPolicy();

    this.logger = props.stripes.logger;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.updateSelectedPolicy();
    }
  }

  updateSelectedPolicy() {
    const {
      location,
      mutator,
    } = this.props;

    const path = location.pathname;
    mutator.selectedPolicyId.replace(path.substring(path.lastIndexOf('/') + 1));
  }

  /**
   * This function is used as a prop for <EntryManager> to determine
   * whether or not a policy can be deleted -- i.e., whether or not
   * there are any active loans that are using it.
   *
   * The loans resource query returns open loan records with a loanPolicyId
   * of `selectedPolicyId`, a local resource that should be set before
   * calling this function.
   */
  isPolicyInUse = () => this.props.resources.loans.isLoading || this.props.resources.loans.records.length > 0;

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
