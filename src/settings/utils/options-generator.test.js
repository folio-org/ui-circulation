import { noop } from 'lodash';

import {
  render,
  screen,
  within,
} from '@testing-library/react';

import optionsGenerator from './options-generator';

const testIds = {
  placeholderTestId: 'placeholderTestId',
};

describe('settings utils', () => {
  describe('optionsGenerator', () => {
    const mockedFormatMessage = jest.fn(({ id }) => id);
    const getById = (id) => within(screen.getByTestId(id));
    const optionTest = (config) => {
      config.forEach((item, index) => {
        expect(screen.getByTestId(`optionTestId${index}`)).toBeVisible();
        expect(getById(`optionTestId${index}`).getByText(item.label)).toBeVisible();
      });
    };
    const mockedConfigData = [
      {
        value: 'first',
        label: 'firstTestLabel',
      },
      {
        value: 'second',
        label: 'secondTestLabel',
      },
    ];
    const mockedPlaceholder = 'Test Placeholder';

    afterEach(() => {
      mockedFormatMessage.mockClear();
    });

    it('should return empty array if placeholder and config is not passed', () => {
      const result = optionsGenerator(mockedFormatMessage);

      expect(result).toEqual([]);
    });

    it('should return array only with placeholder if config is not passed', () => {
      const result = optionsGenerator(mockedFormatMessage, {}, mockedPlaceholder);

      render(result.map((item) => item));

      expect(screen.getAllByRole('option')).toHaveLength(1);
      expect(screen.getByText(mockedPlaceholder)).toBeVisible();
      expect(mockedFormatMessage).toHaveBeenCalledTimes(1);
    });

    it('should return array with two options and no placeholder', () => {
      const result = optionsGenerator(mockedFormatMessage, mockedConfigData, '');

      render(result.map((item) => item));

      expect(screen.queryByTestId(testIds.placeholderTestId)).not.toBeInTheDocument();
      expect(screen.getAllByRole('option')).toHaveLength(2);
      expect(mockedFormatMessage).toHaveBeenCalledTimes(2);
      optionTest(mockedConfigData);
    });

    it('should not return anything as formated message if formatMessage function is not passed', () => {
      const result = optionsGenerator(noop, mockedConfigData, mockedPlaceholder);

      render(result.map((item) => item));

      expect(screen.queryAllByText(/Test/)).toHaveLength(0);
    });
  });
});
