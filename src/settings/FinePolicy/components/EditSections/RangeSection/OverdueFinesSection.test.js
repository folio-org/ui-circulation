import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  Select,
  TextField,
} from '@folio/stripes/components';
import OverdueFinesSection, {
  formatNumber,
} from './OverdueFinesSection';

Field.mockImplementation(jest.fn(() => null));

const testIds = {
  finePolicyLabelTestId: 'finePolicyLabelTestId',
  quantityDurationLabelTestId: 'quantityDurationLabelTestId',
};
const labelIds = {
  quantityLabelId: 'ui-circulation.settings.circulationRules.overdueFine.quantity',
  perLabelId: 'ui-circulation.settings.finePolicy.per',
  periodLabelId: 'ui-circulation.settings.circulationRules.overdueFine.period',
};

describe('OverdueFinesSection', () => {
  const fieldsMap = {
    quantityField: 1,
    periodField: 2,
  };

  const getById = (id) => within(screen.getByTestId(id));

  beforeEach(() => {
    render(
      <OverdueFinesSection
        label={<div>testLabel</div>}
        name="testName"
        period="testPeriod"
        intervalPeriods={['testIntervalPeriod']}
        data="testData"
      />
    );
  });

  afterEach(() => {
    Field.mockClear();
  });

  it('should render component main label', () => {
    expect(getById(testIds.quantityDurationLabelTestId).getByText('testLabel')).toBeVisible();
  });

  it('should use correct props for "Field" in "overdue fine quantity" section', () => {
    const expectedResult = {
      'aria-label': labelIds.quantityLabelId,
      name: 'testName',
      type: 'number',
      hasClearIcon: false,
      component: TextField,
      formatOnBlur: true,
      format: formatNumber,
    };

    expect(Field).toHaveBeenNthCalledWith(fieldsMap.quantityField, expectedResult, {});
  });

  it('should render secondary label', () => {
    expect(getById(testIds.finePolicyLabelTestId).getByText(labelIds.perLabelId)).toBeVisible();
  });

  it('should use correct props for "Field" in "overdue fine period" section', () => {
    const expectedResult = {
      'aria-label': labelIds.periodLabelId,
      children: ['testIntervalPeriod'],
      name: 'testPeriod',
      component: Select,
    };

    expect(Field).toHaveBeenNthCalledWith(fieldsMap.periodField, expectedResult, {});
  });

  describe('formatNumber function', () => {
    it('should return "0.00" if value not passed', () => {
      expect(formatNumber()).toBe('0.00');
    });

    it('should not change passed value', () => {
      expect(formatNumber(5.55)).toBe('5.55');
    });

    it('should format passed value correctly', () => {
      expect(formatNumber(5.55555)).toBe('5.56');
    });
  });
});
