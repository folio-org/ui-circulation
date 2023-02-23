import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
} from '@folio/stripes/components';
import buildStripes from '../../../test/jest/__mock__/stripes.mock';

import StaffSlipDetail from './StaffSlipDetail';
import { Metadata } from '../components';
import {
  StaffSlipAboutSection,
  StaffSlipTemplateContentSection,
} from './components/ViewSections';

const mockGeneralStaffSlipDetailId = 'generalInformation';
const mockTemplateContentId = 'templateContent';

jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));
jest.mock('./components/ViewSections', () => ({
  StaffSlipAboutSection: jest.fn(() => 'StaffSlipAboutSection'),
  StaffSlipTemplateContentSection: jest.fn(() => 'StaffSlipTemplateContentSection'),
}));

const mockTestIds = {
  expandAllButton: 'expandAllButton',
  accordion: 'accordion',
  accordionSet: 'accordionSet',
};
const testStripes = buildStripes();

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

describe('StaffSlipDetail', () => {
  const labelIds = {
    staffSlipsGeneralInformation: 'ui-circulation.settings.staffSlips.generalInformation',
    staffSlipsTemplateContent: 'ui-circulation.settings.staffSlips.templateContent',
  };
  const testInitialValues = {
    name: 'testNameValue',
    description: 'testDescriptionValue',
    template: 'testTemplateValue',
    metadata: 'testMetadata'
  };
  const testDefaultProps = {
    initialValues: testInitialValues,
    stripes: testStripes,
  };
  const accordionDefaultStatus = {
    generalInformation: true,
    templateContent: true,
  };

  afterEach(() => {
    Accordion.mockClear();
    AccordionSet.mockClear();
    ExpandAllButton.mockClear();
    Metadata.mockClear();
    StaffSlipAboutSection.mockClear();
    StaffSlipTemplateContentSection.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <StaffSlipDetail {...testDefaultProps} />
      );
    });

    it('should render ExpandAllButton component', () => {
      expect(ExpandAllButton).toHaveBeenCalled();
    });

    it('should render ExpandAllButton component and also have all accordions open', () => {
      expect(ExpandAllButton).toHaveBeenCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});
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
        connect: testStripes.connect,
        metadata: testDefaultProps.initialValues.metadata,
      }), {});
    });

    it('should display StaffSlipAboutSection', () => {
      expect(screen.getByText('StaffSlipAboutSection')).toBeVisible();
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
        <StaffSlipDetail {...testDefaultProps} />
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
