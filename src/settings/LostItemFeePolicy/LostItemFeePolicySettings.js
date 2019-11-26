import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import LostItemFeePolicyDetail from './LostItemFeePolicyDetail';
import LostItemFeePolicyForm from './LostItemFeePolicyForm';
import LostItemFeePolicy from '../Models/LostItemFeePolicy';
import { LostItemFeePolicy as validateLostItemFeePolicy } from '../Validation';

class LostItemFeePolicySettings extends React.Component {
  static manifest = Object.freeze({
    lostItemFeePolicies: {
      type: 'okapi',
      records: 'lostItemFeePolicies',
      perRequest: 100,
      path: 'lost-item-fees-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: '1000',
      },
      throwErrors: false,
    },
  });

  static propTypes = {
    intl: intlShape.isRequired,
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

  render() {
    const {
      resources,
      mutator,
      intl: {
        formatMessage,
      },
    } = this.props;

    const permissions = {
      put: 'ui-circulation.settings.lost-item-fees-policies',
      post: 'ui-circulation.settings.lost-item-fees-policies',
      delete: 'ui-circulation.settings.lost-item-fees-policies',
    };

    const entryList = sortBy((resources.lostItemFeePolicies || {}).records, ['name']);
    const parseInitialValues = (init = {}) => ({
      ...init,
      lostItemProcessingFee: parseFloat(init.lostItemProcessingFee).toFixed(2),
      replacementProcessingFee: parseFloat(init.replacementProcessingFee).toFixed(2),
      chargeAmountItem: {
        amount: init.chargeAmountItem && init.chargeAmountItem.amount
          ? parseFloat(init.chargeAmountItem.amount).toFixed(2)
          : '0.00',
        chargeType: init.chargeAmountItem && init.chargeAmountItem.chargeType
          ? init.chargeAmountItem.chargeType
          : '',
      }
    });

    return (
      <EntryManager
        {...this.props}
        nameKey="name"
        resourceKey="lostItemFeePolicies"
        entryList={entryList}
        parentMutator={mutator}
        permissions={permissions}
        parseInitialValues={parseInitialValues}
        parentResources={resources}
        detailComponent={LostItemFeePolicyDetail}
        enableDetailsActionMenu
        entryFormComponent={LostItemFeePolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.lostItemFee.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.lostItemFee.entryLabel' })}
        defaultEntry={LostItemFeePolicy.defaultLostItemFeePolicy()}
        validate={validateLostItemFeePolicy}
      />
    );
  }
}

export default stripesConnect(injectIntl(LostItemFeePolicySettings));
