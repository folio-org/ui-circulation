import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  cloneDeep,
  find,
  forEach,
  sortBy,
  unset,
} from 'lodash';

import { EntryManager } from '@folio/stripes/smart-components';
import { stripesConnect } from '@folio/stripes/core';

import FixedDueDateScheduleDetail from './FixedDueDateScheduleDetail';
import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';

import FixedDueDateSchedule from '../Models/FixedDueDateSchedule';

class FixedDueDateScheduleManager extends React.Component {
  static manifest = Object.freeze({
    fixedDueDateSchedules: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
      perRequest: 100,
      path: 'fixed-due-date-schedule-storage/fixed-due-date-schedules',
    },
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
      perRequest: 100,
      path: 'loan-policy-storage/loan-policies',
      dataKey: 'loan-policies',
    },
  });

  static propTypes = {
    resources: PropTypes.object.isRequired,
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
  };

  deleteDisabled = (schedule) => {
    const loanPolicies = this.props.resources.loanPolicies?.records || [];
    const scheduleInUse = find(loanPolicies, entry => entry.loansPolicy.fixedDueDateSchedule === schedule.id);

    return schedule.id && scheduleInUse;
  }

  onBeforeSave = (entry) => {
    const schedule = cloneDeep(entry);

    forEach(schedule.schedules, (item) => {
      unset(item, 'key');
    });

    return schedule;
  };

  render() {
    const {
      resources,
      mutator,
    } = this.props;

    return (
      <FormattedMessage id="ui-circulation.settings.fDDSform.entryLabel">
        { entryLabel => (
          <EntryManager
            {...this.props}
            defaultEntry={FixedDueDateSchedule.defaultFixedDueDateSchedule()}
            detailComponent={FixedDueDateScheduleDetail}
            deleteDisabled={this.deleteDisabled}
            deleteDisabledMessage={<FormattedMessage id="ui-circulation.settings.fDDS.deleteDisabled" />}
            entryLabel={entryLabel}
            entryList={sortBy(resources.fixedDueDateSchedules?.records || [], ['name'])}
            entryFormComponent={FixedDueDateScheduleForm}
            nameKey="name"
            paneTitle={<FormattedMessage id="ui-circulation.settings.fDDS.paneTitle" />}
            parentMutator={mutator}
            permissions={{
              put: 'ui-circulation.settings.fixed-due-date-schedules',
              post: 'ui-circulation.settings.fixed-due-date-schedules',
              delete: 'ui-circulation.settings.fixed-due-date-schedules',
            }}
            resourceKey="fixedDueDateSchedules"
            onBeforeSave={this.onBeforeSave}
          />
        )}
      </FormattedMessage>
    );
  }
}

export default stripesConnect(FixedDueDateScheduleManager);
