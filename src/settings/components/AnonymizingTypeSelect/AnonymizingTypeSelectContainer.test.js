import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import AnonymizingTypeSelect from './AnonymizingTypeSelect';
import Period from '../Period';
import AnonymizingTypeSelectContainer from './AnonymizingTypeSelectContainer';

Field.mockImplementation(() => null);

jest.mock('./AnonymizingTypeSelect', () => jest.fn(({ types }) => (
  <div>
    {types.map((type, index) => (
      <div key={index}>
        {type.label}
      </div>
    ))}
  </div>
)));
jest.mock('../Period', () => jest.fn(() => null));

describe('AnonymizingTypeSelectContainer', () => {
  const labelIds = {
    afterClose: 'ui-circulation.settings.loanHistory.afterClose',
  };
  const testName = 'testName';
  const testPath = 'testPath';
  const testTypes = [
    {
      value: 'immediately',
      label: 'ui-circulation.settings.loanHistory.immediatelyAfterClose',
    },
    {
      value: 'interval',
      label: 'ui-circulation.settings.loanHistory.interval',
    },
  ];
  const testDefaultProps = {
    name: testName,
    path: testPath,
    types: testTypes,
  };

  afterEach(() => {
    Field.mockClear();
    Period.mockClear();
    AnonymizingTypeSelect.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <AnonymizingTypeSelectContainer {...testDefaultProps} />
      );
    });

    it('should render AnonymizingTypeSelect component', () => {
      expect(AnonymizingTypeSelect).toHaveBeenCalledWith(expect.objectContaining({
        name: testPath,
      }), {});

      expect(Period).toHaveBeenCalledWith(expect.objectContaining({
        inputValuePath: `${testPath}.duration`,
        selectValuePath: `${testPath}.intervalId`,
      }), {});

      expect(within(screen.getByTestId('period')).getByText(labelIds.afterClose)).toBeVisible();
    });

    it('should render Field component', () => {
      expect(Field).toHaveBeenCalledWith(expect.objectContaining({
        name: `${testPath}Selected`,
      }), {});
    });
  });
});
