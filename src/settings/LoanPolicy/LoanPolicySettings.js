import React from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { injectIntl } from 'react-intl';

import { EntryManager } from '@folio/stripes/smart-components';
import {
  stripesConnect,
  TitleManager,
  stripesShape,
} from '@folio/stripes/core';

import LoanPolicyDetail from './LoanPolicyDetail';
import LoanPolicyForm from './LoanPolicyForm';
import LoanPolicy from '../Models/LoanPolicy';
import { normalize } from './utils/normalize';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../../constants';
import withPreventDelete from '../wrappers/withPreventDelete';
import { getRecordName } from '../utils/utils';

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
  });

  static propTypes = {
    checkPolicy: PropTypes.func.isRequired,
    closeText: PropTypes.string.isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    labelText: PropTypes.string.isRequired,
    messageText: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
    resources: PropTypes.shape({
      loanPolicies: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }),
      fixedDueDateSchedules: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        })),
      }),
    }).isRequired,
    mutator: PropTypes.shape({
      loanPolicies: PropTypes.shape({
        POST: PropTypes.func.isRequired,
        PUT: PropTypes.func.isRequired,
        DELETE: PropTypes.func.isRequired,
      }),
    }).isRequired,
    stripes: stripesShape.isRequired,
  };

  constructor(props) {
    super(props);

    this.logger = props.stripes.logger;
  }

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
      put: 'ui-circulation.settings.loan-policies',
      post: 'ui-circulation.settings.loan-policies',
      delete: 'ui-circulation.settings.loan-policies',
    };
    const entryList = sortBy((resources.loanPolicies || {}).records, ['name']);
    const record = getRecordName({
      entryList,
      location,
      formatMessage,
      optionNameId: 'ui-circulation.settings.title.loanPolicies',
    });

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={record}
      >
        <EntryManager
          {...this.props}
          nameKey="name"
          resourceKey="loanPolicies"
          entryList={entryList}
          isEntryInUse={checkPolicy}
          parentMutator={mutator}
          permissions={permissions}
          parentResources={resources}
          prohibitItemDelete={{
            close: formatMessage({ id: this.props.closeText }),
            label: formatMessage({ id: this.props.labelText }),
            message: formatMessage({ id: this.props.messageText }),
          }}
          detailComponent={LoanPolicyDetail}
          enableDetailsActionMenu
          entryFormComponent={LoanPolicyForm}
          paneTitle={formatMessage({ id: 'ui-circulation.settings.loanPolicy.paneTitle' })}
          entryLabel={formatMessage({ id: 'ui-circulation.settings.loanPolicy.entryLabel' })}
          defaultEntry={LoanPolicy.defaultLoanPolicy()}
          onBeforeSave={normalize}
        />
      </TitleManager>
    );
  }
}

export default stripesConnect(injectIntl(withPreventDelete(LoanPolicySettings, 'loanPolicy')));
