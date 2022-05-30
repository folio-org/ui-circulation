import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import { Field } from 'react-final-form';
import {
  Pane,
  Paneset,
  TextField,
  Checkbox,
  TextArea,
  Select,
  AccordionSet,
  Accordion,
} from '@folio/stripes/components';

import { TemplateEditor } from '@folio/stripes-template-editor';
import { componentPropsCheck } from '../../../test/jest/helpers';
import PatronNoticeForm from './PatronNoticeForm';
import TokensList from './TokensList';
import {
  CancelButton,
  FooterPane,
} from '../components';

const mockGetTokensReturnValue = 'getTokensReturnValue';

AccordionSet.mockImplementation(({ children, onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <span data-testid="accordionSet" onClick={() => onToggle({ id: 'email-template-form' })}>
    {children}
  </span>
));
jest.mock('@folio/stripes-template-editor', () => ({
  TemplateEditor: jest.fn(() => null),
}));
jest.mock('./tokens', () => jest.fn(() => mockGetTokensReturnValue));
jest.mock('./TokensList', () => jest.fn(() => null));
jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
}));
jest.mock('../../constants', () => ({
  patronNoticeCategories: [{
    id: 'testId',
    label: 'testLabel',
  }],
}));

describe('PatronNoticeForm', () => {
  const testIds = {
    patronNoticePaneset: 'patronNoticePaneset',
    patronNoticeTemplatePane: 'patronNoticeTemplatePane',
    patronNoticeCancelButton: 'patronNoticeCancelButton',
    patronNoticeFooterPane: 'patronNoticeFooterPane',
    patronNoticesNoticeName: 'patronNoticesNoticeName',
    patronNoticesNoticeActive: 'patronNoticesNoticeActive',
    patronNoticesNoticeDescription: 'patronNoticesNoticeDescription',
    patronNoticesNoticeCategory: 'patronNoticesNoticeCategory',
    patronNoticesSubject: 'patronNoticesSubject',
    patronNoticesBody: 'patronNoticesBody',
    patronNoticesAccordionSet: 'patronNoticesAccordionSet',
    patronNoticesEmail: 'patronNoticesEmail',
  };
  const labelIds = {
    patronNoticesNew: 'ui-circulation.settings.patronNotices.newLabel',
    patronNoticesCloseDialog: 'ui-circulation.settings.patronNotices.closeDialog',
    patronNoticesNoticeName: 'ui-circulation.settings.patronNotices.notice.name',
    patronNoticesNoticeActive: 'ui-circulation.settings.patronNotices.notice.active',
    patronNoticesNoticeDescription: 'ui-circulation.settings.patronNotices.notice.description',
    patronNoticesNoticeCategory: 'ui-circulation.settings.patronNotices.notice.category',
    patronNoticesEmail: 'ui-circulation.settings.patronNotices.email',
    patronNoticesSubject: 'ui-circulation.settings.patronNotices.subject',
    patronNoticesBody: 'ui-circulation.settings.patronNotices.body',
    patronNoticesFormPreviewHeader: 'ui-circulation.settings.patronNotices.form.previewHeader',
    patronNoticesPredefinedWarning: 'ui-circulation.settings.patronNotices.predefinedWarning',
  };
  const testOkapi = {
    url: 'testUrl',
    tenant: 'testTenant',
    token: 'testToken',
  };
  const categoryValue = 'testCategoryValue';
  const testGetFieldState = jest.fn((field) => {
    return {
      category: {
        value: categoryValue,
      },
    }[field];
  });
  const testPristineValue = true;
  const testSubmittingValue = true;
  const testHandleSubmit = jest.fn();
  const testOnCancel = jest.fn();
  const defaultTestProps = {
    form: {
      getFieldState: testGetFieldState,
    },
    pristine: testPristineValue,
    submitting: testSubmittingValue,
    handleSubmit: testHandleSubmit,
    onCancel: testOnCancel,
    okapi: testOkapi,
  };

  afterEach(() => {
    Paneset.mockClear();
    Pane.mockClear();
    Field.mockClear();
    AccordionSet.mockClear();
    Accordion.mockClear();
    CancelButton.mockClear();
    FooterPane.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(<PatronNoticeForm {...defaultTestProps} />);
    });

    it('should render Paneset component', () => {
      componentPropsCheck(Paneset, testIds.patronNoticePaneset, {
        isRoot: true,
      }, true);
    });

    it('should render patron notice template Pane component', () => {
      componentPropsCheck(Pane, testIds.patronNoticeTemplatePane, {
        id: 'patron-notice-template-pane',
        defaultWidth: '100%',
        paneTitle: labelIds.patronNoticesNew,
      }, true);
    });

    it('should render CancelButton component', () => {
      componentPropsCheck(CancelButton, testIds.patronNoticeCancelButton, {
        labelKey: labelIds.patronNoticesCloseDialog,
        onCancel: testOnCancel,
      });
    });

    it('should render FooterPane component', () => {
      componentPropsCheck(FooterPane, testIds.patronNoticeFooterPane, {
        pristine: testPristineValue,
        submitting: testSubmittingValue,
        onCancel: testOnCancel,
      });
    });

    it('should render notice name Field component', () => {
      componentPropsCheck(Field, testIds.patronNoticesNoticeName, {
        label: labelIds.patronNoticesNoticeName,
        name: 'name',
        required: true,
        id: 'input-patron-notice-name',
        autoFocus: true,
        component: TextField,
      }, true);
    });

    it('should render notice active Field component', () => {
      componentPropsCheck(Field, testIds.patronNoticesNoticeActive, {
        label: labelIds.patronNoticesNoticeActive,
        name: 'active',
        id: 'input-patron-notice-active',
        component: Checkbox,
        defaultChecked: undefined,
      });
    });

    it('should render notice description Field component', () => {
      componentPropsCheck(Field, testIds.patronNoticesNoticeDescription, {
        label: labelIds.patronNoticesNoticeDescription,
        name: 'description',
        id: 'input-patron-notice-description',
        component: TextArea,
      });
    });

    it('should render notice category Field component', () => {
      componentPropsCheck(Field, testIds.patronNoticesNoticeCategory, {
        label: labelIds.patronNoticesNoticeCategory,
        name: 'category',
        component: Select,
        fullWidth: true,
        dataOptions: [{
          value: 'testId',
          label: 'testLabel',
        }],
      });
    });

    it('should render notice category Field component', () => {
      componentPropsCheck(Field, testIds.patronNoticesSubject, {
        id: 'input-patron-notice-subject',
        component: TextField,
        required: true,
        label: labelIds.patronNoticesSubject,
        name: 'localizedTemplates.en.header',
      });
    });

    it('should render patron notices body Field component', () => {
      componentPropsCheck(Field, testIds.patronNoticesBody, {
        label: labelIds.patronNoticesBody,
        required: true,
        name: 'localizedTemplates.en.body',
        id: 'input-email-template-body',
        component: TemplateEditor,
        tokens: mockGetTokensReturnValue,
        tokensList: TokensList,
        previewModalHeader: labelIds.patronNoticesFormPreviewHeader,
        selectedCategory: categoryValue,
      });
    });

    describe('AccordionSet', () => {
      it('should render AccordionSet component', () => {
        componentPropsCheck(AccordionSet, testIds.patronNoticesAccordionSet, {
          accordionStatus: {
            'email-template-form': true,
          },
        }, true);
      });

      it('should toggle accordions', () => {
        componentPropsCheck(AccordionSet, testIds.patronNoticesAccordionSet, {
          accordionStatus: {
            'email-template-form': true,
          },
        }, true);

        const accordionSet = screen.getByTestId('accordionSet');
        fireEvent.click(accordionSet);

        componentPropsCheck(AccordionSet, testIds.patronNoticesAccordionSet, {
          accordionStatus: {
            'email-template-form': false,
          },
        }, true);
      });
    });

    it('should render Accordion component', () => {
      componentPropsCheck(Accordion, testIds.patronNoticesEmail, {
        id: 'email-template-form',
        label: labelIds.patronNoticesEmail,
      }, true);
    });

    it('should not render patron notices predefined warning label', () => {
      expect(screen.queryByText(labelIds.patronNoticesPredefinedWarning)).not.toBeInTheDocument();
    });
  });

  describe('when initialValues are passed ', () => {
    const initialValues = {
      id: 'testId',
      name: 'testName',
      active: true,
      predefined: true,
    };

    beforeEach(() => {
      render(
        <PatronNoticeForm
          {...defaultTestProps}
          initialValues={initialValues}
        />
      );
    });

    it('should render patron notice template Pane component', () => {
      componentPropsCheck(Pane, testIds.patronNoticeTemplatePane, {
        paneTitle: initialValues.name,
      }, true);
    });

    it('should render notice active Field component', () => {
      componentPropsCheck(Field, testIds.patronNoticesNoticeActive, {
        defaultChecked: initialValues.active,
      }, true);
    });

    it('should not render patron notices predefined warning label', () => {
      expect(screen.queryByText(labelIds.patronNoticesPredefinedWarning)).toBeVisible();
    });
  });
});
