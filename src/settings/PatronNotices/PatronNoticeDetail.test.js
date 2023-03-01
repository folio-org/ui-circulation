import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  Accordion,
  AccordionSet,
  KeyValue,
} from '@folio/stripes/components';
import {
  PreviewModal,
  tokensReducer,
} from '@folio/stripes-template-editor';

import PatronNoticeDetail from './PatronNoticeDetail';

const mockParseWithInstructionsReturnValue = 'parsedValue';
const mockTokensReducerReturnValue = 'tokensReducerValue';

jest.mock('@folio/stripes-template-editor', () => ({
  PreviewModal: jest.fn(({ onClose }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div data-testid="previewModal" onClick={onClose} />
  )),
  tokensReducer: jest.fn(() => mockTokensReducerReturnValue),
}));
jest.mock('html-to-react', () => ({
  __esModule: true,
  default: {
    ProcessNodeDefinitions: jest.fn(() => ({
      processDefaultNode: 'defaultNode',
    })),
  },
  Parser: () => ({
    parseWithInstructions: jest.fn(() => mockParseWithInstructionsReturnValue),
  }),
}));
AccordionSet.mockImplementation(({ children, onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <span data-testid="accordionSet" onClick={() => onToggle({ id: 'email-template-detail' })}>
    {children}
  </span>
));

describe('PatronNoticeDetail', () => {
  const testIds = {
    accordionSet: 'accordionSet',
    emailAccordionContent: 'emailAccordionContent',
    previewModal: 'previewModal',
    previewButtonColumn: 'previewButtonColumn',
  };
  const labelIds = {
    noticeName: 'ui-circulation.settings.patronNotices.notice.name',
    noticeActive: 'ui-circulation.settings.patronNotices.notice.active',
    noticeDescription: 'ui-circulation.settings.patronNotices.notice.description',
    noticeCategory: 'ui-circulation.settings.patronNotices.notice.category',
    email: 'ui-circulation.settings.patronNotices.email',
    yes: 'ui-circulation.settings.patronNotices.yes',
    no: 'ui-circulation.settings.patronNotices.no',
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
  };
  const defaultTestProps = {
    initialValues: defaultInitialValues,
  };
  const keyValueCallOrderByPlace = {
    noticeName: 1,
    noticeActive: 2,
    noticeDescription: 3,
    noticeCategory: 4,
    subject: 5,
    body: 6,
  };
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Accordion.mockClear();
    AccordionSet.mockClear();
    KeyValue.mockClear();
    PreviewModal.mockClear();
    tokensReducer.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(<PatronNoticeDetail {...defaultTestProps} />);
    });

    it('should render "notice name" KeyValue', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(
        keyValueCallOrderByPlace.noticeName,
        {
          label: labelIds.noticeName,
          value: defaultInitialValues.name,
        }, {}
      );
    });

    it('should render "notice description" KeyValue', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(
        keyValueCallOrderByPlace.noticeDescription,
        {
          label: labelIds.noticeDescription,
          value: defaultInitialValues.description,
        }, {}
      );
    });

    it('should render "notice category" KeyValue', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(
        keyValueCallOrderByPlace.noticeCategory,
        {
          label: labelIds.noticeCategory,
          value: defaultInitialValues.category,
        }, {}
      );
    });

    describe('AccordionSet', () => {
      it('should render AccordionSet', () => {
        expect(AccordionSet).toHaveBeenLastCalledWith(
          expect.objectContaining({
            accordionStatus: {
              'email-template-detail': true,
            },
          }), {}
        );
      });

      it('should toggle accordions', () => {
        expect(AccordionSet).toHaveBeenLastCalledWith(
          expect.objectContaining({
            accordionStatus: {
              'email-template-detail': true,
            },
          }), {}
        );

        const accordionSet = screen.getByTestId(testIds.accordionSet);
        fireEvent.click(accordionSet);

        expect(AccordionSet).toHaveBeenLastCalledWith(
          expect.objectContaining({
            accordionStatus: {
              'email-template-detail': false,
            },
          }), {}
        );
      });
    });

    it('should render "email" Accordion', () => {
      expect(Accordion).toHaveBeenLastCalledWith(
        expect.objectContaining({
          id: 'email-template-detail',
          label: labelIds.email,
        }), {}
      );
    });
  });

  [
    false,
    true,
  ].forEach((active) => {
    describe(`when 'active' is ${active}`, () => {
      beforeEach(() => {
        const props = {
          ...defaultTestProps,
          initialValues: {
            ...defaultInitialValues,
            active,
          },
        };

        render(<PatronNoticeDetail {...props} />);
      });

      it('should render "notice active" KeyValue', () => {
        expect(KeyValue).toHaveBeenNthCalledWith(
          keyValueCallOrderByPlace.noticeActive,
          {
            label: labelIds.noticeActive,
            value: labelIds[active ? 'yes' : 'no'],
          }, {}
        );
      });
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
          it('should render email accordion content', () => {
            expect(screen.getByTestId(testIds.emailAccordionContent)).toBeVisible();
          });

          it('should render "subject" KeyValue', () => {
            expect(KeyValue).toHaveBeenNthCalledWith(
              keyValueCallOrderByPlace.subject,
              {
                label: labelIds.subject,
                value: localizedTemplates.en.header,
              }, {}
            );
          });

          it('should render "body" KeyValue', () => {
            expect(KeyValue).toHaveBeenNthCalledWith(
              keyValueCallOrderByPlace.body,
              {
                label: labelIds.body,
                value: mockParseWithInstructionsReturnValue,
              }, {}
            );
          });

          it('should render "preview" Button', () => {
            expect(getById(testIds.previewButtonColumn).getByText(labelIds.preview)).toBeVisible();
          });

          describe('open/close preview dialog', () => {
            const openPreviewDialog = () => {
              const previewButton = getById(testIds.previewButtonColumn).getByText(labelIds.preview);
              fireEvent.click(previewButton);
            };
            const closePreviewDialog = () => {
              const previewModal = screen.getByTestId(testIds.previewModal);
              fireEvent.click(previewModal);
            };
            const testPreviewModalOpen = (open) => {
              expect(PreviewModal).toHaveBeenLastCalledWith(
                expect.objectContaining({
                  open,
                }), {}
              );
            };

            it('should open preview dialog', () => {
              openPreviewDialog();
              testPreviewModalOpen(true);
            });

            it('should close preview dialog', () => {
              openPreviewDialog();
              testPreviewModalOpen(true);
              closePreviewDialog();
              testPreviewModalOpen(false);
            });
          });

          describe('PreviewModal', () => {
            it('should render PreviewModal', () => {
              expect(PreviewModal).toHaveBeenLastCalledWith(
                expect.objectContaining({
                  open: false,
                  header: labelIds.viewPreviewHeader,
                  previewTemplate: localizedTemplates.en.body,
                  previewFormat: mockTokensReducerReturnValue,
                }), {}
              );
            });
          });
        } else {
          it('should not render email accordion content', () => {
            expect(screen.queryByTestId(testIds.emailAccordionContent)).not.toBeInTheDocument();
          });
        }
      }
    );
  });
});
