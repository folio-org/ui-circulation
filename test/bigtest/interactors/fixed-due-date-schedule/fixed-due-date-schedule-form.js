import {
  scoped,
  clickable,
  interactor,
  collection,
  count,
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

@interactor class ShceduleSection {
  static defaultScope = ('[data-test-fdds-form-schedule-section]');

  addSchedule = scoped('[data-test-add-schedule]');
  schedules = collection('div[data-test-schedule]', Schedule);
  schedulesCount = count('[data-test-schedule]');
}

@interactor class FddsForm {
  static defaultScope = ('[data-test-fdds-form]');

  generalSection = new GeneralSection();
  scheduleSection = new ShceduleSection();

  save = clickable('#clickable-save-entry');
  expandAll = scoped('[data-test-expand-all] button')
}

export default new FddsForm();
