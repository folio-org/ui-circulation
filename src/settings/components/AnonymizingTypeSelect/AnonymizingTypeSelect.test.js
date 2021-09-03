import React from 'react';
import { render, screen } from '@testing-library/react';

import '../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import { RadioButton } from '@folio/stripes/components';
import AnonymizingTypeSelect from './AnonymizingTypeSelect';

RadioButton.mockImplementation(() => null);
Field.mockImplementation(() => null);

describe('AnonymizingTypeSelect', () => {
  const mockedProps = {
    name: 'testName',
    types: [
      {
        label: 'firstTestLabel',
        value: 'firstTestValue',
      },
      {
        label: 'secondTestLabel',
        value: 'secondTestValue',
      },
    ],
  };
  const testAnonymizingTypeRow = (type, index) => {
    const number = index + 1;
    it(`should use correct props for "Field" in ${number} row`, () => {
      const expectedResult = {
        'data-test-radio-button': true,
        component: RadioButton,
        label: type.label,
        name: `closingType.${mockedProps.name}`,
        type: 'radio',
        id: `${type.value}-${mockedProps.name}-radio-button`,
        value: type.value,
      };

      expect(Field).toHaveBeenNthCalledWith(number, expectedResult, {});
    });
  };

  beforeEach(() => {
    Field.mockClear();

    render(
      <AnonymizingTypeSelect
        {...mockedProps}
      />
    );
  });

  it(`should render ${mockedProps.types.length} rows`, () => {
    expect(screen.getAllByTestId('anonymizingTypeRowTestId')).toHaveLength(mockedProps.types.length);
  });

  mockedProps.types.forEach(testAnonymizingTypeRow);
});
