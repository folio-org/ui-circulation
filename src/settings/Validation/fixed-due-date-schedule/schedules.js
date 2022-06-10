import React from 'react';
import { ARRAY_ERROR } from 'final-form';
import { FormattedMessage } from 'react-intl';

const schedulesArrayValidator = (fixedDueDateSchedule, prevErrors) => {
  if (fixedDueDateSchedule.hasInvalidSchedules() || prevErrors.schedules) {
    return prevErrors;
  }

  const nextErrors = { ...prevErrors, schedules: [] };

  if (!fixedDueDateSchedule.hasSchedules()) {
    nextErrors.schedules[ARRAY_ERROR] = <FormattedMessage id="ui-circulation.settings.fDDS.validate.oneScheduleMin" />;
  } else if (fixedDueDateSchedule.hasOverlappingDateRange()) {
    const { num1, num2 } = fixedDueDateSchedule.getOverlappedDateRanges();
    nextErrors.schedules[ARRAY_ERROR] = <FormattedMessage
      id="ui-circulation.settings.fDDS.validate.overlappingDateRange"
      values={{ num1, num2 }}
    />;
  }

  return nextErrors;
};

export default schedulesArrayValidator;
