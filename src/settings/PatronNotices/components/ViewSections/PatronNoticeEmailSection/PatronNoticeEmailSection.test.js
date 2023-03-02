import React from 'react';
import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import {
  Row,
  Col,
  KeyValue,
} from '@folio/stripes/components';
import {
  PreviewModal,
  tokensReducer,
} from '@folio/stripes-template-editor';

import PatronNoticeEmailSection from './PatronNoticeEmailSection';

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

describe('PatronNoticeEmailSection', () => {
  const testNotice = {
    name: 'testName',
    desciption: 'testDescription',
    category: 'testCategory',
    localizedTemplates: {
      en: {
        header: 'header',
      },
    }
  };
  const testEmailTemplate = '<div>test</div>';
  const keyValueCallOrderByPlace = {
    subject: 1,
    body: 2,
  };
  const testIds = {
    patronNoticeSubject: 'patronNoticeSubject',
    patronNoticeBody: 'patronNoticeBody',
    emailAccordionContent: 'emailAccordionContent',
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
      <PatronNoticeEmailSection
        notice={testNotice}
        locale="en"
        emailTemplate={testEmailTemplate}
      />
    );
  });

  it('should render "email" accordion content', () => {
    expect(screen.getByTestId(testIds.emailAccordionContent)).toBeVisible();
  });

  it('should render label of "subject" field', () => {
    expect(getItemByTestId(testIds.patronNoticeSubject).getByText(labelIds.subject)).toBeVisible();
  });

  it('should render "subject" KeyValue', () => {
    expect(KeyValue).toHaveBeenNthCalledWith(
      keyValueCallOrderByPlace.subject,
      expect.objectContaining({
        value: testNotice.localizedTemplates.en.header,
      }), {}
    );
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
        previewTemplate: testEmailTemplate,
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
      const previewModal = screen.getByTestId('previewModal');
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
