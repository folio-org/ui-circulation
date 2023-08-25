import React from 'react';
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  RadioButton,
  TextField,
} from '@folio/stripes/components';
import RadioGroup from './RadioGroup';

const catchFunction = jest.fn();

Field.mockImplementation(({ label, ...rest }) => {
  catchFunction({ ...rest });

  return (
    <div>
      {label}
    </div>
  );
});

describe('RadioGroup', () => {
  const testIds = {
    actualCostTestId: 'actualCostTestId',
    chargeAmountItemTestId: 'chargeAmountItemTestId',
    setCostTestId: 'setCostTestId',
  };
  const labelIds = {
    chargeAmountItemLabelId: 'ui-circulation.settings.lostItemFee.chargeAmountItem',
    actualCostLabelId: 'ui-circulation.settings.lostItemFee.actualCost',
    setCostLabelId: 'ui-circulation.settings.lostItemFee.setCost',
    chargeAmountLabelId: 'ui-circulation.settings.lostItemFee.chargeAmount',
  };

  const getById = (id) => within(screen.getByTestId(id));
  const mockedOnBlure = jest.fn();

  beforeEach(() => {
    render(
      <RadioGroup
        onBlur={mockedOnBlure}
      />
    );
  });

  afterEach(() => {
    Field.mockClear();
  });

  it('should render label of component correctly', () => {
    expect(getById(testIds.chargeAmountItemTestId).getByText(labelIds.chargeAmountItemLabelId)).toBeVisible();
    expect(screen.getByTestId(testIds.chargeAmountItemTestId)).toHaveAttribute('for', 'chargeAmount');
    expect(screen.getByTestId(testIds.chargeAmountItemTestId)).toHaveAttribute('id', 'chargeAmount-label');
  });

  it('should use correct props for "Field" in "actual cost" section', () => {
    const expectedResult = {
      name: 'chargeAmountItem.chargeType',
      component: RadioButton,
      id: 'chargeAmount',
      value: 'actualCost',
      type: 'radio',
    };

    expect(getById(testIds.actualCostTestId).getByText(labelIds.actualCostLabelId)).toBeVisible();
    expect(catchFunction).toHaveBeenNthCalledWith(1, expectedResult);
  });

  it('should use correct props for "Field" in "set cost" section', () => {
    const expectedResult = {
      name: 'chargeAmountItem.chargeType',
      component: RadioButton,
      value: 'anotherCost',
      type: 'radio',
    };

    expect(getById(testIds.setCostTestId).getByText(labelIds.setCostLabelId)).toBeVisible();
    expect(catchFunction).toHaveBeenNthCalledWith(2, expectedResult);
  });

  it('should use correct props for "Field" in "charge amount" section', () => {
    const expectedResult = {
      'aria-label': labelIds.chargeAmountLabelId,
      name: 'chargeAmountItem.amount',
      component: TextField,
      type: 'number',
      format: mockedOnBlure,
      formatOnBlur: true,
    };

    expect(Field).toHaveBeenNthCalledWith(3, expectedResult, {});
  });
});
