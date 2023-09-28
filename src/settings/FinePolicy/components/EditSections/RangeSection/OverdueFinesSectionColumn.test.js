import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

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

const testIds = {
  mainLabelTestId: 'mainLabelTestId',
};
const labelIds = {
  quantityLabelId: 'ui-circulation.settings.finePolicy.quantity',
  selectLabelId: 'ui-circulation.settings.finePolicy.select',
  finePolicyYes: 'ui-circulation.settings.finePolicy.yes',
  finePolicyNo: 'ui-circulation.settings.finePolicy.no',

};

describe('OverdueFinesSectionColumn', () => {
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Field.mockClear();
  });

  describe('when component is "TextField"', () => {
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
      expect(getById(testIds.mainLabelTestId).getByText('firstTestLabel')).toBeVisible();
    });

    it('should execute "Field" with correct props', () => {
      const expectedProps = {
        'aria-label': labelIds.quantityLabelId,
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
      expect(getById(testIds.mainLabelTestId).getByText('firstTestLabel')).toBeVisible();
    });

    it('should execute "Field" with correct props', () => {
      const expectedProps = {
        'aria-label': labelIds.selectLabelId,
        name: 'secondTestName',
        component: Select,
        dataOptions: [
          {
            value: true,
            label: labelIds.finePolicyYes,
          },
          {
            value: false,
            label: labelIds.finePolicyNo,
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
