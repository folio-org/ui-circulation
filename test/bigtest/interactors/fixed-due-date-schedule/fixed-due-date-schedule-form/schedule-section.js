import {
  scoped,
  interactor,
  collection,
  count,
} from '@bigtest/interactor';

import Schedule from './schedule';

@interactor class ScheduleSection {
  static defaultScope = ('[data-test-fdds-form-schedule-section]');

  addSchedule = scoped('[data-test-add-schedule]');
  schedules = collection('div[data-test-schedule]', Schedule);
  schedulesCount = count('[data-test-schedule]');
}

export default ScheduleSection;
