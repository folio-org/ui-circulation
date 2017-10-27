import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import EntryManager from '@folio/stripes-smart-components/lib/EntryManager';
import FixedDueDateScheduleDetail from './FixedDueDateScheduleDetail';
import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';


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
