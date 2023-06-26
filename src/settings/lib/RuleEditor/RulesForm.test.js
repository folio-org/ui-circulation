import React from 'react';
import {
  screen,
  render,
  fireEvent,
} from '@testing-library/react';

import '../../../../test/jest/__mock__';

import {
  Button,
  TextField,
} from '@folio/stripes/components';

import { Field } from 'react-final-form';
import buildStripes from '../../../../test/jest/__mock__/stripes.mock';

import { Metadata } from '../../components';
import RulesForm from './RulesForm';
import RulesField from './RulesField';

jest.mock('./RulesField', () => jest.fn(() => null));
jest.mock('../../components', () => ({
  Metadata: jest.fn(() => null),
}));

describe.only('RulesForm', () => {
  const labelIds = {
    filterRules: 'ui-circulation.settings.checkout.filterRules',
    checkoutSave: 'ui-circulation.settings.checkout.save',
  };
  const testIds = {
    formLoanRules: 'formLoanRules',
    ruleFilter: 'ruleFilter',
  };
  const testStripes = buildStripes();
  const testEditorProps = {
    propA: 'testValue',
  };
  const testDefaultProps = {
    pristine: false,
    submitting: false,
    onSubmit: jest.fn(),
    handleSubmit: jest.fn(),
    editorProps: testEditorProps,
    metadata: 'testMetadata',
    stripes: testStripes,
  };

  afterEach(() => {
    Button.mockClear();
    TextField.mockClear();
    Field.mockClear();
    testDefaultProps.handleSubmit.mockClear();
    Metadata.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <RulesForm {...testDefaultProps} />
      );
    });

    it('should call submit callback when form is submitted', () => {
      fireEvent.submit(screen.getByTestId(testIds.formLoanRules));

      expect(testDefaultProps.handleSubmit).toHaveBeenCalled();
    });

    it('should render TextField component with correct props', () => {
      expect(TextField).toHaveBeenCalledWith(expect.objectContaining({
        'aria-label': labelIds.filterRules,
        value: '',
        validationEnabled: false,
        placeholder: labelIds.filterRules,
      }), {});
    });

    it('should render Button component with correct props', () => {
      expect(Button).toHaveBeenCalledWith(expect.objectContaining({
        fullWidth: true,
        id: 'clickable-save-loan-rules',
        type: 'submit',
        disabled: testDefaultProps.pristine || testDefaultProps.submitting,
        children: labelIds.checkoutSave,
      }), {});
    });

    it('should render Field component with correct props', () => {
      expect(Field).toHaveBeenCalledWith(expect.objectContaining({
        component: RulesField,
        name: 'rules',
        filter: '',
        ...testEditorProps,
      }), {});
    });
  });

  describe('when pristine prop is true', () => {
    beforeEach(() => {
      render(
        <RulesForm
          {...testDefaultProps}
          pristine
        />
      );
    });

    it('should render disabled Button component', () => {
      expect(Button).toHaveBeenCalledWith(expect.objectContaining({
        disabled: true,
      }), {});
    });
  });

  describe('when submitting prop is true', () => {
    beforeEach(() => {
      render(
        <RulesForm
          {...testDefaultProps}
          submitting
        />
      );
    });

    it('should render disabled Button component', () => {
      expect(Button).toHaveBeenCalledWith(expect.objectContaining({
        disabled: true,
      }), {});
    });
  });

  describe('filterRules method', () => {
    const newRuleFilterValue = 'newRuleFilterValue';

    beforeEach(() => {
      TextField.mockImplementationOnce(({ onChange }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          data-testid={testIds.ruleFilter}
          onClick={() => onChange({
            target: {
              value: newRuleFilterValue,
            },
          })}
        />
      ));

      render(
        <RulesForm {...testDefaultProps} />
      );
    });

    it('should render Field component with new filter prop value', () => {
      fireEvent.click(screen.getByTestId(testIds.ruleFilter));

      expect(Field).toHaveBeenCalledWith(expect.objectContaining({
        filter: newRuleFilterValue,
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        metadata: testDefaultProps.metadata,
        inlineLayout: false,
        noBackGround: true,
        useAccordion: false,
      }), {});
    });
  });
});
