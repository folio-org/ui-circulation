import {
  fireEvent,
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Row,
  Col,
  KeyValue,
} from '@folio/stripes/components';
import {
  PreviewModal,
  tokensReducer,
} from '@folio/stripes-template-editor';

import PatronNoticePrintSection from './PatronNoticePrintSection';

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
  Parser:  jest.fn(() => ({
    parseWithInstructions: jest.fn(() => mockParseWithInstructionsReturnValue),
  })),
}));

describe('PatronNoticePrintSection', () => {
  const testNotice = {
    name: 'testName',
    description: 'testDescription',
    category: 'testCategory',
    localizedTemplates: {
      en: {
        header: 'header',
      },
    },
  };
  const testPrintTemplate = '<div>test</div>';
  const keyValueCallOrderByPlace = {
    body: 1,
  };
  const testIds = {
    patronNoticeBody: 'patronNoticeBody',
    printAccordionContent: 'printAccordionContent',
    previewModal: 'previewModal',
  };
  const labelIds = {
    subject: 'ui-circulation.settings.patronNotices.subject',
    body: 'ui-circulation.settings.patronNotices.body',
    viewPreviewHeader: 'ui-circulation.settings.patronNotices.view.previewHeader',
  };
  const getItemByTestId = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Col.mockClear();
    KeyValue.mockClear();
    PreviewModal.mockClear();
    Row.mockClear();
    tokensReducer.mockClear();
  });

  beforeEach(() => {
    render(
      <PatronNoticePrintSection
        notice={testNotice}
        locale="en"
        printTemplate={testPrintTemplate}
      />
    );
  });

  it('should render "print" accordion content', () => {
    expect(screen.getByTestId(testIds.printAccordionContent)).toBeVisible();
  });

  it('should render "preview" button', () => {
    expect(screen.getByRole('button', { name: /preview/i })).toBeDefined();
  });

  it('should render label of "body" field', () => {
    expect(getItemByTestId(testIds.patronNoticeBody).getByText(labelIds.body)).toBeVisible();
  });

  it('should render "body" KeyValue', () => {
    expect(KeyValue).toHaveBeenNthCalledWith(
      keyValueCallOrderByPlace.body,
      expect.objectContaining({
        value: mockParseWithInstructionsReturnValue,
      }), {}
    );
  });

  it('should render PreviewModal', () => {
    expect(PreviewModal).toHaveBeenLastCalledWith(
      expect.objectContaining({
        open: false,
        previewTemplate: testPrintTemplate,
        previewFormat: mockTokensReducerReturnValue,
      }), {}
    );
  });

  describe('open/close preview dialog', () => {
    const openPreviewDialog = () => {
      const previewButton = screen.getByRole('button', { name: /preview/i });
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
          previewFormat: mockTokensReducerReturnValue,
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
});
