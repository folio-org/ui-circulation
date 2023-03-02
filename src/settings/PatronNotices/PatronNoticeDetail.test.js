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

import { Metadata } from '../components';
import PatronNoticeDetail from './PatronNoticeDetail';
import {
  PatronNoticeAboutSection,
  PatronNoticeEmailSection
} from './components/ViewSections';

const mockTestIds = {
  expandAllButton: 'expandAllButton',
  accordion: 'accordion',
  accordionSet: 'accordionSet',
};
const mockGeneralInformationId = 'generalInformation';
const mockEmailTemplateDetailId = 'emailTemplateDetail';

jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));
jest.mock('./components/ViewSections', () => ({
  PatronNoticeAboutSection: jest.fn(() => 'PatronNoticeAboutSection'),
  PatronNoticeEmailSection: jest.fn(() => 'PatronNoticeEmailSection'),
}));
ExpandAllButton.mockImplementation(({ onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={mockTestIds.expandAllButton}
    onClick={() => onToggle({
      generalInformation: false,
      emailTemplateDetail: false,
    })}
  />
));

const testStripes = buildStripes();

describe('PatronNoticeDetail', () => {
  const labelIds = {
    generalInformation: 'ui-circulation.settings.patronNotices.generalInformation',
    email: 'ui-circulation.settings.patronNotices.email',
  };
  const defaultInitialValues = {
    active: false,
    name: 'testName',
    description: 'testDescription',
    category: 'testCategory',
    metadata: 'testMetadata',
    localizedTemplates: {
      en: {
        header: 'header',
        body: 'body'
      },
    },
  };
  const defaultTestProps = {
    initialValues: defaultInitialValues,
    stripes: testStripes,
  };
  const accordionDefaultStatus = {
    generalInformation: true,
    emailTemplateDetail: true,
  };

  afterEach(() => {
    Accordion.mockClear();
    AccordionSet.mockClear();
    ExpandAllButton.mockClear();
    Metadata.mockClear();
    PatronNoticeAboutSection.mockClear();
    PatronNoticeEmailSection.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(<PatronNoticeDetail {...defaultTestProps} />);
    });

    it('should render ExpandAllButton component', () => {
      expect(ExpandAllButton).toHaveBeenCalled();
    });

    it('should render AccordionSet component', () => {
      expect(AccordionSet).toHaveBeenCalled();
    });

    it('should render Accordion component 2 times', () => {
      expect(Accordion).toHaveBeenCalledTimes(2);
    });

    it('should render "General information" label', () => {
      expect(screen.getByText(labelIds.generalInformation)).toBeDefined();
    });

    it('should render "Email" label', () => {
      expect(screen.getByText(labelIds.email)).toBeDefined();
    });

    it('should render "general information" Accordion', () => {
      expect(Accordion).toHaveBeenNthCalledWith(1,
        expect.objectContaining({
          id: mockGeneralInformationId,
          label: labelIds.generalInformation,
        }), {});
    });

    it('should render "email" Accordion', () => {
      expect(Accordion).toHaveBeenNthCalledWith(2, expect.objectContaining({
        id: mockEmailTemplateDetailId,
        label: labelIds.email,
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: defaultTestProps.initialValues.metadata,
      }), {});
    });

    it('should render PatronNoticeAboutSection', () => {
      expect(screen.getByText('PatronNoticeAboutSection')).toBeVisible();
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
            emailTemplateDetail: false,
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
          onClick={() => onToggle({ id: mockGeneralInformationId })}
        >
          {children}
        </div>
      ));

      render(<PatronNoticeDetail {...defaultTestProps} />);

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

  [
    {
      en: {},
    },
    {
      en: {
        body: 'body',
        header: 'header',
      },
    },
  ].forEach((localizedTemplates) => {
    describe(
      `when localized templates${localizedTemplates.en.body ? '' : ' don\'t'} have body`,
      () => {
        beforeEach(() => {
          const props = {
            ...defaultTestProps,
            initialValues: {
              ...defaultInitialValues,
              localizedTemplates,
            },
          };

          render(<PatronNoticeDetail {...props} />);
        });

        if (localizedTemplates.en.body) {
          it('should render PatronNoticeEmailSection', () => {
            expect(screen.getByText('PatronNoticeEmailSection')).toBeVisible();
          });
        } else {
          it('should not render email accordion content', () => {
            expect(screen.queryByTestId('PatronNoticeEmailSection')).not.toBeInTheDocument();
          });
        }
      }
    );
  });
});
