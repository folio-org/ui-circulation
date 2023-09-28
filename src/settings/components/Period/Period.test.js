import {
  render,
  screen,
  within,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Field,
} from 'react-final-form';
import {
  TextField,
  Select,
} from '@folio/stripes/components';

import Period, {
  transformInputValue,
} from './Period';

const testIds = {
  onClearFieldTestElement: 'onClearFieldTestElement',
  periodLabelSection: 'periodLabelSection',
  periodIntervalColumn: 'periodIntervalColumn',
  finePolicyDurationColumn: 'finePolicyDurationColumn',
  finePolicyIntervalColumn: 'finePolicyIntervalColumn',
};
const labelIds = {
  fieldLabelId: 'testFieldLabelId',
  intervalPeriodsSuffixId: 'testIntervalPeriodsSuffix',
};

Field.mockImplementation(({ onClearField }) => {
  return (
    // eslint-disable-next-line
    <div data-testid={testIds.onClearFieldTestElement} onClick={onClearField} />
  );
});

describe('Period', () => {
  const fieldCallOrderByPlace = {
    finePolicyDurationColumn: 1,
    finePolicyIntervalColumn: 2,
  };

  afterEach(() => {
    Field.mockClear();
  });

  const commonMockedProps = {
    inputValuePath: 'inputValuePathTestValue',
    selectValuePath: 'selectValuePathTestValue',
    intervalPeriods: [
      <option value="1" key="1">
        test option1
      </option>,
      <option value="2" key="2">
        test option2
      </option>,
    ],
  };

  describe('with default optional props values', () => {
    beforeEach(() => {
      render(<Period {...commonMockedProps} />);
    });

    it('should not render period label section', () => {
      const periodLabelSection = screen.queryByTestId(testIds.periodLabelSection);

      expect(periodLabelSection).not.toBeInTheDocument();
    });

    it('should render fine policy duration column', () => {
      const finePolicyDurationColumn = screen.getByTestId(testIds.finePolicyDurationColumn);

      expect(finePolicyDurationColumn).toHaveAttribute('xs', '2');
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.finePolicyDurationColumn,
        expect.objectContaining({
          'aria-label': 'ui-circulation.settings.finePolicy.duration',
          type: 'number',
          required: false,
          name: commonMockedProps.inputValuePath,
          component: TextField,
          placeholder: '',
        }), {}
      );
    });

    it('should render fine policy interval column', () => {
      const finePolicyIntervalColumn = screen.getByTestId(testIds.finePolicyIntervalColumn);

      expect(finePolicyIntervalColumn).toHaveAttribute('xs', '2');
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.finePolicyIntervalColumn,
        expect.objectContaining({
          'aria-label': 'ui-circulation.settings.finePolicy.interval',
          name: commonMockedProps.selectValuePath,
          component: Select,
          required: false,
          placeholder: '',
        }), {}
      );
    });

    it('should not render period interval column', () => {
      const periodIntervalColumn = screen.queryByTestId(testIds.periodIntervalColumn);

      expect(periodIntervalColumn).not.toBeInTheDocument();
    });
  });

  it('should call "changeFormValue" callback on input clear', () => {
    const changeFormValueMock = jest.fn();

    render(<Period {...commonMockedProps} changeFormValue={changeFormValueMock} />);

    const finePolicyDurationColumn = screen.getByTestId(testIds.finePolicyDurationColumn);
    const textFieldOnClearFieldTestElement =
      within(finePolicyDurationColumn).getByTestId(testIds.onClearFieldTestElement);

    fireEvent.click(textFieldOnClearFieldTestElement);

    expect(changeFormValueMock).toHaveBeenCalledWith(commonMockedProps.inputValuePath, '');
  });

  describe('when "selectPlaceholder" props is passed', () => {
    const testSelectPlaceholder = 'testSelectPlaceholder';

    beforeEach(() => {
      render(
        <Period
          {...commonMockedProps}
          selectPlaceholder={testSelectPlaceholder}
        />
      );
    });

    it('should render fine policy interval column', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.finePolicyIntervalColumn,
        expect.objectContaining({
          placeholder: testSelectPlaceholder,
        }), {}
      );
    });
  });

  describe('when "fieldLabel" props is passed', () => {
    const mockedProps = {
      ...commonMockedProps,
      fieldLabel: labelIds.fieldLabelId,
    };

    beforeEach(() => {
      render(<Period {...mockedProps} />);
    });

    it('should render period label section', () => {
      const periodLabelSection = screen.getByTestId(testIds.periodLabelSection);
      const periodLabel = within(periodLabelSection).getByText(labelIds.fieldLabelId);

      expect(periodLabelSection).toBeVisible();
      expect(periodLabel).toBeVisible();
    });
  });

  describe('when "required" props is passed', () => {
    const mockedProps = {
      ...commonMockedProps,
      fieldLabel: labelIds.fieldLabelId,
      required: true,
    };

    beforeEach(() => {
      render(<Period {...mockedProps} />);
    });

    it('should render period label section', () => {
      const periodLabelSection = screen.getByTestId(testIds.periodLabelSection);
      const periodLabel = within(periodLabelSection).getByText(labelIds.fieldLabelId);

      expect(periodLabel).toHaveAttribute('required');
    });
  });

  describe('when "inputSize" props is passed', () => {
    const mockedProps = {
      ...commonMockedProps,
      inputSize: 3,
    };

    beforeEach(() => {
      render(<Period {...mockedProps} />);
    });

    it('should render fine policy duration column', () => {
      const finePolicyDurationColumn = screen.getByTestId(testIds.finePolicyDurationColumn);

      expect(finePolicyDurationColumn).toHaveAttribute('xs', '3');
    });
  });

  describe('when "intervalPeriodsSuffix" props is passed', () => {
    const mockedProps = {
      ...commonMockedProps,
      intervalPeriodsSuffix: labelIds.intervalPeriodsSuffixId,
    };

    beforeEach(() => {
      render(<Period {...mockedProps} />);
    });

    it('should render period interval column', () => {
      const periodIntervalColumn = screen.getByTestId(testIds.periodIntervalColumn);
      const periodLabel = within(periodIntervalColumn).getByText(labelIds.intervalPeriodsSuffixId);

      expect(periodIntervalColumn).toBeVisible();
      expect(periodIntervalColumn).toHaveAttribute('xs', '2');
      expect(periodLabel).toBeVisible();
    });
  });

  describe('when "selectSize" props is passed', () => {
    const mockedProps = {
      ...commonMockedProps,
      selectSize: 3,
      intervalPeriodsSuffix: labelIds.intervalPeriodsSuffixId,
    };

    beforeEach(() => {
      render(<Period {...mockedProps} />);
    });

    it('should render fine policy interval column', () => {
      const finePolicyIntervalColumn = screen.getByTestId(testIds.finePolicyIntervalColumn);

      expect(finePolicyIntervalColumn).toHaveAttribute('xs', '3');
    });

    it('should render period interval column', () => {
      const periodIntervalColumn = screen.getByTestId(testIds.periodIntervalColumn);

      expect(periodIntervalColumn).toHaveAttribute('xs', '3');
    });
  });

  describe('transformInputValue', () => {
    it('should return input value transformed to number when it is not empty', () => {
      expect(transformInputValue('12')).toBe(12);
    });

    it('should return empty string when input value is empty', () => {
      expect(transformInputValue(null)).toBe('');
    });
  });
});
