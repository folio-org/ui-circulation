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
  ExpandAllButton,
} from '@folio/stripes/components';

import StaffSlipForm from './StaffSlipForm';
import {
  StaffSlipAboutSection,
  StaffSlipTemplateContentSection
} from './components/EditSections';
import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';

const mockGeneralStaffSlipDetailId = 'generalInformation';
const mockTemplateContentId = 'templateContent';

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

const mockTestIds = {
  expandAllButton: 'expandAllButton',
  accordion: 'accordion',
  accordionSet: 'accordionSet',
};

ExpandAllButton.mockImplementation(({ onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={mockTestIds.expandAllButton}
    onClick={() => onToggle({
      generalInformation: false,
      templateContent: false,
    })}
  />
));

describe('StaffSlipForm', () => {
  const labelIds = {
    new: 'ui-circulation.settings.staffSlips.new',
    staffSlipsGeneralInformation: 'ui-circulation.settings.staffSlips.generalInformation',
    staffSlipsTemplateContent: 'ui-circulation.settings.staffSlips.templateContent',
  };
  const mockedHandleSubmit = jest.fn();
  const mockedOnCancel = jest.fn();
  const mockedHandleExpandAll = jest.fn();
  const mockedHandleSectionToggle = jest.fn();

  afterEach(() => {
    Pane.mockClear();
    Accordion.mockClear();
    AccordionSet.mockClear();
    ExpandAllButton.mockClear();
    Metadata.mockClear();
    mockedHandleSubmit.mockClear();
    mockedOnCancel.mockClear();
    mockedHandleExpandAll.mockClear();
    mockedHandleSectionToggle.mockClear();
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
    const accordionDefaultStatus = {
      generalInformation: true,
      templateContent: true,
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
        id: mockGeneralStaffSlipDetailId,
        open: accordionDefaultStatus.generalInformation,
      }), {});
    });

    it('should render "Template content" Accordion', () => {
      expect(Accordion).toHaveBeenNthCalledWith(2, expect.objectContaining({
        id: mockTemplateContentId,
        open: accordionDefaultStatus.templateContent,
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: mockedStripes.connect,
        metadata: mockedInitialValues.metadata,
      }), {});
    });

    describe('handleExpandAll method', () => {
      it('should render components with default accordions statuses', () => {
        expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
          accordionStatus: accordionDefaultStatus,
        }), {});

        expect(Accordion).toHaveBeenLastCalledWith(
          expect.objectContaining({
            open: accordionDefaultStatus.generalInformation,
          }), {}
        );
      });

      it('should expand all accordions statuses', () => {
        fireEvent.click(screen.getByTestId(mockTestIds.expandAllButton));

        expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
          accordionStatus: {
            generalInformation: false,
            templateContent: false,
          },
        }), {});
      });
    });

    describe('handleSectionToggle method', () => {
      it('should close accordion', () => {
        Accordion.mockImplementationOnce(({ onToggle, children }) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
          <div
            data-testid={mockTestIds.accordion}
            onClick={() => onToggle({ id: mockGeneralStaffSlipDetailId })}
          >
            {children}
          </div>
        ));

        render(
          <StaffSlipForm
            stripes={mockedStripes}
            handleSubmit={mockedHandleSubmit}
            initialValues={mockedInitialValues}
            {...mockedfooterPaneProps}
          />
        );

        expect(Accordion).toHaveBeenCalledWith(
          expect.objectContaining({
            open: accordionDefaultStatus.generalInformation,
          }), {}
        );

        fireEvent.click(screen.getByTestId(mockTestIds.accordion));

        expect(Accordion).toHaveBeenCalledWith(
          expect.objectContaining({
            open: !accordionDefaultStatus.generalInformation,
          }), {}
        );
      });
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
