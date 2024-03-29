import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

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
  PatronNoticeEmailSection,
} from './components/ViewSections';

const mockPatronNoticeAboutSection = 'PatronNoticeAboutSection';
const mockPatronNoticeEmailSection = 'PatronNoticeEmailSection';

jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));
jest.mock('./components/ViewSections', () => ({
  PatronNoticeAboutSection: jest.fn(() => 'PatronNoticeAboutSection'),
  PatronNoticeEmailSection: jest.fn(() => 'PatronNoticeEmailSection'),
}));

const testStripes = buildStripes();

describe('PatronNoticeDetail', () => {
  const labelIds = {
    generalInformation: 'ui-circulation.settings.patronNotices.generalInformation',
    emailOrPrint: 'ui-circulation.settings.patronNotices.emailOrPrint',
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

    it('should render "Email or print" label', () => {
      expect(screen.getByText(labelIds.emailOrPrint)).toBeDefined();
    });

    it('should render "general information" Accordion', () => {
      expect(Accordion).toHaveBeenNthCalledWith(1,
        expect.objectContaining({
          label: labelIds.generalInformation,
        }), {});
    });

    it('should render "email" Accordion', () => {
      expect(Accordion).toHaveBeenNthCalledWith(2, expect.objectContaining({
        label: labelIds.emailOrPrint,
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: defaultTestProps.initialValues.metadata,
      }), {});
    });

    it('should render PatronNoticeAboutSection', () => {
      expect(screen.getByText(mockPatronNoticeAboutSection)).toBeVisible();
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
            expect(screen.getByText(mockPatronNoticeEmailSection)).toBeVisible();
          });
        } else {
          it('should not render email accordion content', () => {
            expect(screen.queryByText(mockPatronNoticeEmailSection)).not.toBeInTheDocument();
          });
        }
      }
    );
  });
});
