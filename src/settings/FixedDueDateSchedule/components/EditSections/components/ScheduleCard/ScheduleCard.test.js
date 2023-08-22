import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';
import moment from 'moment-timezone';

import '../../../../../../../test/jest/__mock__';

import { FormattedMessage } from 'react-intl';
import {
  Datepicker,
  IconButton,
} from '@folio/stripes/components';
import { Field } from 'react-final-form';
import { DATE_FORMAT } from '../../../../../../constants';
import ScheduleCard, {
  parseDate,
} from './ScheduleCard';

jest.mock('moment-timezone', () => ({
  tz: jest.fn(),
  endOf: jest.fn(),
  format: jest.fn(),
}));

IconButton.mockImplementation(({ onClick }) => {
  return (
    // eslint-disable-next-line
    <div data-testid="onClickTestElement" onClick={onClick} />
  );
});

describe('ScheduleCard', () => {
  const testTimeZone = 'UTC';

  describe('component', () => {
    const testPathToSchedule = 'testPathToSchedule';
    const testScheduleIndex = 15;
    const onRemoveScheduleMock = jest.fn();
    const fieldCallOrderByPlace = {
      dateFromColumn: 1,
      dateToColumn: 2,
      dueDateColumn: 3,
    };
    const testIds = {
      removeColumn: 'removeColumn',
      onClickTestElement: 'onClickTestElement',
    };
    const labelIds = {
      dateFormTitle: 'ui-circulation.settings.fDDSform.dateFormTitle',
      remove: 'ui-circulation.settings.fDDSform.remove',
      dateFrom: 'ui-circulation.settings.fDDSform.dateFrom',
      dateTo: 'ui-circulation.settings.fDDSform.dateTo',
      dueDate: 'ui-circulation.settings.fDDSform.dueDate',
    };

    afterEach(() => {
      onRemoveScheduleMock.mockClear();
      IconButton.mockClear();
      Field.mockClear();
    });

    describe('with all required props', () => {
      beforeEach(() => {
        render(
          <ScheduleCard
            pathToSchedule={testPathToSchedule}
            scheduleIndex={testScheduleIndex}
            onRemoveSchedule={onRemoveScheduleMock}
            timezone={testTimeZone}
          />
        );
      });

      it('should render "date form title" label', () => {
        expect(FormattedMessage).toHaveBeenCalledWith(
          {
            id: labelIds.dateFormTitle,
            values: { number: testScheduleIndex + 1 },
          }, {}
        );
      });

      it('should render "remove" IconButton component', () => {
        expect(IconButton).toHaveBeenCalledWith(
          expect.objectContaining({
            ariaLabel: labelIds.remove,
            icon: 'trash',
          }), {}
        );
      });

      it('should render "date from" Field component', () => {
        expect(Field).toHaveBeenNthCalledWith(
          fieldCallOrderByPlace.dateFromColumn,
          expect.objectContaining({
            dateFormat: DATE_FORMAT,
            component: Datepicker,
            label: labelIds.dateFrom,
            name: `${testPathToSchedule}.from`,
            required: true,
          }), {}
        );
      });

      it('should render "date to" Field component', () => {
        expect(Field).toHaveBeenNthCalledWith(
          fieldCallOrderByPlace.dateToColumn,
          expect.objectContaining({
            dateFormat: DATE_FORMAT,
            component: Datepicker,
            label: labelIds.dateTo,
            name: `${testPathToSchedule}.to`,
            required: true,
          }), {}
        );
      });

      it('should render "due date" Field component', () => {
        expect(Field).toHaveBeenNthCalledWith(
          fieldCallOrderByPlace.dueDateColumn,
          expect.objectContaining({
            dateFormat: DATE_FORMAT,
            component: Datepicker,
            label: labelIds.dueDate,
            name: `${testPathToSchedule}.due`,
            required: true,
          }), {}
        );
      });

      it('should call "onRemoveSchedule" callback on remove button click', () => {
        const onClickTestElement =
          within(screen.getByTestId(testIds.removeColumn)).getByTestId(testIds.onClickTestElement);

        fireEvent.click(onClickTestElement);

        expect(onRemoveScheduleMock).toHaveBeenCalledWith(testScheduleIndex);
      });
    });
  });

  describe('parseDate', () => {
    describe('when input date is empty', () => {
      const testDate = '';
      const testParseDate = (isEndOfDay) => {
        const resultValue = parseDate(testDate, testTimeZone, isEndOfDay);

        expect(resultValue).toBe(testDate);
      };

      it('should return input date for start of day', () => {
        testParseDate();
      });

      it('should return input date for end of day', () => {
        testParseDate(true);
      });
    });

    describe('when input date is not empty', () => {
      const testDate = new Date();

      it('should return parsed date start of day', () => {
        const testFormattedStartOfDay = 'testFormattedStartOfDay';

        moment.tz.mockReturnValue({
          format: jest.fn(() => testFormattedStartOfDay),
        });

        const resultValue = parseDate(testDate, testTimeZone);

        expect(moment.tz).toHaveBeenCalledWith(testDate, testTimeZone);
        expect(resultValue).toBe(testFormattedStartOfDay);
      });

      it('should return parsed date for end of day', () => {
        const testFormattedEndOfDay = 'testFormattedEndOfDay';

        const endOfMethodMockedReturnedValue = {
          format: jest.fn(() => testFormattedEndOfDay),
        };

        const tzMethodMockedReturnedValue = {
          endOf: jest.fn(() => endOfMethodMockedReturnedValue),
        };

        moment.tz.mockReturnValue(tzMethodMockedReturnedValue);

        const resultValue = parseDate(testDate, testTimeZone, true);

        expect(moment.tz).toHaveBeenCalledWith(testDate, testTimeZone);
        expect(tzMethodMockedReturnedValue.endOf).toHaveBeenCalledWith('day');
        expect(resultValue).toBe(testFormattedEndOfDay);
      });
    });
  });
});
