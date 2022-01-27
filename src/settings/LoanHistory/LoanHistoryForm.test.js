import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import {
  Button,
  Checkbox,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import AnonymizingTypeSelectContainer from '../components/AnonymizingTypeSelect/AnonymizingTypeSelectContainer';
import LoanHistoryForm from './LoanHistoryForm';
import ExceptionsList from './ExceptionsList';
import {
  closingTypes,
  closedLoansRules,
} from '../../constants';

jest.mock('@folio/stripes/final-form', () => jest.fn(() => (Component) => Component));
jest.mock('../components/AnonymizingTypeSelect/AnonymizingTypeSelectContainer', () => jest.fn(() => null));
jest.mock('./ExceptionsList', () => jest.fn(() => null));
jest.mock('../../constants', () => ({
  closingTypes: 'testClosingTypes',
  closedLoansRules: {
    DEFAULT: 'testDefault',
    WITH_FEES_FINES: 'testWithFeesFines',
  },
}));

describe('LoanHistoryForm', () => {
  const labelIds = {
    'buttonSave': 'stripes-core.button.save',
    'closedLoans': 'ui-circulation.settings.loanHistory.closedLoans',
    'anonymize': 'ui-circulation.settings.loanHistory.anonymize',
    'treat': 'ui-circulation.settings.loanHistory.treat',
    'closedLoansFeesFines': 'ui-circulation.settings.loanHistory.closedLoansFeesFines',
    'anonymizeFeesFines': 'ui-circulation.settings.loanHistory.anonymizeFeesFines',
  };
  const testIds = {
    form: 'form',
    submitButton: 'submitButton',
    closedLoans: 'closedLoans',
    closedLoansHeadline: 'closedLoansHeadline',
    closedLoansFeesFinesHeadline: 'closedLoansFeesFinesHeadline',
    loansFeefineSection: 'loansFeefineSection',
  };
  const testHandleSubmit = jest.fn();
  const testGetState = jest.fn(() => ({
    values: {
      treatEnabled: false,
    },
  }));
  const testDefaultProps = {
    handleSubmit: testHandleSubmit,
    form: {
      getState: testGetState,
    },
    pristine: false,
    submitting: false,
  };

  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Button.mockClear();
    Pane.mockClear();
    PaneFooter.mockClear();
    AnonymizingTypeSelectContainer.mockClear();
    FieldArray.mockClear();
    testHandleSubmit.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <LoanHistoryForm {...testDefaultProps} />
      );
    });

    it('should render form', () => {
      const form = screen.getByTestId(testIds.form);

      expect(form).toBeVisible();
      expect(form).toHaveAttribute('noValidate', '');
    });

    it('should submit form', () => {
      expect(testHandleSubmit).toHaveBeenCalledTimes(0);

      fireEvent.submit(screen.getByTestId(testIds.form));

      expect(testHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should render Pane component', () => {
      expect(Pane).toHaveBeenCalledWith(expect.objectContaining({
        defaultWidth: 'fill',
        fluidContentWidth: true,
        paneTitle: undefined,
      }), {});
    });

    it('should render PaneFooter component', () => {
      expect(PaneFooter).toHaveBeenCalled();
    });

    it('should render submit Button component', () => {
      expect(Button).toHaveBeenCalledWith(expect.objectContaining({
        type: 'submit',
        disabled: false,
      }), {});
    });

    it('should render submit Button component label', () => {
      expect(getById(testIds.submitButton).getByText(labelIds.buttonSave)).toBeVisible();
    });

    it('should render closed loans label', () => {
      expect(getById(testIds.closedLoansHeadline).getByText(labelIds.closedLoans)).toBeVisible();
    });

    it('should render anonymize label', () => {
      expect(getById(testIds.closedLoans).getByText(labelIds.anonymize)).toBeVisible();
    });

    it('should render closed loans AnonymizingTypeSelectContainer component', () => {
      expect(AnonymizingTypeSelectContainer).toHaveBeenNthCalledWith(1, expect.objectContaining({
        name: closedLoansRules.DEFAULT,
        path: closedLoansRules.DEFAULT,
        types: closingTypes,
      }), {});
    });

    it('should render treat enabled Field component', () => {
      expect(Field).toHaveBeenCalledWith({
        name: 'treatEnabled',
        type: 'checkbox',
        id: 'treatEnabled-checkbox',
        component: Checkbox,
        label: labelIds.treat,
      }, {});
    });

    it('should not render loans feefine section', () => {
      expect(screen.queryByTestId(testIds.loansFeefineSection)).not.toBeInTheDocument();
    });
  });

  describe('when treatEnabled is true', () => {
    beforeEach(() => {
      render(
        <LoanHistoryForm
          {...testDefaultProps}
          form={{
            ...testDefaultProps.form,
            getState: jest.fn(() => ({
              values: {
                treatEnabled: true,
              },
            })),
          }}
        />
      );
    });

    it('should render loans feefine section', () => {
      expect(screen.getByTestId(testIds.loansFeefineSection)).toBeVisible();
    });

    it('should render closed loans fees fines label', () => {
      expect(getById(testIds.closedLoansFeesFinesHeadline).getByText(labelIds.closedLoansFeesFines)).toBeVisible();
    });

    it('should render anonymize fees fines label', () => {
      expect(getById(testIds.loansFeefineSection).getByText(labelIds.anonymizeFeesFines)).toBeVisible();
    });

    it('should render closed loans fees fines AnonymizingTypeSelectContainer component', () => {
      expect(AnonymizingTypeSelectContainer).toHaveBeenNthCalledWith(2, expect.objectContaining({
        name: closedLoansRules.WITH_FEES_FINES,
        path: closedLoansRules.WITH_FEES_FINES,
        types: closingTypes,
      }), {});
    });

    it('should render loan exceptions FieldArray component', () => {
      expect(FieldArray).toHaveBeenCalledWith({
        name: 'loanExceptions',
        component: ExceptionsList,
      }, {});
    });
  });

  describe('when pristine is true', () => {
    beforeEach(() => {
      render(
        <LoanHistoryForm
          {...testDefaultProps}
          pristine
        />
      );
    });

    it('should render submit Button component', () => {
      expect(Button).toHaveBeenCalledWith(expect.objectContaining({
        disabled: true,
      }), {});
    });
  });

  describe('when submitting is true', () => {
    beforeEach(() => {
      render(
        <LoanHistoryForm
          {...testDefaultProps}
          submitting
        />
      );
    });

    it('should render submit Button component', () => {
      expect(Button).toHaveBeenCalledWith(expect.objectContaining({
        disabled: true,
      }), {});
    });
  });

  describe('when label is passed', () => {
    const testLabel = 'testLabel';

    beforeEach(() => {
      render(
        <LoanHistoryForm
          {...testDefaultProps}
          label={testLabel}
        />
      );
    });

    it('should render Pane component', () => {
      expect(Pane).toHaveBeenCalledWith(expect.objectContaining({
        paneTitle: testLabel,
      }), {});
    });
  });
});
