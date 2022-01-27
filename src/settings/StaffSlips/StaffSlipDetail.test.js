import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  KeyValue,
  Button,
} from '@folio/stripes/components';
import { PreviewModal } from '@folio/stripes-template-editor';

import StaffSlipDetail from './StaffSlipDetail';

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

describe('StaffSlipDetail', () => {
  const keyValueCallOrder = {
    staffSlipsName: 1,
    staffSlipsDescription: 2,
  };
  const testIds = {
    staffSlipsDisplayCol: 'staffSlipsDisplayCol',
    staffSlipsPreviewButton: 'staffSlipsPreviewButton',
    emailTemplateCol: 'emailTemplateCol',
    previewModal: 'previewModal',
  };
  const labelIds = {
    staffSlipsName: 'ui-circulation.settings.staffSlips.name',
    staffSlipsDescription: 'ui-circulation.settings.staffSlips.description',
    staffSlipsDisplay: 'ui-circulation.settings.staffSlips.display',
    staffSlipsPreview: 'ui-circulation.settings.staffSlips.preview',
    staffSlipsViewPreviewLabel: 'ui-circulation.settings.staffSlips.view.previewLabel',
  };
  const testInitialValues = {
    name: 'testNameValue',
    description: 'testDescriptionValue',
    template: 'testTemplateValue',
  };
  const testDefaultProps = {
    initialValues: testInitialValues,
  };
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    KeyValue.mockClear();
    Button.mockClear();
    PreviewModal.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(
        <StaffSlipDetail {...testDefaultProps} />
      );
    });

    it('should render staff slips name KeyValue component', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(keyValueCallOrder.staffSlipsName, {
        label: labelIds.staffSlipsName,
        value: testInitialValues.name,
      }, {});
    });

    it('should render staff slips description KeyValue component', () => {
      expect(KeyValue).toHaveBeenNthCalledWith(keyValueCallOrder.staffSlipsDescription, {
        label: labelIds.staffSlipsDescription,
        value: testInitialValues.description,
      }, {});
    });

    it('should render staff slips display label', () => {
      expect(getById(testIds.staffSlipsDisplayCol).getByText(labelIds.staffSlipsDisplay)).toBeVisible();
    });

    it('should render staff slips preview label', () => {
      expect(getById(testIds.staffSlipsPreviewButton).getByText(labelIds.staffSlipsPreview)).toBeVisible();
    });

    it('should render parsed email template', () => {
      expect(getById(testIds.emailTemplateCol).getByText(mockParseWithInstructionsReturnValue)).toBeVisible();
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
});
