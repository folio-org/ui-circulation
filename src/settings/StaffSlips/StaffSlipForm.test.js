import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  Pane,
  Paneset,
  Accordion,
  AccordionSet,
} from '@folio/stripes/components';

import StaffSlipForm from './StaffSlipForm';
import {
  StaffSlipAboutSection,
  StaffSlipTemplateContentSection,
} from './components/EditSections';
import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';

jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
  Metadata: jest.fn(() => null),
}));
jest.mock('./components/EditSections', () => ({
  StaffSlipAboutSection: jest.fn(() => 'StaffSlipAboutSection'),
  StaffSlipTemplateContentSection: jest.fn(() => 'StaffSlipTemplateContentSection'),
}));
Field.mockImplementation(jest.fn(() => null));

const testIds = {
  expandAllButton: 'expandAllButton',
  accordion: 'accordion',
  accordionSet: 'accordionSet',
  formStaffSlip: 'formStaffSlip',
};
const labelIds = {
  new: 'ui-circulation.settings.staffSlips.new',
  staffSlipsGeneralInformation: 'ui-circulation.settings.staffSlips.generalInformation',
  staffSlipsTemplateContent: 'ui-circulation.settings.staffSlips.templateContent',
};

describe('StaffSlipForm', () => {
  const mockedHandleSubmit = jest.fn();
  const mockedOnCancel = jest.fn();

  afterEach(() => {
    Pane.mockClear();
    Accordion.mockClear();
    AccordionSet.mockClear();
    Metadata.mockClear();
    mockedHandleSubmit.mockClear();
    mockedOnCancel.mockClear();
    StaffSlipAboutSection.mockClear();
    StaffSlipTemplateContentSection.mockClear();
  });

  describe('with main props', () => {
    const mockedInitialValues = {
      id: 'testId',
      name: 'testName',
      metadata: 'testMetadata',
    };
    const mockedStripes = {
      hasPerm: jest.fn(() => true),
      connect: jest.fn(),
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
      expect(screen.getByTestId(testIds.formStaffSlip)).toHaveAttribute('noValidate');
    });

    it('on "form" submit should execute passed function', () => {
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(0);
      fireEvent.submit(screen.getByTestId(testIds.formStaffSlip));
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

    it('should render AccordionSet component', () => {
      expect(AccordionSet).toHaveBeenCalled();
    });

    it('should render Accordion component 2 times', () => {
      expect(Accordion).toHaveBeenCalledTimes(2);
    });

    it('should render "General information" label', () => {
      expect(screen.getByText(labelIds.staffSlipsGeneralInformation)).toBeDefined();
    });

    it('should render "Template content" label', () => {
      expect(screen.getByText(labelIds.staffSlipsTemplateContent)).toBeDefined();
    });

    it("should render 'General information' Accordion", () => {
      expect(Accordion).toHaveBeenNthCalledWith(1, expect.objectContaining({
        label: labelIds.staffSlipsGeneralInformation
      }), {});
    });

    it('should render "Template content" Accordion', () => {
      expect(Accordion).toHaveBeenNthCalledWith(2, expect.objectContaining({
        label: labelIds.staffSlipsTemplateContent
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: mockedStripes.connect,
        metadata: mockedInitialValues.metadata,
      }), {});
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
  });
});
