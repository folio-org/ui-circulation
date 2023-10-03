import {
  render,
  screen,
  within,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
} from '@folio/stripes/components';

import buildStripes from '../../../test/jest/__mock__/stripes.mock';

import {
  FinesSection,
  OverdueAboutSection,
  ReminderFeesSection,
} from './components/ViewSections';
import { Metadata } from '../components';
import FinePolicyDetail from './FinePolicyDetail';

const mockFinePolicyReturnValue = {
  metadata: 'testMetadata',
};
const mockTestIds = {
  expandAllButton: 'expandAllButton',
  accordionSet: 'accordionSet',
  finesSection: 'finesSection',
  overdueAboutSection: 'overdueAboutSection',
};

jest.mock('./components/ViewSections', () => ({
  FinesSection: jest.fn(() => null),
  OverdueAboutSection: jest.fn(() => null),
  ReminderFeesSection: jest.fn(() => null),
}));
jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));
jest.mock('../Models/FinePolicy', () => jest.fn(() => mockFinePolicyReturnValue));

ExpandAllButton.mockImplementation(({ onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={mockTestIds.expandAllButton}
    onClick={() => onToggle({
      generalFeePolicy: false,
      viewFineSection: false,
      reminderFeesSection: false,
    })}
  />
));

AccordionSet.mockImplementation(({ onToggle, children }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={mockTestIds.accordionSet}
    onClick={() => onToggle({ id: 'generalFeePolicy' })}
  >
    {children}
  </div>
));

const testStripes = buildStripes();

describe('FinePolicyDetail', () => {
  const labelIds = {
    finePolicyGeneralInformation: 'ui-circulation.settings.finePolicy.generalInformation',
    finePolicyYes: 'ui-circulation.settings.finePolicy.yes',
    finePolicyNo: 'ui-circulation.settings.finePolicy.no',
  };
  const testDefaultProps = {
    stripes: testStripes,
    parentResources: {
      noticeTemplates: { records: [] },
      blockTemplates: { records: [] },
    },
  };
  const accordionDefaultStatus = {
    generalFeePolicy: true,
    viewFineSection: true,
    reminderFeesSection: true,
  };

  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Accordion.mockClear();
    AccordionSet.mockClear();
    ExpandAllButton.mockClear();
    Metadata.mockClear();
    FinesSection.mockClear();
    OverdueAboutSection.mockClear();
    ReminderFeesSection.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <FinePolicyDetail {...testDefaultProps} />
      );
    });

    it('should render ExpandAllButton component', () => {
      expect(ExpandAllButton).toHaveBeenCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});
    });

    it('should render AccordionSet component', () => {
      expect(AccordionSet).toHaveBeenCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});
    });

    it('should render Accordion component', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        id: 'generalFeePolicy',
        label: labelIds.finePolicyGeneralInformation,
        open: accordionDefaultStatus.generalFeePolicy,
      }), {});
    });

    it('should render Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: mockFinePolicyReturnValue.metadata,
      }), {});
    });

    it('should render OverdueAboutSection component', () => {
      expect(OverdueAboutSection).toHaveBeenCalled();
    });

    it('should render FinesSection component', () => {
      expect(FinesSection).toHaveBeenCalledWith(expect.objectContaining({
        policy: mockFinePolicyReturnValue,
        fineSectionOpen: accordionDefaultStatus.viewFineSection,
      }), {});
    });
  });

  describe('handleExpandAll method', () => {
    it('should expand all accordions', () => {
      render(
        <FinePolicyDetail {...testDefaultProps} />
      );

      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});

      expect(AccordionSet).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: accordionDefaultStatus.generalFeePolicy,
        }), {}
      );

      expect(FinesSection).toHaveBeenLastCalledWith(
        expect.objectContaining({
          fineSectionOpen: accordionDefaultStatus.viewFineSection,
        }), {}
      );

      fireEvent.click(screen.getByTestId(mockTestIds.expandAllButton));

      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: {
          generalFeePolicy: false,
          viewFineSection: false,
          reminderFeesSection: false,
        },
      }), {});

      expect(AccordionSet).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: {
          generalFeePolicy: false,
          viewFineSection: false,
          reminderFeesSection: false,
        },
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: false,
        }), {}
      );

      expect(FinesSection).toHaveBeenLastCalledWith(
        expect.objectContaining({
          fineSectionOpen: false,
        }), {}
      );
    });
  });

  describe('handleSectionToggle method', () => {
    it('should expand accordion', () => {
      render(
        <FinePolicyDetail {...testDefaultProps} />
      );

      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});

      expect(AccordionSet).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: accordionDefaultStatus,
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: accordionDefaultStatus.generalFeePolicy,
        }), {}
      );

      fireEvent.click(screen.getByTestId(mockTestIds.accordionSet));

      expect(ExpandAllButton).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: {
          ...accordionDefaultStatus,
          generalFeePolicy: false,
        },
      }), {});

      expect(AccordionSet).toHaveBeenLastCalledWith(expect.objectContaining({
        accordionStatus: {
          ...accordionDefaultStatus,
          generalFeePolicy: false,
        },
      }), {});

      expect(Accordion).toHaveBeenLastCalledWith(
        expect.objectContaining({
          open: false,
        }), {}
      );
    });
  });

  describe('getCheckboxValue method', () => {
    const createMockFinesSection = (selectedValue) => {
      FinesSection.mockImplementationOnce(({ getCheckboxValue }) => (
        <div data-testid={mockTestIds.finesSection}>
          {getCheckboxValue(selectedValue)}
        </div>
      ));
    };

    it('should get checkbox value when selectedValue is true', () => {
      createMockFinesSection(true);

      render(
        <FinePolicyDetail {...testDefaultProps} />
      );

      expect(getById(mockTestIds.finesSection).getByText(labelIds.finePolicyYes)).toBeVisible();
    });

    it('should get checkbox value when seletedValue is false', () => {
      createMockFinesSection(false);

      render(
        <FinePolicyDetail {...testDefaultProps} />
      );

      expect(getById(mockTestIds.finesSection).getByText(labelIds.finePolicyNo)).toBeVisible();
    });
  });

  describe('getValue method', () => {
    it('should get value', () => {
      const testValue = 'testValue';

      OverdueAboutSection.mockImplementationOnce(({ getValue }) => (
        <div data-testid={mockTestIds.overdueAboutSection}>
          {getValue('a.b')}
        </div>
      ));

      render(
        <FinePolicyDetail
          {...testDefaultProps}
          initialValues={{
            a: {
              b: testValue,
            },
          }}
        />
      );

      expect(getById(mockTestIds.overdueAboutSection).getByText(testValue)).toBeVisible();
    });
  });
});
