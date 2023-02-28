import React from 'react';
import {
  render,
  screen,
  // within,
  // fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  Accordion,
  AccordionSet,
  KeyValue,
  ExpandAllButton,
} from '@folio/stripes/components';
import buildStripes from '../../../test/jest/__mock__/stripes.mock';
// import {
//   PreviewModal,
//   tokensReducer,
// } from '@folio/stripes-template-editor';

import { Metadata } from '../components';
import PatronNoticeDetail from './PatronNoticeDetail';
import {
  PatronNoticeAboutSection,
  PatronNoticeEmailSection
} from './components/ViewSections';

// const mockParseWithInstructionsReturnValue = 'parsedValue';
// const mockTokensReducerReturnValue = 'tokensReducerValue';

// jest.mock('@folio/stripes-template-editor', () => ({
//   PreviewModal: jest.fn(({ onClose }) => (
//     // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
//     <div data-testid="previewModal" onClick={onClose} />
//   )),
//   tokensReducer: jest.fn(() => mockTokensReducerReturnValue),
// }));
// jest.mock('html-to-react', () => ({
//   __esModule: true,
//   default: {
//     ProcessNodeDefinitions: jest.fn(() => ({
//       processDefaultNode: 'defaultNode',
//     })),
//   },
//   Parser: () => ({
//     parseWithInstructions: jest.fn(() => mockParseWithInstructionsReturnValue),
//   }),
// }));
const mockTestIds = {
  expandAllButton: 'expandAllButton',
  accordion: 'accordion',
  accordionSet: 'accordionSet',
};

jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));
jest.mock('./components/ViewSections', () => ({
  PatronNoticeAboutSection: jest.fn(() => 'PatronNoticeAboutSection'),
  PatronNoticeEmailSection: jest.fn(() => 'PatronNoticeEmailSection'),
}));
AccordionSet.mockImplementation(({ children, onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <span data-testid={mockTestIds.accordionSet} onClick={() => onToggle({ id: 'email-template-detail' })}>
    {children}
  </span>
));
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

const testStripes = buildStripes();

describe('PatronNoticeDetail', () => {
  const labelIds = {
    // noticeName: 'ui-circulation.settings.patronNotices.notice.name',
    // noticeActive: 'ui-circulation.settings.patronNotices.notice.active',
    // noticeDescription: 'ui-circulation.settings.patronNotices.notice.description',
    // noticeCategory: 'ui-circulation.settings.patronNotices.notice.category',
    generalInformation: 'ui-circulation.settings.patronNotices.generalInformation',
    email: 'ui-circulation.settings.patronNotices.email',
    // yes: 'ui-circulation.settings.patronNotices.yes',
    // no: 'ui-circulation.settings.patronNotices.no',
    subject: 'ui-circulation.settings.patronNotices.subject',
    body: 'ui-circulation.settings.patronNotices.body',
    viewPreviewHeader: 'ui-circulation.settings.patronNotices.view.previewHeader',
    preview: 'ui-circulation.settings.patronNotices.preview',
  };
  const defaultInitialValues = {
    active: false,
    name: 'testName',
    description: 'testDescription',
    category: 'testCategory',
    metadata: 'testMetadata',
  };
  const defaultTestProps = {
    initialValues: defaultInitialValues,
    stripes: testStripes,
  };
  // const keyValueCallOrderByPlace = {
  //   // noticeName: 1,
  //   // noticeActive: 2,
  //   // noticeDescription: 3,
  //   // noticeCategory: 4,
  //   subject: 5,
  //   body: 6,
  // };
  // const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Accordion.mockClear();
    AccordionSet.mockClear();
    KeyValue.mockClear();
    // PreviewModal.mockClear();
    // tokensReducer.mockClear();
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
          id: 'generalInformation',
          label: labelIds.generalInformation,
        }), {});
    });

    it('should render "email" Accordion', () => {
      expect(Accordion).toHaveBeenNthCalledWith(2, expect.objectContaining({
        id: 'emailTemplateDetail',
        label: labelIds.email,
      }), {});
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: defaultTestProps.initialValues.metadata,
      }), {});
    });
  });

  // [
  //   false,
  //   true,
  // ].forEach((active) => {
  //   describe(`when 'active' is ${active}`, () => {
  //     beforeEach(() => {
  //       const props = {
  //         ...defaultTestProps,
  //         initialValues: {
  //           ...defaultInitialValues,
  //           active,
  //         },
  //       };

  //       render(<PatronNoticeDetail {...props} />);
  //     });

  //     it('should render "notice active" KeyValue', () => {
  //       expect(KeyValue).toHaveBeenNthCalledWith(
  //         keyValueCallOrderByPlace.noticeActive,
  //         {
  //           label: labelIds.noticeActive,
  //           value: labelIds[active ? 'yes' : 'no'],
  //         }, {}
  //       );
  //     });
  //   });
  // });

  // [
  //   {
  //     en: {},
  //   },
  //   {
  //     en: {
  //       body: 'body',
  //       header: 'header',
  //     },
  //   },
  // ].forEach((localizedTemplates) => {
  //   describe(
  //     `when localized templates${localizedTemplates.en.body ? '' : ' don\'t'} have body`,
  //     () => {
  //       beforeEach(() => {
  //         const props = {
  //           ...defaultTestProps,
  //           initialValues: {
  //             ...defaultInitialValues,
  //             localizedTemplates,
  //           },
  //         };

  //         render(<PatronNoticeDetail {...props} />);
  //       });

  //       if (localizedTemplates.en.body) {
  //         it('should render email accordion content', () => {
  //           expect(screen.getByTestId('emailAccordionContent')).toBeVisible();
  //         });

  //         it('should render "subject" KeyValue', () => {
  //           expect(KeyValue).toHaveBeenNthCalledWith(
  //             keyValueCallOrderByPlace.subject,
  //             {
  //               label: labelIds.subject,
  //               value: localizedTemplates.en.header,
  //             }, {}
  //           );
  //         });

  //         it('should render "body" KeyValue', () => {
  //           expect(KeyValue).toHaveBeenNthCalledWith(
  //             keyValueCallOrderByPlace.body,
  //             {
  //               label: labelIds.body,
  //               value: mockParseWithInstructionsReturnValue,
  //             }, {}
  //           );
  //         });

  //         it('should render "preview" Button', () => {
  //           expect(getById('previewButtonColumn').getByText(labelIds.preview)).toBeVisible();
  //         });

  //         describe('open/close preview dialog', () => {
  //           const openPreviewDialog = () => {
  //             const previewButton = getById('previewButtonColumn').getByText(labelIds.preview);
  //             fireEvent.click(previewButton);
  //           };
  //           const closePreviewDialog = () => {
  //             const previewModal = screen.getByTestId('previewModal');
  //             fireEvent.click(previewModal);
  //           };
  //           const testPreviewModalOpen = (open) => {
  //             expect(PreviewModal).toHaveBeenLastCalledWith(
  //               expect.objectContaining({
  //                 open,
  //               }), {}
  //             );
  //           };

  //           it('should open preview dialog', () => {
  //             openPreviewDialog();
  //             testPreviewModalOpen(true);
  //           });

  //           it('should close preview dialog', () => {
  //             openPreviewDialog();
  //             testPreviewModalOpen(true);
  //             closePreviewDialog();
  //             testPreviewModalOpen(false);
  //           });
  //         });

  //         describe('PreviewModal', () => {
  //           it('should render PreviewModal', () => {
  //             expect(PreviewModal).toHaveBeenLastCalledWith(
  //               expect.objectContaining({
  //                 open: false,
  //                 header: labelIds.viewPreviewHeader,
  //                 previewTemplate: localizedTemplates.en.body,
  //                 previewFormat: mockTokensReducerReturnValue,
  //               }), {}
  //             );
  //           });
  //         });
  //       } else {
  //         it('should not render email accordion content', () => {
  //           expect(screen.queryByTestId('emailAccordionContent')).not.toBeInTheDocument();
  //         });
  //       }
  //     }
  //   );
  // });
});
