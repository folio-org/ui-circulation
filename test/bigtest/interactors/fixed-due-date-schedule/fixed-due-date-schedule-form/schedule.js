import {
  scoped,
  interactor,
} from '@bigtest/interactor';

import DatepickerInteractor from '@folio/stripes-components/lib/Datepicker/tests/interactor';

@interactor class Schedule {
  dateRange = scoped('[data-test-schedule-date-range]');
  dateFrom = scoped('[data-test-schedule-date-from]', DatepickerInteractor);
  dateTo = scoped('[data-test-schedule-date-to]', DatepickerInteractor);
  dueDate = scoped('[data-test-schedule-due-date]', DatepickerInteractor);
  remove = scoped('[data-test-schedule-remove] button');
}

export default Schedule;
