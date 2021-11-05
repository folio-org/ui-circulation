import React from 'react';
import PropTypes from 'prop-types';
import {
  isBoolean,
  isUndefined,
  sortBy,
} from 'lodash';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import LostItemFeePolicyDetail from './LostItemFeePolicyDetail';
import LostItemFeePolicyForm from './LostItemFeePolicyForm';
import LostItemFeePolicy from '../Models/LostItemFeePolicy';
import normalize from './utils/normalize';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../../constants';

class LostItemFeePolicySettings extends React.Component {
  static manifest = Object.freeze({
    selectedPolicyId: {},
    lostItemFeePolicies: {
      type: 'okapi',
      records: 'lostItemFeePolicies',
      path: 'lost-item-fees-policies',
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
        query: 'status.name==Open and lostItemPolicyId==%{selectedPolicyId}',
      },
    },
  });

  static propTypes = {
    intl: PropTypes.object,
    resources: PropTypes.shape({
      lostItemFeePolicies: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      lostItemFeePolicies: PropTypes.shape({
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

  parseInitialValues = (init = {}) => {
    const policy = { ...init };

    for (const key in policy) {
      if (isBoolean(policy[key])) {
        policy[key] = policy[key].toString();
      }
    }

    if (!isUndefined(init.lostItemProcessingFee)) {
      policy.lostItemProcessingFee = parseFloat(init.lostItemProcessingFee).toFixed(2);
    }

    if (!isUndefined(init.replacementProcessingFee)) {
      policy.replacementProcessingFee = parseFloat(init.replacementProcessingFee).toFixed(2);
    }

    if (init.chargeAmountItem) {
      policy.chargeAmountItem = {
        amount: init.chargeAmountItem.amount
          ? parseFloat(init.chargeAmountItem.amount).toFixed(2)
          : '0.00',
        chargeType: init.chargeAmountItem.chargeType
          ? init.chargeAmountItem.chargeType
          : '',
      };
    }

    return policy;
  };

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
      intl: { formatMessage },
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.lost-item-fees-policies',
      post: 'ui-circulation.settings.lost-item-fees-policies',
      delete: 'ui-circulation.settings.lost-item-fees-policies',
    };

    const entryList = sortBy((resources.lostItemFeePolicies || {}).records, ['name']);

    return (
      <EntryManager
        {...this.props}
        nameKey="name"
        resourceKey="lostItemFeePolicies"
        entryList={entryList}
        parentMutator={mutator}
        permissions={permissions}
        parseInitialValues={this.parseInitialValues}
        parentResources={resources}
        prohibitItemDelete={{
          close: <FormattedMessage id="ui-circulation.settings.common.close" />,
          label: <FormattedMessage id="ui-circulation.settings.lostItemFee.denyDelete.header" />,
          message: <FormattedMessage id="ui-circulation.settings.policy.denyDelete.body" />,
        }}
        detailComponent={LostItemFeePolicyDetail}
        enableDetailsActionMenu
        entryFormComponent={LostItemFeePolicyForm}
        isEntryInUse={this.isPolicyInUse}
        paneTitle={<FormattedMessage id="ui-circulation.settings.lostItemFee.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.lostItemFee.entryLabel' })}
        defaultEntry={LostItemFeePolicy.defaultLostItemFeePolicy()}
        onBeforeSave={normalize}
      />
    );
  }
}

export default stripesConnect(injectIntl(LostItemFeePolicySettings));
