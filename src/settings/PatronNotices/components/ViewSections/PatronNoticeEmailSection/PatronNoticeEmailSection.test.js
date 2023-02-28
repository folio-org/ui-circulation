import React from 'react';
import {
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
        header: 'test'
      },
    }
  };
  const testIds = {
    patronNoticeSubject: 'patronNoticeSubject',
  };
  const labelIds = {
    subject: 'ui-circulation.settings.patronNotices.subject',
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
        emailTemplate="<div>test</div>"
      />
    );
  });

  it('should render "email" accordion content', () => {
    expect(screen.getByTestId('emailAccordionContent')).toBeVisible();
  });

  it('should render label of "subject" field', () => {
    expect(getItemByTestId(testIds.patronNoticeSubject).getByText(labelIds.subject)).toBeVisible();
  });

  it('should render "preview" button', () => {
    expect(screen.getByRole('button', { name: /preview/i }));
  });
});
