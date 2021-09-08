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
import { FormattedMessage } from 'react-intl';
import OverdueFinesSectionColumn, {
  formatNumber,
} from './OverdueFinesSectionColumn';

Field.mockImplementation(jest.fn(() => null));

describe('OverdueFinesSectionColumn', () => {
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Field.mockClear();
  });

  describe('when component is "TextField"', () => {
    const quantityLabelId = 'ui-circulation.settings.finePolicy.quantity';

    beforeEach(() => {
      render(
        <OverdueFinesSectionColumn
          label={<div>firstTestLabel</div>}
          component="TextField"
          name="firstTestName"
          intl={{ formatMessage: FormattedMessage }}
        />
      );
    });

    it('should render main label', () => {
      expect(getById('mainLabelTestId').getByText('firstTestLabel')).toBeVisible();
    });

    it('should execute "Field" with correct props', () => {
      const expectedProps = {
        'aria-label': quantityLabelId,
        name: 'firstTestName',
        type: 'number',
        hasClearIcon: false,
        component: TextField,
        formatOnBlur: true,
        format: formatNumber,
      };

      expect(Field).toHaveBeenLastCalledWith(expectedProps, {});
    });
  });

  describe('when component is "Select"', () => {
    const selectLabelId = 'ui-circulation.settings.finePolicy.select';

    beforeEach(() => {
      render(
        <OverdueFinesSectionColumn
          label={<div>firstTestLabel</div>}
          component="Select"
          name="secondTestName"
          intl={{ formatMessage: FormattedMessage }}
        />
      );
    });

    it('should render main label', () => {
      expect(getById('mainLabelTestId').getByText('firstTestLabel')).toBeVisible();
    });

    it('should execute "Field" with correct props', () => {
      const expectedProps = {
        'aria-label': selectLabelId,
        name: 'secondTestName',
        component: Select,
        dataOptions: [
          {
            value: true,
            label: 'ui-circulation.settings.finePolicy.yes',
          },
          {
            value: false,
            label: 'ui-circulation.settings.finePolicy.no',
          },
        ],
      };

      expect(Field).toHaveBeenLastCalledWith(expectedProps, {});
    });
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
