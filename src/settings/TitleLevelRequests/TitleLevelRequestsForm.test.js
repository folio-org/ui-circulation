import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  Button,
  Checkbox,
  Pane,
  PaneFooter,
} from '@folio/stripes/components';
import { Field } from 'react-final-form';
import TitleLevelRequestsForm from './TitleLevelRequestsForm';
import NoticeTemplates from './NoticeTemplates';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
  TITLE_LEVEL_REQUESTS,
} from '../../constants';

jest.mock('./NoticeTemplates', () => jest.fn(() => null));
jest.mock('@folio/stripes/final-form', () => jest.fn(() => (component) => component));
Pane.mockImplementation(jest.fn(({ children, footer }) => (
  <div>
    {children}
    {footer}
  </div>
)));
PaneFooter.mockImplementation(jest.fn(({ renderEnd }) => (
  <div>
    {renderEnd}
  </div>
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
  const defaultProps = {
    handleSubmit: mockedHandleSubmit,
    label: 'testLabel',
    pristine: false,
    submitting: false,
    resources: mockedResources,
  };
  const testIds = {
    form: 'tlrForm',
    pane: 'tlrPane',
  };
  const labelIds = {
    tlrEnabled: 'ui-circulation.settings.titleLevelRequests.allow',
    tlrByDefault: 'ui-circulation.settings.titleLevelRequests.createTLR',
    saveButon: 'stripes-core.button.save',
  };
  const orderOfFieldCall = {
    tlrEnabled: 1,
    tlrByDefault: 2,
  };

  afterEach(() => {
    Pane.mockClear();
    Field.mockClear();
    Button.mockClear();
    NoticeTemplates.mockClear();
  });

  describe('when "titleLevelRequestsFeatureEnabled" is true', () => {
    const mockedForm = {
      getState: jest.fn(() => ({
        values: {
          ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
          titleLevelRequestsFeatureEnabled: true,
        },
      })),
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

      expect(Field).toHaveBeenNthCalledWith(orderOfFieldCall.tlrEnabled, expectedResult, {});
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
  });

  describe('when "titleLevelRequestsFeatureEnabled" is false', () => {
    const mockedForm = {
      getState: jest.fn(() => ({
        values: {
          ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
          titleLevelRequestsFeatureEnabled: false,
        },
      })),
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
      expect(Field).toHaveBeenNthCalledWith(orderOfFieldCall.tlrEnabled, expectedResult, {});
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
  });
});
