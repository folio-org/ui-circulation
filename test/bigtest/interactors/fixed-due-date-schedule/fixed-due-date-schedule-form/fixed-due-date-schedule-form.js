import {
  blurrable,
  scoped,
  clickable,
  interactor,
  fillable,
  focusable,
  isPresent,
  text,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import GeneralSection from './general-section';
import ScheduleSection from './schedule-section';
import DeleteConfirmationModal from './delete-confirmation-modal';

@interactor class FddsForm {
  static defaultScope = ('[data-test-fdds-form]');
  isLoaded = isPresent('[class^="scheduleItemContent---"]');

  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  generalSection = new GeneralSection();
  scheduleSection = new ScheduleSection();
  deleteConfirmationModal = new DeleteConfirmationModal();
  generalSectionAccordion = new AccordionInteractor('#generalFixedDueDate');
  scheduleSectionAccordion = new AccordionInteractor('#schedule');
  fillName = fillable('#input_schedule_name');
  focusName = focusable('#input_schedule_name');
  blurName = blurrable('#input_schedule_name');
  fillDescription = fillable('[name="description"]');
  clickSave = clickable('#clickable-save-fixedDueDateSchedule');
  expandAll = scoped('[data-test-expand-all] button');
  hasValidationError = isPresent('[class^="feedbackError---"]');
  validationMessage = text('[class^="feedbackError---"]');
  clickDelete = clickable('#clickable-delete-item');
  hasSchedulesArrayError = isPresent('[class*="scheduleError--"]');
}

export default new FddsForm();
