import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';

import {
  Button,
  Checkbox,
  Pane,
  PaneFooter,
  Modal,
} from '@folio/stripes/components';
import { Field } from 'react-final-form';

import TitleLevelRequestsForm from './TitleLevelRequestsForm';
import NoticeTemplates from './NoticeTemplates';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
  TITLE_LEVEL_REQUESTS,
} from '../../constants';

jest.mock('./NoticeTemplates', () => jest.fn(() => null));
PaneFooter.mockImplementation(jest.fn(({ renderEnd }) => (
  <div>
    {renderEnd}
  </div>
)));
Modal.mockImplementation(jest.fn(({ onClose, footer, children, open, ...rest }) => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
  <div
    open={open}
    onClick={onClose}
    {...rest}
  >
    {children}
    {footer}
  </div>
)));
Field.mockImplementation(jest.fn(({ onChange, ...rest }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div onClick={onChange} {...rest} />
)));

describe('TitleLevelRequestsForm', () => {
  const mockedHandleSubmit = jest.fn();
  const mockedRecord = [
    {
      id: 'testId',
      name: 'testName',
    },
  ];
  const mockedResources = {
    templates: {
      records: mockedRecord,
    },
  };
  const mockedRequest = [{ id: 'testRequest' }];
  const defaultProps = {
    handleSubmit: mockedHandleSubmit,
    label: 'testLabel',
    pristine: false,
    submitting: false,
    resources: mockedResources,
    mutator: {
      requests: {
        GET: () => mockedRequest,
      },
    },
  };
  const testIds = {
    form: 'tlrForm',
    pane: 'tlrPane',
    tlrCheckbox: 'tlrSwitchCheckbox',
    errorModal: 'forbiddenDisableTlrModal',
  };
  const labelIds = {
    tlrEnabled: 'ui-circulation.settings.titleLevelRequests.allow',
    tlrByDefault: 'ui-circulation.settings.titleLevelRequests.createTLR',
    tlrHoldShouldFollowCirculationRules: 'ui-circulation.settings.titleLevelRequests.tlrHoldShouldFollowCirculationRules',
    saveButon: 'stripes-core.button.save',
    errorModalTitle: 'ui-circulation.settings.titleLevelRequests.forbiddenDisableTlrModal.title',
    errorModalDescription: 'ui-circulation.settings.titleLevelRequests.forbiddenDisableTlrModal.description',
    closeButton: 'stripes-core.button.close',
  };
  const orderOfFieldCall = {
    tlrEnabled: 1,
    tlrByDefault: 2,
    tlrHoldShouldFollowCirculationRules: 3,
  };
  const mockedFormChange = jest.fn();

  afterEach(() => {
    Pane.mockClear();
    Field.mockClear();
    Button.mockClear();
    NoticeTemplates.mockClear();
    mockedFormChange.mockClear();
  });

  describe('when "titleLevelRequestsFeatureEnabled" is true', () => {
    const mockedForm = {
      getState: jest.fn(() => ({
        values: {
          ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
          titleLevelRequestsFeatureEnabled: true,
        },
      })),
      change: mockedFormChange,
    };

    beforeEach(() => {
      render(
        <TitleLevelRequestsForm
          form={mockedForm}
          {...defaultProps}
        />
      );
    });

    it('should render form', () => {
      expect(screen.getByTestId(testIds.form)).toBeVisible();
    });

    it('should correctly handle form submit', () => {
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(0);
      fireEvent.submit(screen.getByTestId(testIds.form));
      expect(mockedHandleSubmit).toHaveBeenCalledTimes(1);
    });

    it('should execute "Pane" with passed props', () => {
      const expectedResult = {
        defaultWidth: 'fill',
        fluidContentWidth: true,
        paneTitle:'testLabel',
      };

      expect(Pane).toHaveBeenLastCalledWith(expect.objectContaining(expectedResult), {});
    });

    it('should execute "Field" associated with "TLR eneblade" with passed props', () => {
      const expectedResult = {
        name: TITLE_LEVEL_REQUESTS.TLR_ENABLED,
        type: 'checkbox',
        label: labelIds.tlrEnabled,
        component: Checkbox,
      };

      expect(Field).toHaveBeenNthCalledWith(orderOfFieldCall.tlrEnabled, expect.objectContaining(expectedResult), {});
    });

    it('should execute "Field" associated with "TLR by default" with passed props', () => {
      const expectedResult = {
        name: TITLE_LEVEL_REQUESTS.CREATE_TLR_BY_DEFAULT,
        type: 'checkbox',
        label: labelIds.tlrByDefault,
        component: Checkbox,
      };

      expect(Field).toHaveBeenNthCalledWith(orderOfFieldCall.tlrByDefault, expectedResult, {});
    });

    it('should execute "Field" associated with "tlr hold should follow circulation rules" with passed props', () => {
      const expectedResult = {
        name: TITLE_LEVEL_REQUESTS.TLR_HOLD_SHOULD_FOLLOW_CIRCULATION_RULES,
        type: 'checkbox',
        label: labelIds.tlrHoldShouldFollowCirculationRules,
        component: Checkbox,
      };

      expect(Field).toHaveBeenNthCalledWith(orderOfFieldCall.tlrHoldShouldFollowCirculationRules, expectedResult, {});
    });

    it('should execute "NoticeTemplates" with passed props', () => {
      expect(NoticeTemplates).toHaveBeenLastCalledWith({ templates: mockedRecord }, {});
    });

    it('should execute "Button" with passed props', () => {
      const expectedResult = {
        type: 'submit',
        buttonStyle: 'primary paneHeaderNewButton',
        disabled: false,
        marginBottom0: true,
        children: labelIds.saveButon,
      };

      expect(Button).toHaveBeenLastCalledWith(expectedResult, {});
    });

    describe('when resources are empty', () => {
      it('should execute "NoticeTemplates" with empty array instead of templates', () => {
        render(
          <TitleLevelRequestsForm
            form={mockedForm}
            {...defaultProps}
            resources={{}}
          />
        );

        expect(NoticeTemplates).toHaveBeenLastCalledWith({ templates: [] }, {});
      });
    });

    describe('"Button" should be disabled', () => {
      it('when "pristine" is true', () => {
        render(
          <TitleLevelRequestsForm
            form={mockedForm}
            {...defaultProps}
            pristine
          />
        );

        expect(Button).toHaveBeenLastCalledWith(expect.objectContaining({ disabled: true }), {});
      });

      it('when "submitting" is true', () => {
        render(
          <TitleLevelRequestsForm
            form={mockedForm}
            {...defaultProps}
            submitting
          />
        );

        expect(Button).toHaveBeenLastCalledWith(expect.objectContaining({ disabled: true }), {});
      });
    });

    describe('Modal', () => {
      it('should be executed with passed props', () => {
        const expectedResult = {
          label: labelIds.errorModalTitle,
          open: false,
          dismissible: true,
          children: labelIds.errorModalDescription,
        };

        expect(Modal).toHaveBeenLastCalledWith(expect.objectContaining(expectedResult), {});
      });

      it('should be open', async () => {
        expect(screen.getByTestId(testIds.errorModal)).not.toHaveAttribute('open');

        fireEvent.click(screen.getByTestId(testIds.tlrCheckbox));

        const modalAfterClick = await screen.findByTestId(testIds.errorModal);

        expect(mockedFormChange).not.toHaveBeenCalled();
        expect(modalAfterClick).toHaveAttribute('open');
      });

      it('should have "Close" button', () => {
        expect(screen.getByText(labelIds.closeButton)).toBeVisible();
      });

      it('should close modal on "Close" button click', async () => {
        expect(screen.getByTestId(testIds.errorModal)).not.toHaveAttribute('open');
        fireEvent.click(screen.getByTestId(testIds.tlrCheckbox));
        const modalAfterFirstClick = await screen.findByTestId(testIds.errorModal);
        expect(modalAfterFirstClick).toHaveAttribute('open');

        fireEvent.click(screen.getByText(labelIds.closeButton));
        const modalAfterSecondClick = await screen.findByTestId(testIds.errorModal);
        expect(modalAfterSecondClick).not.toHaveAttribute('open');
      });
    });

    describe('when there are no "Title" requests in data base', () => {
      it('should disable TLR on checkbox click', async () => {
        cleanup();
        render(
          <TitleLevelRequestsForm
            form={mockedForm}
            {...defaultProps}
            mutator={{
              requests: {
                GET: () => [],
              },
            }}
          />
        );

        fireEvent.click(screen.getByTestId(testIds.tlrCheckbox));

        await waitFor(() => {
          expect(mockedFormChange).toHaveBeenCalledWith(TITLE_LEVEL_REQUESTS.TLR_ENABLED, false);
        });
      });
    });
  });

  describe('when "titleLevelRequestsFeatureEnabled" is false', () => {
    const mockedForm = {
      getState: jest.fn(() => ({
        values: {
          ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
          titleLevelRequestsFeatureEnabled: false,
        },
      })),
      change: mockedFormChange,
    };

    beforeEach(() => {
      render(
        <TitleLevelRequestsForm
          form={mockedForm}
          {...defaultProps}
        />
      );
    });

    it('should render only one "Field"', () => {
      const expectedResult = {
        name: TITLE_LEVEL_REQUESTS.TLR_ENABLED,
        type: 'checkbox',
        label: labelIds.tlrEnabled,
        component: Checkbox,
      };

      expect(Field).toHaveBeenCalledTimes(1);
      expect(Field).toHaveBeenNthCalledWith(orderOfFieldCall.tlrEnabled, expect.objectContaining(expectedResult), {});
    });

    it('should not render "NoticeTemplates"', () => {
      expect(NoticeTemplates).toHaveBeenCalledTimes(0);
    });

    it('should execute "Button" with passed props', () => {
      const expectedResult = {
        type: 'submit',
        buttonStyle: 'primary paneHeaderNewButton',
        disabled: false,
        marginBottom0: true,
        children: labelIds.saveButon,
      };

      expect(Button).toHaveBeenLastCalledWith(expectedResult, {});
    });

    it('should enable TLR on checkbox click', async () => {
      fireEvent.click(screen.getByTestId(testIds.tlrCheckbox));

      await waitFor(() => {
        expect(mockedFormChange).toHaveBeenCalledWith(TITLE_LEVEL_REQUESTS.TLR_ENABLED, true);
      });
    });
  });
});
