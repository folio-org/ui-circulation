import React from 'react';
import { IntlProvider } from 'react-intl';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import SchedulesList from './SchedulesList';

const mockedSchedules = [
  {
    due: '2021-08-14T23:59:59.000+00:00',
    from: '2021-08-05T00:00:00.000+00:00',
    to: '2021-08-10T23:59:59.000+00:00',
  },
  {
    due: '2021-08-20T23:59:59.000+00:00',
    from: '2021-08-12T00:00:00.000+00:00',
    to: '2021-08-16T23:59:59.000+00:00',
  },
];

const expectedResults = [
  {
    dueExpect: '8/14/2021',
    fromExpect: '8/5/2021',
    toExpect: '8/10/2021',
  },
  {
    dueExpect: '8/20/2021',
    fromExpect: '8/12/2021',
    toExpect: '8/16/2021',
  },
];

const eachScheduleTesting = (item, index) => {
  const currentItemNumber = index + 1;
  const currentItemSelector = () => within(screen.getByTestId(`ui-circulation.settings.fDDSform-${currentItemNumber}`));
  const {
    dueExpect,
    fromExpect,
    toExpect,
  } = expectedResults[index];

  it(`should render element at number ${currentItemNumber}`, () => {
    expect(screen.getByTestId(`ui-circulation.settings.fDDSform-${currentItemNumber}`)).toBeTruthy();
  });

  it(`should render header of element at number ${currentItemNumber}`, () => {
    expect(currentItemSelector().getByText('ui-circulation.settings.fDDSform.dateFormTitle')).toBeTruthy();
  });

  it(`should render all necessary columns of element at number ${currentItemNumber}`, () => {
    expect(currentItemSelector().getByText('ui-circulation.settings.fDDSform.dateFrom')).toBeTruthy();
    expect(currentItemSelector().getByText('ui-circulation.settings.fDDSform.dateTo')).toBeTruthy();
    expect(currentItemSelector().getByText('ui-circulation.settings.fDDSform.dueDate')).toBeTruthy();
  });

  it(`should render dates of element at number ${currentItemNumber} correctly`, () => {
    expect(currentItemSelector().getByText(dueExpect)).toBeTruthy();
    expect(currentItemSelector().getByText(fromExpect)).toBeTruthy();
    expect(currentItemSelector().getByText(toExpect)).toBeTruthy();
  });
};

describe('SchedulesList', () => {
  beforeEach(() => {
    render(
      <IntlProvider locale="en">
        <SchedulesList
          schedules={mockedSchedules}
          timezone="UTC"
        />
      </IntlProvider>
    );
  });

  mockedSchedules.map(eachScheduleTesting);
});
