import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { Field } from 'react-final-form';

import AnonymizingTypeSelect from './AnonymizingTypeSelect';
import Period from '../Period';
import AnonymizingTypeSelectContainer, {
  afterCloseTranslationKey,
} from './AnonymizingTypeSelectContainer';
import { closedLoansRules } from '../../../constants';

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
  const testIds = {
    period: 'period',
  };
  const labelIds = {
    afterClose: 'ui-circulation.settings.loanHistory.afterClose',
    afterCloseOrSuspended: 'ui-circulation.settings.loanHistory.afterCloseOrSuspended',
    immediatelyAfterClose: 'ui-circulation.settings.loanHistory.immediatelyAfterClose',
    interval: 'ui-circulation.settings.loanHistory.interval',
  };
  const testName = 'testName';
  const testPath = 'testPath';
  const testTypes = [
    {
      value: 'immediately',
      label: labelIds.immediatelyAfterClose,
    },
    {
      value: 'interval',
      label: labelIds.interval,
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

      expect(within(screen.getByTestId(testIds.period)).getByText(labelIds.afterClose)).toBeVisible();
    });

    it('should render Field component', () => {
      expect(Field).toHaveBeenCalledWith(expect.objectContaining({
        name: `${testPath}Selected`,
      }), {});
    });
  });

  describe('afterCloseTranslationKey', () => {
    it(`should return ${labelIds.afterClose} when name is ${closedLoansRules.DEFAULT}`, () => {
      expect(afterCloseTranslationKey(closedLoansRules.DEFAULT)).toBe(labelIds.afterClose);
    });

    it(`should return ${labelIds.afterCloseOrSuspended} when name is ${closedLoansRules.WITH_FEES_FINES}`, () => {
      expect(afterCloseTranslationKey(closedLoansRules.WITH_FEES_FINES)).toBe(labelIds.afterCloseOrSuspended);
    });
  });
});
