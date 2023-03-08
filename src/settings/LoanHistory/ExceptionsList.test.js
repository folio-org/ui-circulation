import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

import '../../../test/jest/__mock__';

import ExceptionCard from './ExceptionCard';
import ExceptionsList from './ExceptionsList';

jest.mock('./ExceptionCard', () => jest.fn(({
  onRemoveException,
  exceptionIndex,
}) => {
  return (
    // eslint-disable-next-line
    <div
      data-testid={`exeptionCard${exceptionIndex + 1}`}
      onClick={() => onRemoveException(exceptionIndex)}
    />
  );
}));

const testIds = {
  exceptionSectionHeader: 'exceptionSectionHeader',
};
const labelIds = {
  exceptionSectionHeader: 'ui-circulation.settings.loanHistory.exceptionSectionHeader',
  exceptionAddButton: 'ui-circulation.settings.loanHistory.addExceptionButton',
};

describe('ExceptionsList', () => {
  const mockedFields = {
    map: jest.fn((callback) => mockedFields.values.map(callback)),
    push: jest.fn(),
    remove: jest.fn(),
    values: [
      'firstTestPatch',
      'secondTestPatch',
    ],
  };
  const mockedResources = {
    paymentMethods: {
      records: [
        {
          payments: [
            {
              nameMethod: 'money',
            },
            {
              nameMethod: 'card',
            },
            {
              nameMethod: 'card',
            },
          ],
        },
      ],
    },
  };

  const getById = (id) => within(screen.getByTestId(id));
  const exeptionCardTest = (patch, index) => {
    const number = index + 1;
    const expectedResult = {
      pathToException: patch,
      paymentMethods: [
        {
          label: 'money',
          value: 'money',
        },
        {
          label: 'card',
          value: 'card',
        },
      ],
      exceptionIndex: index,
    };

    it(`should execute ${number} "ExceptionCard" with passed props`, () => {
      expect(ExceptionCard).toHaveBeenNthCalledWith(number, expect.objectContaining(expectedResult), {});
    });

    it(`should correctly execute "handleRemoveField" for ${number} "ExceptionCard"`, () => {
      expect(mockedFields.remove).toHaveBeenCalledTimes(0);

      fireEvent.click(screen.getByTestId(`exeptionCard${number}`));

      expect(mockedFields.remove).toHaveBeenCalledWith(index);
    });
  };

  beforeEach(() => {
    render(
      <ExceptionsList
        fields={mockedFields}
        resources={mockedResources}
      />
    );
  });

  afterEach(() => {
    ExceptionCard.mockClear();
    mockedFields.push.mockClear();
    mockedFields.remove.mockClear();
  });

  it('should render header label', () => {
    expect(getById(testIds.exceptionSectionHeader).getByText(labelIds.exceptionSectionHeader)).toBeVisible();
  });

  mockedFields.values.map(exeptionCardTest);

  it('button should have correct text inside', () => {
    expect(within(screen.getByRole('button')).getByText(labelIds.exceptionAddButton)).toBeVisible();
  });

  it('should correctly execute "handleAddField" on button click', () => {
    expect(mockedFields.push).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByRole('button'));

    expect(mockedFields.push).toHaveBeenCalledWith({});
  });
});
