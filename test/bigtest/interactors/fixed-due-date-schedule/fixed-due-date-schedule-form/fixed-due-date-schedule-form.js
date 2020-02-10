import {
  scoped,
  clickable,
  interactor,
  fillable,
  isPresent,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import GeneralSection from './general-section';
import ScheduleSection from './schedule-section';

@interactor class FddsForm {
  static defaultScope = ('[data-test-fdds-form]');
  isLoaded = isPresent('[class^="scheduleItemContent---"]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  generalSection = new GeneralSection();
  scheduleSection = new ScheduleSection();
  generalSectionAccordion = new AccordionInteractor('#generalInformation');
  scheduleSectionAccordion = new AccordionInteractor('#schedule');
  fillName = fillable('#input_schedule_name');
  fillDescription = fillable('[name="description"]');
  clickSave = clickable('#clickable-save-fixedDueDateSchedule');
  expandAll = scoped('[data-test-expand-all] button');
}

export default new FddsForm();
