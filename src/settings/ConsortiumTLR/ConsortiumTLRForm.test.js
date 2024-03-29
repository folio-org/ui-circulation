import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import ConsortiumTLRForm from './ConsortiumTLRForm';

const basicProps = {
  handleSubmit: jest.fn(),
  pristine: false,
  isDataSaving: false,
  isConsortiumTlrPending: false,
  isEditEnabled: true,
  tlrSettings: {
    isPending: false,
    records: [
      {
        value: {
          titleLevelRequestsFeatureEnabled: true,
        },
      }
    ],
  },
};
const labelIds = {
  saveButton: 'stripes-core.button.save',
  paneTitle: 'ui-circulation.settings.index.consortiumTLR',
  notification: 'ui-circulation.settings.consortiumTlr.notification',
  consortiumTlrLabel: 'ui-circulation.settings.consortiumTlr.allow',
};
const testIds = {
  consortiumTlrForm: 'consortiumTlrForm',
};

describe('ConsortiumTLRForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When TLR feature enabled', () => {
    beforeEach(() => {
      render(
        <ConsortiumTLRForm
          {...basicProps}
        />
      );
    });

    it('should render pane title', () => {
      const paneTitle = screen.getByText(labelIds.paneTitle);

      expect(paneTitle).toBeInTheDocument();
    });

    it('should render consortium TLR label', () => {
      const consortiumTlrLabel = screen.getByText(labelIds.consortiumTlrLabel);

      expect(consortiumTlrLabel).toBeInTheDocument();
    });

    it('should render save button', () => {
      const saveButton = screen.getByText(labelIds.saveButton);

      expect(saveButton).toBeInTheDocument();
    });

    it('should not render notification', () => {
      const notification = screen.queryByText(labelIds.notification);

      expect(notification).not.toBeInTheDocument();
    });

    it('should handle form submitting', () => {
      const consortiumTlrForm = screen.getByTestId(testIds.consortiumTlrForm);

      fireEvent.submit(consortiumTlrForm);

      expect(basicProps.handleSubmit).toHaveBeenCalled();
    });
  });

  describe('When TLR feature disabled', () => {
    const props = {
      ...basicProps,
      tlrSettings: {
        isPending: false,
        records: [
          {
            value: {
              titleLevelRequestsFeatureEnabled: false,
            },
          }
        ],
      },
    };

    beforeEach(() => {
      render(
        <ConsortiumTLRForm
          {...props}
        />
      );
    });

    it('should render notification', () => {
      const notification = screen.getByText(labelIds.notification);

      expect(notification).toBeInTheDocument();
    });
  });
});
