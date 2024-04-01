import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

import { Field } from 'react-final-form';
import {
  Pane,
  Paneset,
  AccordionSet,
  Accordion,
  ExpandAllButton,
} from '@folio/stripes/components';

import buildStripes from '../../../test/jest/__mock__/stripes.mock';
import { componentPropsCheck } from '../../../test/jest/helpers';
import PatronNoticeForm from './PatronNoticeForm';
import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';
import {
  PatronNoticeAboutSection,
  PatronNoticeEmailSection,
} from './components/EditSections';

const mockPatronNoticeAboutSection = 'PatronNoticeAboutSection';
const mockPatronNoticeEmailSection = 'PatronNoticeEmailSection';

jest.mock('./components/EditSections', () => ({
  PatronNoticeAboutSection: jest.fn(() => 'PatronNoticeAboutSection'),
  PatronNoticeEmailSection: jest.fn(() => 'PatronNoticeEmailSection'),
}));
jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
  Metadata: jest.fn(() => null),
}));
jest.mock('../../constants', () => ({
  patronNoticeCategories: [{
    id: 'testId',
    label: 'testLabel',
  }],
}));
jest.mock('./components/EditSections', () => ({
  PatronNoticeAboutSection: jest.fn(() => 'PatronNoticeAboutSection'),
  PatronNoticeEmailSection: jest.fn(() => 'PatronNoticeEmailSection'),
}));

const testIds = {
  form: 'patronNoticeForm',
  patronNoticePaneset: 'patronNoticePaneset',
  patronNoticeTemplatePane: 'patronNoticeTemplatePane',
  patronNoticeCancelButton: 'patronNoticeCancelButton',
  patronNoticeFooterPane: 'patronNoticeFooterPane',
  patronNoticesSubject: 'patronNoticesSubject'
};
const labelIds = {
  patronNoticesNew: 'ui-circulation.settings.patronNotices.newLabel',
  patronNoticesCloseDialog: 'ui-circulation.settings.patronNotices.closeDialog',
  patronNoticesEmail: 'ui-circulation.settings.patronNotices.email',
  patronNoticesEmailOrPrint: 'ui-circulation.settings.patronNotices.emailOrPrint',
  patronNoticesPredefinedWarning: 'ui-circulation.settings.patronNotices.predefinedWarning',
  patronNoticesGeneralInformation: 'ui-circulation.settings.patronNotices.generalInformation',
};
const testStripes = buildStripes();

describe('PatronNoticeForm', () => {
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

  const testGetState = jest.fn(() => {
    return {
      values: {}
    };
  });
  const testPristineValue = true;
  const testSubmittingValue = false;
  const testHandleSubmit = jest.fn();
  const testOnCancel = jest.fn();
  const mockedStripes = {
    hasPerm: jest.fn(() => true),
    connect: jest.fn(),
  };
  const defaultTestProps = {
    form: {
      getFieldState: testGetFieldState,
      getState: testGetState,
      change: jest.fn(),
    },
    pristine: testPristineValue,
    submitting: testSubmittingValue,
    handleSubmit: testHandleSubmit,
    onCancel: testOnCancel,
    okapi: testOkapi,
    location: {
      search: '',
    },
    stripes : { mockedStripes }
  };

  afterEach(() => {
    Paneset.mockClear();
    Pane.mockClear();
    Field.mockClear();
    AccordionSet.mockClear();
    Accordion.mockClear();
    CancelButton.mockClear();
    FooterPane.mockClear();
    Metadata.mockClear();
    ExpandAllButton.mockClear();
    PatronNoticeAboutSection.mockClear();
    PatronNoticeEmailSection.mockClear();
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

    it('should render FooterPane with correct props', () => {
      componentPropsCheck(FooterPane, testIds.patronNoticeFooterPane, {
        isSaveButtonDisabled: true,
        onCancel: testOnCancel,
      });
    });

    it('should render ExpandAllButton component', () => {
      expect(ExpandAllButton).toHaveBeenCalled();
    });

    it('should render AccordionSet component', () => {
      expect(AccordionSet).toHaveBeenCalled();
    });

    it('should render Accordion component 2 times', () => {
      expect(Accordion).toHaveBeenCalledTimes(2);
    });

    it('should not render patron notices predefined warning label', () => {
      expect(screen.queryByText(labelIds.patronNoticesPredefinedWarning)).not.toBeInTheDocument();
    });

    it('should render "General information" label', () => {
      expect(screen.getByText(labelIds.patronNoticesGeneralInformation)).toBeDefined();
    });

    it('should render "Email or print" label', () => {
      expect(screen.getByText(labelIds.patronNoticesEmailOrPrint)).toBeDefined();
    });

    it('should render PatronNoticeAboutSection', () => {
      expect(screen.getByText(mockPatronNoticeAboutSection)).toBeVisible();
    });

    it('should render PatronNoticeEmailSection', () => {
      expect(screen.getByText(mockPatronNoticeEmailSection)).toBeVisible();
    });
  });

  describe('when initialValues are passed ', () => {
    const initialValues = {
      id: 'testId',
      name: 'testName',
      active: true,
      predefined: true,
      metadata: 'testMetadata',
    };

    beforeEach(() => {
      render(
        <PatronNoticeForm
          {...defaultTestProps}
          initialValues={initialValues}
          stripes={testStripes}
          location={{
            search: 'edit',
          }}
        />
      );
    });

    it('should render patron notice template Pane component', () => {
      componentPropsCheck(Pane, testIds.patronNoticeTemplatePane, {
        paneTitle: initialValues.name,
      }, true);
    });

    it('should not render patron notices predefined warning label', () => {
      expect(screen.queryByText(labelIds.patronNoticesPredefinedWarning)).toBeVisible();
    });

    it('should call Metadata component', () => {
      expect(Metadata).toHaveBeenCalledWith(expect.objectContaining({
        connect: testStripes.connect,
        metadata: initialValues.metadata,
      }), {});
    });
  });

  describe('print only', () => {
    beforeEach(() => {
      testGetState.mockImplementation(() => {
        return {
          values: {
            id: 'testId',
            name: 'testName',
            active: true,
            predefined: true,
            metadata: 'testMetadata',
            additionalProperties: {
              printOnly: true
            }
          }
        };
      });

      render(
        <PatronNoticeForm
          {...defaultTestProps}
          stripes={testStripes}
          location={{
            search: 'edit',
          }}
        />
      );
    });

    it('should not render subject when printOnly is enabled', () => {
      expect(screen.queryByTestId(testIds.patronNoticesSubject)).not.toBeInTheDocument();
    });
  });

  describe('Edit layer without data', () => {
    const props = {
      ...defaultTestProps,
      location: {
        search: 'edit',
      },
    };

    beforeEach(() => {
      render(<PatronNoticeForm {...props} />);
    });

    it('should not return view', () => {
      expect(screen.queryByTestId(testIds.form)).not.toBeInTheDocument();
    });
  });

  describe('when form value was changed', () => {
    const defaultProps = {
      ...defaultTestProps,
      pristine: false,
      submitting: false,
    };

    beforeEach(() => {
      render(
        <PatronNoticeForm
          {...defaultProps}
        />
      );
    });

    it('should render FooterPane with correct props', () => {
      componentPropsCheck(FooterPane, testIds.patronNoticeFooterPane, {
        isSaveButtonDisabled: false,
        onCancel: testOnCancel,
      });
    });
  });
});
