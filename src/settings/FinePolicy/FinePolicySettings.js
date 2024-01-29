import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import {
  stripesConnect,
  TitleManager,
} from '@folio/stripes/core';

import FinePolicy from '../Models/FinePolicy';
import FinePolicyDetail from './FinePolicyDetail';
import FinePolicyForm from './FinePolicyForm';
import normalize from './utils/normalize';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../../constants';
import withPreventDelete from '../wrappers/withPreventDelete';
import { getRecordName } from '../utils/utils';

export const parseInitialValues = (init = {}) => {
  const reminderFeesPolicy = init?.reminderFeesPolicy ?? {};
  const {
    countClosed = false,
    ignoreGracePeriodRecall = false,
    ignoreGracePeriodHolds = false,
    allowRenewalOfItemsWithReminderFees = false,
    clearPatronBlockWhenPaid = false,
  } = reminderFeesPolicy;

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
    reminderFeesPolicy: {
      ...reminderFeesPolicy,
      countClosed,
      ignoreGracePeriodRecall,
      ignoreGracePeriodHolds,
      allowRenewalOfItemsWithReminderFees,
      clearPatronBlockWhenPaid,
    }
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
    noticeTemplates: {
      type: 'okapi',
      records: 'templates',
      path: 'templates',
      params: {
        query: 'category="AutomatedFeeFineCharge" sortby name',
        limit: MAX_UNPAGED_RESOURCE_COUNT,
      },
    },
    blockTemplates: {
      type: 'okapi',
      records: 'manualBlockTemplates',
      path:'manual-block-templates',
      params: {
        limit: MAX_UNPAGED_RESOURCE_COUNT,
      },
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
      templates: PropTypes.object,
    }).isRequired,
    mutator: PropTypes.shape({
      finePolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    const {
      checkPolicy,
      resources,
      mutator,
      intl: {
        formatMessage,
      },
      location,
    } = this.props;
    const permissions = {
      put: 'ui-circulation.settings.overdue-fines-policies',
      post: 'ui-circulation.settings.overdue-fines-policies',
      delete: 'ui-circulation.settings.overdue-fines-policies',
    };
    const entryList = sortBy((resources.finePolicies || {}).records, ['name']);
    const record = getRecordName({
      entryList,
      location,
      formatMessage,
      optionNameId: 'ui-circulation.settings.title.overdueFinePolicies',
    });

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={record}
      >
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
          onBeforeSave={normalize}
        />
      </TitleManager>
    );
  }
}

export default stripesConnect(injectIntl(withPreventDelete(FinePolicySettings, 'overdueFinePolicy')));
