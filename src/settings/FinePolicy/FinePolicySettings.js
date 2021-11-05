import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import FinePolicy from '../Models/FinePolicy';
import FinePolicyDetail from './FinePolicyDetail';
import FinePolicyForm from './FinePolicyForm';
import normalize from './utils/normalize';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../../constants';

class FinePolicySettings extends React.Component {
  static manifest = Object.freeze({
    selectedPolicyId: {},
    finePolicies: {
      type: 'okapi',
      records: 'overdueFinePolicies',
      path: 'overdue-fines-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      },
      throwErrors: false,
    },
    loans: {
      type: 'okapi',
      records: 'loans',
      path: 'circulation/loans',
      params: {
        query: 'status.name==Open and overdueFinePolicyId==%{selectedPolicyId}',
      },
    },
  });

  static propTypes = {
    intl: PropTypes.object,
    resources: PropTypes.shape({
      finePolicies: PropTypes.object,
      fixedDueDateSchedules: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      finePolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
      selectedPolicyId: PropTypes.shape({
        replace: PropTypes.func.isRequired,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.updateSelectedPolicy = this.updateSelectedPolicy.bind(this);
    this.updateSelectedPolicy();
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

  parseInitialValues = (init = {}) => ({
    ...init,
    maxOverdueFine: parseFloat(init.maxOverdueFine).toFixed(2),
    maxOverdueRecallFine: parseFloat(init.maxOverdueRecallFine).toFixed(2),
    overdueFine: {
      ...init.overdueFine,
      quantity: parseFloat((init.overdueFine || {}).quantity || 0).toFixed(2)
    },
    overdueRecallFine: {
      ...init.overdueRecallFine,
      quantity: parseFloat((init.overdueRecallFine || {}).quantity || 0).toFixed(2)
    }
  });

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
      put: 'ui-circulation.settings.overdue-fines-policies',
      post: 'ui-circulation.settings.overdue-fines-policies',
      delete: 'ui-circulation.settings.overdue-fines-policies',
    };

    const entryList = sortBy((resources.finePolicies || {}).records, ['name']);

    return (
      <EntryManager
        {...this.props}
        nameKey="name"
        resourceKey="finePolicies"
        entryList={entryList}
        parentMutator={mutator}
        permissions={permissions}
        parseInitialValues={this.parseInitialValues}
        parentResources={resources}
        prohibitItemDelete={{
          close: <FormattedMessage id="ui-circulation.settings.common.close" />,
          label: <FormattedMessage id="ui-circulation.settings.finePolicy.denyDelete.header" />,
          message: <FormattedMessage id="ui-circulation.settings.policy.denyDelete.body" />,
        }}
        detailComponent={FinePolicyDetail}
        enableDetailsActionMenu
        entryFormComponent={FinePolicyForm}
        isEntryInUse={this.isPolicyInUse}
        paneTitle={<FormattedMessage id="ui-circulation.settings.finePolicy.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.finePolicy.entryLabel' })}
        defaultEntry={FinePolicy.defaultFinePolicy()}
        onBeforeSave={normalize}
      />
    );
  }
}

export default stripesConnect(injectIntl(FinePolicySettings));
