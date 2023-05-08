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
import withPreventDelete from '../wrappers/withPreventDelete';

export const parseInitialValues = (init = {}) => {
  return ({
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
    },
    // TODO: remove after sever side is ready
    reminderFees: init?.id ? JSON.parse(localStorage.getItem('reminderFees') ?? '[]') : []
  });
};

class FinePolicySettings extends React.Component {
  static manifest = Object.freeze({
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
  });

  static propTypes = {
    checkPolicy: PropTypes.func.isRequired,
    closeText: PropTypes.string.isRequired,
    intl: PropTypes.object,
    labelText: PropTypes.string.isRequired,
    messageText: PropTypes.string.isRequired,
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

  // TODO: remove when backend is ready
  saveReminderFees = async (reminderFees) => {
    localStorage.setItem('reminderFees', reminderFees ? JSON.stringify(reminderFees) : '[]');
  }

  onBeforeSave = (data) => {
    this.saveReminderFees(data.reminderFees);
    delete data.reminderFees;

    return normalize(data);
  }

  render() {
    const {
      checkPolicy,
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
        isEntryInUse={checkPolicy}
        parentMutator={mutator}
        permissions={permissions}
        parseInitialValues={parseInitialValues}
        parentResources={resources}
        prohibitItemDelete={{
          close: <FormattedMessage id={this.props.closeText} />,
          label: <FormattedMessage id={this.props.labelText} />,
          message: <FormattedMessage id={this.props.messageText} />,
        }}
        detailComponent={FinePolicyDetail}
        enableDetailsActionMenu
        entryFormComponent={FinePolicyForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.finePolicy.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.finePolicy.entryLabel' })}
        defaultEntry={FinePolicy.defaultFinePolicy()}
        onBeforeSave={this.onBeforeSave}
      />
    );
  }
}

export default stripesConnect(injectIntl(withPreventDelete(FinePolicySettings, 'overdueFinePolicy')));
