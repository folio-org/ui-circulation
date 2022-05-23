import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import { TemplateEditor } from '@folio/stripes-template-editor';
import {
  KeyValue,
  Pane,
  Paneset,
  TextArea,
} from '@folio/stripes/components';

import StaffSlipForm from './StaffSlipForm';
import TokensList from './TokensList';
import getTokens from './tokens';
import {
  CancelButton,
  FooterPane,
} from '../components';

jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
}));
Field.mockImplementation(jest.fn(() => null));

describe('StaffSlipForm', () => {
  const orderOfFieldExecution = {
    description: 1,
    template: 2,
  };
  const labelIds = {
    name: 'ui-circulation.settings.staffSlips.name',
    description: 'ui-circulation.settings.staffSlips.description',
    display: 'ui-circulation.settings.staffSlips.display',
    preview: 'ui-circulation.settings.staffSlips.form.previewLabel',
    new: 'ui-circulation.settings.staffSlips.new',
  };
  const mockedHandleSubmit = jest.fn();
  const mockedOnCancel = jest.fn();

  afterEach(() => {
    Field.mockClear();
    Pane.mockClear();
    mockedHandleSubmit.mockClear();
    mockedOnCancel.mockClear();
  });

  describe('with main props', () => {
    const mockedInitialValues = {
      id: 'testId',
      name: 'testName',
    };
    const mockedStripes = {
      hasPerm: jest.fn(() => true),
    };
    const mockedfooterPaneProps = {
      pristine: true,
      submitting: true,
      onCancel: mockedOnCancel,
    };

    beforeEach(() => {
      render(
        <StaffSlipForm
          stripes={mockedStripes}
          handleSubmit={mockedHandleSubmit}
          initialValues={mockedInitialValues}
          {...mockedfooterPaneProps}
        />
      );
    });

    afterEach(() => {
      mockedStripes.hasPerm.mockClear();
    });

    it('"form" component should have correct attributes', () => {
      expect(screen.getByTestId('formStaffSlip')).toHaveAttribute('noValidate');
    });

    it('on "form" submit should execute passed function', () => {
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(0);
      fireEvent.submit(screen.getByTestId('formStaffSlip'));
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should execute "Paneset" with passed props', () => {
      expect(Paneset).toHaveBeenLastCalledWith(expect.objectContaining({ isRoot: true }), {});
    });

    it('should execute "Pane" with passed props', () => {
      const expectedResult = {
        paneTitle: mockedInitialValues.name,
      };

      expect(Pane).toHaveBeenLastCalledWith(expect.objectContaining(expectedResult), {});
      expect(CancelButton).toHaveBeenLastCalledWith({ onCancel: mockedOnCancel }, {});
      expect(FooterPane).toHaveBeenLastCalledWith(mockedfooterPaneProps, {});
    });

    it('should execute "KeyValue" with passed props', () => {
      const expectedResult = {
        label: labelIds.name,
        value: mockedInitialValues.name,
      };

      expect(KeyValue).toHaveBeenLastCalledWith(expectedResult, {});
    });

    it('should execute "Field" associated with description with passed props', () => {
      const expectedResult = {
        label: labelIds.description,
        name: 'description',
        id: 'input-staff-slip-description',
        autoFocus: true,
        component: TextArea,
        fullWidth: true,
        disabled: false,
      };

      expect(Field).toHaveBeenNthCalledWith(orderOfFieldExecution.description, expectedResult, {});
    });

    it('should execute "Field" associated with template with passed props', () => {
      const expectedResult = {
        label: labelIds.display,
        component: TemplateEditor,
        tokens: getTokens('en'),
        name: 'template',
        previewModalHeader: labelIds.preview,
        tokensList: TokensList,
        printable: true,
      };

      expect(Field).toHaveBeenNthCalledWith(orderOfFieldExecution.template, expectedResult, {});
    });
  });

  describe('with alternative props', () => {
    const mockedInitialValues = {
      name: 'testName',
    };
    const mockedStripes = {
      hasPerm: jest.fn(() => false),
    };
    const mockedfooterPaneProps = {
      pristine: false,
      submitting: false,
      onCancel: mockedOnCancel,
    };

    beforeEach(() => {
      render(
        <StaffSlipForm
          stripes={mockedStripes}
          handleSubmit={mockedHandleSubmit}
          initialValues={mockedInitialValues}
          {...mockedfooterPaneProps}
        />
      );
    });

    afterEach(() => {
      mockedStripes.hasPerm.mockClear();
    });

    it('should execute "Pane" with passed props', () => {
      expect(Pane).toHaveBeenLastCalledWith(
        expect.objectContaining({ paneTitle: labelIds.new }),
        {},
      );
      expect(FooterPane).toHaveBeenLastCalledWith(
        mockedfooterPaneProps,
        {},
      );
    });

    it('should execute "Field" associated with description with passed props', () => {
      expect(Field).toHaveBeenNthCalledWith(
        orderOfFieldExecution.description,
        expect.objectContaining({ disabled: true }),
        {},
      );
    });
  });
});
