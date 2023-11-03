import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { ViewMetaData } from '@folio/stripes/smart-components';
import {
  AccordionStatus,
  KeyValue,
} from '@folio/stripes/components';

import buildStripes from '../../../test/jest/__mock__/stripes.mock';
import FixedDueDateScheduleDetail from './FixedDueDateScheduleDetail';
import SchedulesList from './components/DetailsSections/ScedulesList';

jest.mock('./components/DetailsSections/ScedulesList', () => jest.fn(() => null));

describe('FixedDueDateScheduleDetail', () => {
  const mockedCreatedDate = Date.now();
  const labelIds = {
    about: 'ui-circulation.settings.fDDSform.about',
    untitled :'ui-circulation.settings.fDDSform.untitled',
    name: 'ui-circulation.settings.fDDSform.name',
    description: 'ui-circulation.settings.fDDSform.description',
    schedule: 'ui-circulation.settings.fDDSform.schedule',
  };
  const testIds = {
    accordionSet: 'accordionSet',
    generalDetail: 'generalFixedDueDateScheduleDetail',
    scheduleInfo: 'fixedDueDateSchedule',
    expandAllButton: 'expandAllButton',
  };
  const keyValueCallOrder = {
    description: 2,
  };
  const mockedInitialValues = {
    name: 'testName',
    description: 'testDescription',
    metadata: {
      createdDate: mockedCreatedDate,
    },
    schedules: 'testSchedules',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('with fully passed "initialValues"', () => {
    beforeEach(() => {
      render(
        <FixedDueDateScheduleDetail
          initialValues={mockedInitialValues}
          stripes={buildStripes()}
        />
      );
    });

    it('should trigger "AccordionStatus" component', () => {
      expect(AccordionStatus).toHaveBeenCalled();
    });

    it('should render "Expand all" button', () => {
      expect(screen.getByText('Toggle accordion state')).toBeVisible();
    });

    it('should render "AccordionSet"', () => {
      expect(screen.getByTestId(testIds.accordionSet)).toBeVisible();
    });

    describe('general detail "Accordion"', () => {
      it('should be rendered', () => {
        const element = screen.getByTestId(testIds.generalDetail);

        expect(element).toBeVisible();
        expect(within(element).getByText(labelIds.about)).toBeVisible();
      });

      it('should render "ViewMetaData" with passed props', () => {
        expect(ViewMetaData).toHaveBeenCalledWith({ metadata: mockedInitialValues.metadata }, {});
      });

      it('should contain "name" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalDetail);

        expect(within(element).getByText(labelIds.name)).toBeVisible();
        expect(within(element).getByText(mockedInitialValues.name)).toBeVisible();
      });

      it('should contain "description" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalDetail);

        expect(within(element).getByText(labelIds.description)).toBeVisible();
        expect(within(element).getByText(mockedInitialValues.description)).toBeVisible();
      });
    });

    describe('schedule "Accrodion"', () => {
      it('should be rendered', () => {
        const element = screen.getByTestId(testIds.scheduleInfo);

        expect(element).toBeVisible();
        expect(within(element).getByText(labelIds.schedule)).toBeVisible();
      });

      it('should execute "SchedulesList" with passed props', () => {
        const expectedResult = {
          schedules: mockedInitialValues.schedules,
          timezone: 'testTimeZone',
        };

        expect(SchedulesList).toHaveBeenCalledWith(expectedResult, {});
      });
    });
  });

  describe('with empty "initialValues"', () => {
    beforeEach(() => {
      render(
        <FixedDueDateScheduleDetail
          initialValues={{}}
          stripes={buildStripes()}
        />
      );
    });

    describe('general detail "Accordion"', () => {
      it('should not render "ViewMetaData"', () => {
        expect(ViewMetaData).not.toBeCalled();
      });

      it('should contain "name" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalDetail);

        expect(within(element).getByText(labelIds.name)).toBeVisible();
        expect(within(element).getByText(labelIds.untitled)).toBeVisible();
      });

      it('should contain "description" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalDetail);

        expect(within(element).getByText(labelIds.description)).toBeVisible();
        expect(KeyValue).toHaveBeenNthCalledWith(keyValueCallOrder.description, expect.objectContaining({ value: '' }), {});
      });
    });
  });
});
