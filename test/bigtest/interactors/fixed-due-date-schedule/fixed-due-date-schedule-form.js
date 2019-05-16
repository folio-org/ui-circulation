import {
  scoped,
  clickable,
  interactor,
  collection,
  fillable,
  count,
  isPresent,
} from '@bigtest/interactor';

import TextFieldInteractor from '@folio/stripes-components/lib/TextField/tests/interactor';
import DatepickerInteractor from '@folio/stripes-components/lib/Datepicker/tests/interactor';

@interactor class GeneralSection {
  static defaultScope = ('[data-test-fdds-form-general-section]');

  name = new TextFieldInteractor('[ data-test-general-section-name]');
  description = new TextFieldInteractor('[ data-test-general-section-description]');
}

@interactor class Schedule {
  dateRange = scoped('[data-test-schedule-date-range]');
  dateFrom = scoped('[data-test-schedule-date-from]', DatepickerInteractor);
  dateTo = scoped('[data-test-schedule-date-to]', DatepickerInteractor);
  dueDate = scoped('[data-test-schedule-due-date]', DatepickerInteractor);
  remove = scoped('[data-test-schedule-remove] button');
}

@interactor class ScheduleSection {
  static defaultScope = ('[data-test-fdds-form-schedule-section]');

  addSchedule = scoped('[data-test-add-schedule]');
  schedules = collection('div[data-test-schedule]', Schedule);
  schedulesCount = count('[data-test-schedule]');
}

@interactor class FddsForm {
  static defaultScope = ('[data-test-fdds-form]');
  isLoaded = isPresent('[class^="scheduleItemContent---"]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  generalSection = new GeneralSection();
  scheduleSection = new ScheduleSection();
  fillName = fillable('#input_schedule_name');
  fillDescription = fillable('[name="description"]');
  clickSave = clickable('#clickable-save-fixedDueDateSchedule');
  expandAll = scoped('[data-test-expand-all] button');
}

export default new FddsForm();
