import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import {
  cloneDeep,
  find,
  forEach,
  sortBy,
  unset,
} from 'lodash';

import { EntryManager } from '@folio/stripes/smart-components';
import {
  stripesConnect,
  TitleManager,
} from '@folio/stripes/core';

import FixedDueDateScheduleDetail from './FixedDueDateScheduleDetail';
import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';

import FixedDueDateSchedule from '../Models/FixedDueDateSchedule';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../../constants';
import { getRecordName } from '../utils/utils';

export const onBeforeSave = (entry) => {
  const schedule = cloneDeep(entry);

  forEach(schedule.schedules, (item) => {
    unset(item, 'key');
  });

  return schedule;
};

class FixedDueDateScheduleManager extends React.Component {
  static manifest = Object.freeze({
    fixedDueDateSchedules: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
      path: 'fixed-due-date-schedule-storage/fixed-due-date-schedules',
      params: {
        query: 'cql.allRecords=1',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      }
    },
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      path: 'loan-policy-storage/loan-policies',
      dataKey: 'loan-policies',
      params: {
        query: 'cql.allRecords=1',
        limit: (q, p, r, l, props) => props?.stripes?.config?.maxUnpagedResourceCount || MAX_UNPAGED_RESOURCE_COUNT,
      }
    },
  });

  static propTypes = {
    resources: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    mutator: PropTypes.shape({
      fixedDueDateSchedules: PropTypes.shape({
        POST: PropTypes.func,
        DELETE: PropTypes.func,
        GET: PropTypes.func,
      }).isRequired,
      loanPolicies: PropTypes.shape({
        GET: PropTypes.func,
      }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
  };

  deleteDisabled = (schedule) => {
    const loanPolicies = this.props.resources.loanPolicies?.records || [];
    const scheduleInUse = find(loanPolicies, entry => entry.loansPolicy.fixedDueDateSchedule === schedule.id);

    return schedule.id && scheduleInUse;
  }

  render() {
    const {
      resources,
      mutator,
      intl: {
        formatMessage,
      },
      location,
    } = this.props;
    const entryList = sortBy(resources.fixedDueDateSchedules?.records || [], ['name']);
    const record = getRecordName({
      entryList,
      location,
      formatMessage,
      optionNameId: 'ui-circulation.settings.title.fixedDueDateSchedule',
    });

    return (
      <TitleManager
        page={formatMessage({ id: 'ui-circulation.settings.title.general' })}
        record={record}
      >
        <EntryManager
          {...this.props}
          defaultEntry={FixedDueDateSchedule.defaultFixedDueDateSchedule()}
          detailComponent={FixedDueDateScheduleDetail}
          deleteDisabled={this.deleteDisabled}
          deleteDisabledMessage={formatMessage({ id: 'ui-circulation.settings.fDDS.deleteDisabled' })}
          entryLabel={formatMessage({ id: 'ui-circulation.settings.fDDSform.entryLabel' })}
          entryList={entryList}
          entryFormComponent={FixedDueDateScheduleForm}
          nameKey="name"
          paneTitle={formatMessage({ id: 'ui-circulation.settings.fDDS.paneTitle' })}
          parentMutator={mutator}
          permissions={{
            put: 'ui-circulation.settings.fixed-due-date-schedules',
            post: 'ui-circulation.settings.fixed-due-date-schedules',
            delete: 'ui-circulation.settings.fixed-due-date-schedules',
          }}
          resourceKey="fixedDueDateSchedules"
          onBeforeSave={onBeforeSave}
          enableDetailsActionMenu
        />
      </TitleManager>
    );
  }
}

export default injectIntl(stripesConnect(FixedDueDateScheduleManager));
