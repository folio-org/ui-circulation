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
import { FinePolicy as validateFinePolicy } from '../Validation';

class FinePolicySettings extends React.Component {
  static manifest = Object.freeze({
    finePolicies: {
      type: 'okapi',
      records: 'overdueFinePolicies',
      perRequest: 100,
      path: 'overdue-fines-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: '1000',
      },
      throwErrors: false,
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
      put: 'ui-circulation.settings.overdue-fines-policies',
      post: 'ui-circulation.settings.overdue-fines-policies',
      delete: 'ui-circulation.settings.overdue-fines-policies',
    };

    const entryList = sortBy((resources.finePolicies || {}).records, ['name']);
    const parseInitialValues = (init = {}) => ({
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

    return (
      <EntryManager
        {...this.props}
        nameKey="name"
        resourceKey="finePolicies"
        entryList={entryList}
        parentMutator={mutator}
        permissions={permissions}
        parseInitialValues={parseInitialValues}
        parentResources={resources}
        detailComponent={FinePolicyDetail}
        enableDetailsActionMenu
        entryFormComponent={FinePolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.finePolicy.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.finePolicy.entryLabel' })}
        defaultEntry={FinePolicy.defaultFinePolicy()}
        validate={validateFinePolicy}
      />
    );
  }
}

export default stripesConnect(injectIntl(FinePolicySettings));
