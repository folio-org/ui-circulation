import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';
import FixedDueDateScheduleDetail from './FixedDueDateScheduleDetail';
import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Please fill this in to continue';
  }

  if (!values.schedules || !values.schedules.length) {
    errors.schedules = { _error: 'At least one schedule must be entered' };
  } else {
    const schedulesErrors = [];
    values.schedules.forEach((schedule, i) => {
      const scheduleErrors = {};
      if (!schedule || !schedule.from) {
        scheduleErrors.from = 'Please fill this in to continue';
        schedulesErrors[i] = scheduleErrors;
      }
      if (!schedule || !schedule.to) {
        scheduleErrors.to = 'Please fill this in to continue';
        schedulesErrors[i] = scheduleErrors;
      }
      if (!schedule || !schedule.due) {
        scheduleErrors.due = 'Please fill this in to continue';
        schedulesErrors[i] = scheduleErrors;
      }

      if (schedule) {
        const to = moment(schedule.to);
        const from = moment(schedule.from);
        const due = moment(schedule.due);
        if (!to.isAfter(from)) {
          scheduleErrors.to = 'To date must be after from date';
          schedulesErrors[i] = scheduleErrors;
        }

        if (!due.isSameOrAfter(to)) {
          scheduleErrors.due = 'Due date must be on or after to date';
          schedulesErrors[i] = scheduleErrors;
        }
      }
    });

    if (schedulesErrors.length) {
      errors.schedules = schedulesErrors;
    }
  }
  return errors;
};

class FixedDueDateScheduleManager extends React.Component {
  static propTypes = {
    resources: PropTypes.object.isRequired,
    mutator: PropTypes.shape({
      entries: PropTypes.shape({
        POST: PropTypes.func,
        DELETE: PropTypes.func,
        GET: PropTypes.func,
      }),
    }).isRequired,
  };

  static manifest = Object.freeze({
    entries: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
      path: 'fixed-due-date-schedule-storage/fixed-due-date-schedules',
    },
  });

  render() {
    return (
      <EntryManager
        {...this.props}
        parentMutator={this.props.mutator}
        entryList={_.sortBy((this.props.resources.entries || {}).records || [], ['name'])}
        detailComponent={FixedDueDateScheduleDetail}
        formComponent={FixedDueDateScheduleForm}
        paneTitle="Fixed Due Date Schedule"
        entryLabel="Fixed Due Date Schedule"
        nameKey="name"
        permissions={{
          put: 'circulation-storage.fixed-due-date-schedules.item.put',
          post: 'circulation-storage.fixed-due-date-schedules.item.post',
          delete: 'circulation-storage.fixed-due-date-schedules.item.delete',
        }}
      />
    );
  }
}

export default FixedDueDateScheduleManager;
