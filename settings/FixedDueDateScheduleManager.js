import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

import {
  FormattedMessage,
  intlShape,
  injectIntl,
} from 'react-intl';


import { EntryManager } from '@folio/stripes/smart-components';
import FixedDueDateScheduleDetail from './FixedDueDateScheduleDetail';
import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';

class FixedDueDateScheduleManager extends React.Component {
  static manifest = Object.freeze({
    fixedDueDateSchedules: {
      type: 'okapi',
      records: 'fixedDueDateSchedules',
      path: 'fixed-due-date-schedule-storage/fixed-due-date-schedules',
    },
    loanPolicies: {
      type: 'okapi',
      records: 'loanPolicies',
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
      }),
      loanPolicies: PropTypes.shape({
        GET: PropTypes.func,
      }),
    }).isRequired,
    intl: intlShape.isRequired,
  };

  constructor(props) {
    super(props);

    this.validate = this.validate.bind(this);
    this.deleteDisabled = this.deleteDisabled.bind(this);
  }

  deleteDisabled(schedule) {
    const loanPolicies = (this.props.resources.loanPolicies || {}).records || [];
    if (schedule.id && _.find(loanPolicies, entry => entry.loansPolicy.fixedDueDateSchedule === schedule.id)) {
      return true;
    }

    return false;
  }

  validate(values) {
    const {
      resources,
    } = this.props;

    const errors = {};
    const fillInMsg = <FormattedMessage id="ui-circulation.settings.validate.fillIn" />;

    if (!values.name) {
      errors.name = fillInMsg;
    }

    // when searching for a name-match, skip the current record
    const records = (resources.fixedDueDateSchedules || {}).records || [];
    if (values.name && _.find(records, entry => entry.name === values.name && entry.id !== values.id)) {
      errors.name = <FormattedMessage id="ui-circulation.settings.fDDS.validate.uniqueName" />;
    }

    if (!values.schedules || !values.schedules.length) {
      errors.schedules = { _error: <FormattedMessage id="ui-circulation.settings.fDDS.validate.oneScheduleMin" /> };
    } else {
      const schedulesErrors = [];

      const schedules = values.schedules;
      // Check if any schedule's duration overlaps with another's
      if (schedules.length > 1) {
        for (let i = 0; i < schedules.length; i++) {
          const s1 = schedules[i];
          for (let j = i + 1; j < schedules.length; j++) {
            const s2 = schedules[j];
            const condA = (s1.from && s2.to) ? moment(s1.from).isBefore(s2.to) : false;
            const condB = (s1.to && s2.from) ? moment(s1.to).isAfter(s2.from) : false;
            if (condA && condB) {
              const overlappingDateRangeMessage = <FormattedMessage id="ui-circulation.settings.fDDS.validate.overlappingDateRange" values={{ num1: i + 1, num2: j + 1 }} />;
              errors.schedules = { _error: overlappingDateRangeMessage };
            }
          }
        }
      }

      values.schedules.forEach((schedule, i) => {
        const scheduleErrors = {};
        if (!schedule || !schedule.from) {
          scheduleErrors.from = fillInMsg;
          schedulesErrors[i] = scheduleErrors;
        }
        if (!schedule || !schedule.to) {
          scheduleErrors.to = fillInMsg;
          schedulesErrors[i] = scheduleErrors;
        }
        if (!schedule || !schedule.due) {
          scheduleErrors.due = fillInMsg;
          schedulesErrors[i] = scheduleErrors;
        }

        if (schedule) {
          const to = moment(schedule.to);
          const from = moment(schedule.from);
          const due = moment(schedule.due);
          if (!to.isAfter(from)) {
            scheduleErrors.to = <FormattedMessage id="ui-circulation.settings.fDDS.validate.toDate" />;
            schedulesErrors[i] = scheduleErrors;
          }

          if (!due.isSameOrAfter(to)) {
            scheduleErrors.due = <FormattedMessage id="ui-circulation.settings.fDDS.validate.onOrAfter" />;
            schedulesErrors[i] = scheduleErrors;
          }
        }
      });

      if (schedulesErrors.length) {
        errors.schedules = schedulesErrors;
      }
    }
    return errors;
  }

  render() {
    const {
      resources,
      mutator,
      intl: { formatMessage },
    } = this.props;

    return (
      <EntryManager
        {...this.props}
        parentMutator={mutator}
        entryList={_.sortBy((resources.fixedDueDateSchedules || {}).records || [], ['name'])}
        resourceKey="fixedDueDateSchedules"
        detailComponent={FixedDueDateScheduleDetail}
        entryFormComponent={FixedDueDateScheduleForm}
        paneTitle={<FormattedMessage id="ui-circulation.settings.fDDS.paneTitle" />}
        entryLabel={formatMessage({ id: 'ui-circulation.settings.fDDSform.entryLabel' })}
        nameKey="name"
        permissions={{
          put: 'ui-circulation.settings.loan-rules',
          post: 'ui-circulation.settings.loan-rules',
          delete: 'ui-circulation.settings.loan-rules',
        }}
        validate={this.validate}
        deleteDisabled={this.deleteDisabled}
        deleteDisabledMessage={<FormattedMessage id="ui-circulation.settings.fDDS.deleteDisabled" />}
        defaultEntry={{ schedules: [{}] }}
      />
    );
  }
}

export default injectIntl(FixedDueDateScheduleManager);
