import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  Button,
  Accordion,
  AccordionSet,
  ExpandAllButton,
} from '@folio/stripes/components';
import buildStripes from '../../../test/jest/__mock__/stripes.mock';

import StaffSlipDetail from './StaffSlipDetail';
import { Metadata } from '../components';
import { StaffSlipAboutSection, StaffSlipTemplateContentSection } from './components/ViewSections';

const mockGeneralStaffSlipDetailId = 'generalInformation';
const mocktemplateContentId = 'templateContent';

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

Button.mockImplementation(jest.fn(({
  children,
  'data-testid': testId,
  onClick,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={testId}
    onClick={onClick}
  >
    {children}
  </div>
)));

const testStripes = buildStripes();

describe('StaffSlipDetail', () => {
  const labelIds = {
    staffSlipsName: 'ui-circulation.settings.staffSlips.name',
    staffSlipsDescription: 'ui-circulation.settings.staffSlips.description',
    staffSlipsDisplay: 'ui-circulation.settings.staffSlips.display',
    staffSlipsPreview: 'ui-circulation.settings.staffSlips.preview',
    staffSlipsViewPreviewLabel: 'ui-circulation.settings.staffSlips.view.previewLabel',
    staffSlipsGeneralInformation: 'ui-circulation.settings.staffSlips.generalInformation',
    staffSlipsTemplateContent: 'ui-circulation.settings.staffSlips.templateContent',
  };
  const testInitialValues = {
    name: 'testNameValue',
    description: 'testDescriptionValue',
    template: 'testTemplateValue',
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
    Button.mockClear();
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

    it('should render ExpandAllButton component', () => {
      expect(ExpandAllButton).toHaveBeenCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});
    });

    it('should render AccordionSet component', () => {
      expect(AccordionSet).toHaveBeenCalled();
    });

    it('should render Accordion component with label "General information"', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        id: mockGeneralStaffSlipDetailId,
        label: labelIds.staffSlipsGeneralInformation,
        open: accordionDefaultStatus.generalInformation,
      }), {});
    });

    it('should render Accordion component with label "Template content"', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        id: mocktemplateContentId,
        label: labelIds.staffSlipsTemplateContent,
        open: accordionDefaultStatus.templateContent,
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: undefined,
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

        expect(Accordion).toHaveBeenLastCalledWith(
          expect.objectContaining({
            open: false,
          }), {}
        );
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
