import React from 'react';
import {
  render,
  screen,
  fireEvent,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { PreviewModal } from '@folio/stripes-template-editor';

import StaffSlipTemplateContentSection from './StaffSlipTemplateContentSection';

const mockParseWithInstructionsReturnValue = 'testParsedValue';
const mockTokensReducerReturnValue = 'testReturnValue';

jest.mock('html-to-react', () => ({
  __esModule: true,
  default: {
    ProcessNodeDefinitions: jest.fn(() => ({
      processDefaultNode: 'testDefaultNode',
    })),
  },
  Parser: () => ({
    parseWithInstructions: jest.fn(() => mockParseWithInstructionsReturnValue),
  }),
}));
jest.mock('@folio/stripes-template-editor', () => ({
  PreviewModal: jest.fn(({
    'data-testid': testId,
  }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div data-testid={testId} />
  )),
  tokensReducer: () => mockTokensReducerReturnValue,
}));

describe('StaffSlipTemplateContentSection', () => {
  const testIds = {
    staffSlipsPreviewButton: 'staffSlipsPreviewButton',
    previewModal: 'previewModal',
  };
  const testInitialValues = {
    name: 'testNameValue',
    description: 'testDescriptionValue',
    template: 'testTemplateValue',
  };
  const labelIds = {
    staffSlipsPreview: 'ui-circulation.settings.staffSlips.preview',
    staffSlipsViewPreviewLabel: 'ui-circulation.settings.staffSlips.view.previewLabel',
    staffSlipsDisplay: 'ui-circulation.settings.staffSlips.display',
  };
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    PreviewModal.mockClear();
  });

  beforeEach(() => {
    render(<StaffSlipTemplateContentSection staffSlip={testInitialValues} />);
  });

  it('render StaffSlipTemplateContentSection', () => {
    expect(screen.getByText(labelIds.staffSlipsDisplay)).toBeVisible();
  });

  it('should render staff slips preview label', () => {
    expect(getById(testIds.staffSlipsPreviewButton).getByText(labelIds.staffSlipsPreview)).toBeVisible();
  });

  describe('PreviewModal', () => {
    it('should render PreviewModal component', () => {
      expect(PreviewModal).toHaveBeenCalledWith(expect.objectContaining({
        open: false,
        header: labelIds.staffSlipsViewPreviewLabel,
        previewTemplate: testInitialValues.template,
        previewFormat: mockTokensReducerReturnValue,
        printable: true,
      }), {});
    });

    it('should open and close PreviewModal component', () => {
      PreviewModal.mockImplementationOnce(({
        onClose,
        'data-testid': testId,
      }) => (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          data-testid={testId}
          onClick={onClose}
        />
      ));

      expect(PreviewModal).toHaveBeenLastCalledWith(expect.objectContaining({
        open: false,
      }), {});

      fireEvent.click(screen.getByTestId(testIds.staffSlipsPreviewButton));

      expect(PreviewModal).toHaveBeenLastCalledWith(expect.objectContaining({
        open: true,
      }), {});

      fireEvent.click(screen.getByTestId(testIds.previewModal));

      expect(PreviewModal).toHaveBeenLastCalledWith(expect.objectContaining({
        open: false,
      }), {});
    });
  });
});
