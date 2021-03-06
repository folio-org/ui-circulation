import {
  interactor,
  isPresent,
  scoped,
} from '@bigtest/interactor';

import { AccordionInteractor } from '@folio/stripes-components/lib/Accordion/tests/interactor';

import { contains } from '../helpers';

@interactor class FddsDetail {
  isLoaded = isPresent('#generalFixedDueDateScheduleDetail');
  whenLoaded() {
    return this.when(() => this.isLoaded);
  }

  containsContent = contains('#generalFixedDueDateScheduleDetail');
  generalInformationAccordion = new AccordionInteractor('#generalFixedDueDateScheduleDetail');
  expandAll = scoped('[data-tast-expand-button]')
}

export default new FddsDetail('#date-test-fixed-due-date-schedule-detail');
