import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  IconButton,
  Select,
} from '@folio/stripes/components';

import ExceptionCard from './ExceptionCard';
import AnonymizingTypeSelectContainer from '../components/AnonymizingTypeSelect/AnonymizingTypeSelectContainer';
import {
  closingTypes,
  closedLoansRules,
} from '../../constants';

jest.mock('../components/AnonymizingTypeSelect/AnonymizingTypeSelectContainer', () => jest.fn(() => null));
Field.mockImplementation(({ children }) => {
  return (
    <div data-testid="selectPaymentMethod">
      {children}
    </div>
  );
});

describe('ExceptionCard', () => {
  const labelIds = {
    paymentMethodLabel: 'ui-circulation.settings.loanHistory.paymentMethodLabel',
    paymentMethodSelect: 'ui-circulation.settings.loanHistory.paymentMethodSelect',
    selectPaymentMethod: 'ui-circulation.settings.loanHistory.selectPaymentMethod',
  };
  const testIds = {
    paymentMethod: 'paymentMethod',
    removeButton: 'removeButton',
    selectPaymentMethod: 'selectPaymentMethod',
  };
  const mockedPathToException = 'testPathToException';
  const mockedPaymentMethods = [
    {
      value: 'firstTestValue',
      label: 'firstTestLabel',
    },
    {
      value: 'secondTestValue',
      label: 'secondTestLabel',
    },
  ];
  const mockedExceptionIndex = 1;
  const mockedOnRemoveException = jest.fn();

  beforeEach(() => {
    render(
      <ExceptionCard
        pathToException={mockedPathToException}
        paymentMethods={mockedPaymentMethods}
        exceptionIndex={mockedExceptionIndex}
        onRemoveException={mockedOnRemoveException}
      />
    );
  });

  afterEach(() => {
    AnonymizingTypeSelectContainer.mockClear();
    Field.mockClear();
    IconButton.mockClear();
    mockedOnRemoveException.mockClear();
  });

  it('should render label for payment method', () => {
    const element = within(screen.getByTestId(testIds.paymentMethod));

    expect(element.getByText(labelIds.paymentMethodLabel)).toBeVisible();
  });

  it('should execute "Field" with passed props', () => {
    const expectedResult = {
      'aria-label': labelIds.paymentMethodSelect,
      name: `${mockedPathToException}.paymentMethod`,
      component: Select,
    };

    expect(Field).toHaveBeenCalledWith(expect.objectContaining(expectedResult), {});
  });

  it('should execute "IconButton" with passed props', () => {
    expect(IconButton).toHaveBeenCalledWith(expect.objectContaining({ icon: 'trash' }), {});
  });

  it('should call "onRemove" with correct props on button click', () => {
    expect(mockedOnRemoveException).not.toHaveBeenCalled();

    fireEvent.click(screen.getByTestId(testIds.removeButton));

    expect(mockedOnRemoveException).toHaveBeenCalledWith(mockedExceptionIndex);
  });

  it('should execute "AnonymizingTypeSelectContainer" with passed props', () => {
    const expectedResult = {
      name: closedLoansRules.WITH_FEES_FINES,
      path: mockedPathToException,
      types: closingTypes,
    };

    expect(AnonymizingTypeSelectContainer).toHaveBeenCalledWith(expectedResult, {});
  });

  describe('payment method options', () => {
    const expectedResult = [
      {
        value: '',
        label: labelIds.selectPaymentMethod,
      },
      ...mockedPaymentMethods,
    ];

    expectedResult.forEach((item, index) => {
      it(`should correctly render ${index + 1} option`, () => {
        const elements = screen.getAllByRole('option');
        const singleOption = elements[index];

        expect(singleOption).toHaveAttribute('value', item.value);
        expect(within(singleOption).getByText(item.label)).toBeVisible();
      });
    });
  });
});
