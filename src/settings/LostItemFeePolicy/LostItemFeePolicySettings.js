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
    }).isRequired,
  };

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
        detailComponent={LostItemFeePolicyDetail}
        enableDetailsActionMenu
        entryFormComponent={LostItemFeePolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.lostItemFee.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.lostItemFee.entryLabel' })}
        defaultEntry={LostItemFeePolicy.defaultLostItemFeePolicy()}
        onBeforeSave={normalize}
      />
    );
  }
}

export default stripesConnect(injectIntl(LostItemFeePolicySettings));
