import {
  render,
  screen,
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
        {type.details}
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
    retainAfterClose: 'ui-circulation.settings.loanHistory.retainAfterClose',
    retainAfterCloseOrSuspended: 'ui-circulation.settings.loanHistory.retainAfterCloseOrSuspended',
    anonymize: 'ui-circulation.settings.loanHistory.anonymize',
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

      expect(screen.getByText(labelIds.immediatelyAfterClose)).toBeVisible();
      expect(screen.getByText(labelIds.retainAfterClose)).toBeVisible();
    });

    it('should render Period component with captions below the interval option', () => {
      expect(Period).toHaveBeenCalledWith(expect.objectContaining({
        inputValuePath: `${testPath}.duration`,
        selectValuePath: `${testPath}.intervalId`,
        inputLabel: 'ui-circulation.settings.loanHistory.length',
        selectLabel: labelIds.interval,
      }), {});
      expect(screen.getByTestId(testIds.period)).toBeInTheDocument();
    });

    it('should not render a fieldset without a legend', () => {
      expect(screen.queryByText(labelIds.anonymize)).not.toBeInTheDocument();
      expect(document.querySelector('fieldset')).not.toBeInTheDocument();
    });

    it('should render Field component', () => {
      expect(Field).toHaveBeenCalledWith(expect.objectContaining({
        name: `${testPath}Selected`,
      }), {});
    });
  });

  describe('with label', () => {
    beforeEach(() => {
      render(
        <AnonymizingTypeSelectContainer
          {...testDefaultProps}
          label={labelIds.anonymize}
        />
      );
    });

    it('should render the label as legend of the radio group', () => {
      expect(screen.getByText(labelIds.anonymize).closest('fieldset')).toBeInTheDocument();
    });
  });

  describe('when disabled', () => {
    beforeEach(() => {
      render(
        <AnonymizingTypeSelectContainer
          {...testDefaultProps}
          disabled
        />
      );
    });

    it('should disable AnonymizingTypeSelect and Period components', () => {
      expect(AnonymizingTypeSelect).toHaveBeenCalledWith(expect.objectContaining({ disabled: true }), {});
      expect(Period).toHaveBeenCalledWith(expect.objectContaining({ disabled: true }), {});
    });
  });

  describe('afterCloseTranslationKey', () => {
    it(`should return ${labelIds.retainAfterClose} when name is ${closedLoansRules.DEFAULT}`, () => {
      expect(afterCloseTranslationKey(closedLoansRules.DEFAULT)).toBe(labelIds.retainAfterClose);
    });

    it(`should return ${labelIds.retainAfterCloseOrSuspended} when name is ${closedLoansRules.WITH_FEES_FINES}`, () => {
      expect(afterCloseTranslationKey(closedLoansRules.WITH_FEES_FINES)).toBe(labelIds.retainAfterCloseOrSuspended);
    });
  });
});
