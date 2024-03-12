import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  ExpandAllButton,
  AccordionSet,
} from '@folio/stripes/components';

import NoticePolicyForm from './NoticePolicyForm';
import {
  GeneralSection,
  LoanNoticesSection,
  FeeFineNoticesSection,
  RequestNoticesSection,
} from './components';
import {
  FooterPane,
  CancelButton,
} from '../components';
import { NoticePolicy } from '../Models/NoticePolicy';
import { patronNoticeCategoryIds } from '../../constants';

jest.mock('./components', () => ({
  GeneralSection: jest.fn(() => null),
  LoanNoticesSection: jest.fn(() => null),
  FeeFineNoticesSection: jest.fn(() => null),
  RequestNoticesSection: jest.fn(() => null),
}));
jest.mock('../components', () => ({
  FooterPane: jest.fn(() => null),
  CancelButton: jest.fn(() => null),
}));
jest.mock('./utils/get-templates', () => jest.fn((templates, categoryIds) => (
  {
    templates,
    categoryIds,
  }
)));

ExpandAllButton.mockImplementation(jest.fn(({ onToggle, ...rest }) => {
  const sections = {
    general: false,
    editLoanNotices: false,
    editRequestNotices: false,
    editFeeFineNotices: false,
  };

  return (
    <button
      onClick={() => onToggle(sections)}
      type="button"
      {...rest}
    >
      Expand all button
    </button>
  );
}));
AccordionSet.mockImplementation(jest.fn(({ children, onToggle, ...rest }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => onToggle({ id: 'general' })}
      {...rest}
    >
      {children}
    </div>
  );
}));

describe('NoticePolicyForm', () => {
  const testIds = {
    form: 'form',
    accordionSet: 'accordionSet',
  };
  const labelIds = {
    createEntryLabel: 'ui-circulation.settings.noticePolicy.createEntryLabel',
    expandAllButton: 'Expand all button',
  };
  const mockedValuesForPolicy = {
    id: 'testPolicyId',
    active: 'testPolicyActive',
    name: 'testPolicyName',
    description: 'testPolicyDescription',
    metadata: 'testPolicyMetadata',
  };
  const mockedForm = {
    getState: jest.fn(() => ({ values: mockedValuesForPolicy })),
  };
  const mockedStripes = {
    connect: jest.fn(),
  };
  const mockedTemplates = ['testTemplate'];
  const mockedParentResources = {
    templates: {
      records: mockedTemplates,
    },
  };
  const mockedOnSave = jest.fn();
  const mockedOnCancel = jest.fn();
  const mockedHandleSubmit = jest.fn();
  const mockedPolicy = new NoticePolicy(mockedValuesForPolicy);
  const defaultProps = {
    form: mockedForm,
    stripes: mockedStripes,
    pristine: true,
    submitting: false,
    parentResources: mockedParentResources,
    onSave: mockedOnSave,
    onCancel: mockedOnCancel,
    handleSubmit: mockedHandleSubmit,
  };

  beforeEach(() => {
    render(
      <NoticePolicyForm
        {...defaultProps}
      />
    );
  });

  afterEach(() => {
    GeneralSection.mockClear();
    LoanNoticesSection.mockClear();
    RequestNoticesSection.mockClear();
    FeeFineNoticesSection.mockClear();
    CancelButton.mockClear();
    FooterPane.mockClear();
  });

  it('should correctly handle form submit', () => {
    expect(mockedHandleSubmit).not.toHaveBeenCalled();

    fireEvent.submit(screen.getByTestId(testIds.form));

    expect(mockedHandleSubmit).toHaveBeenCalled();
  });

  it('should execute "CancelButton" with passed props', () => {
    expect(CancelButton).toHaveBeenCalledWith({
      onCancel: mockedOnCancel,
    }, {});
  });

  it('should execute "FooterPane" with passed props', () => {
    expect(FooterPane).toHaveBeenCalledWith({
      isSaveButtonDisabled: true,
      onCancel: mockedOnCancel,
    }, {});
  });

  it('should have "ExpandAllButton" in the document', () => {
    expect(screen.getByText(labelIds.expandAllButton)).toBeInTheDocument();
  });

  it('should execute "GeneralSection" with passed props', () => {
    expect(GeneralSection).toHaveBeenCalledWith({
      metadata: mockedPolicy.metadata,
      connect: mockedStripes.connect,
      isPolicyActive: mockedPolicy.active,
    }, {});
  });

  it('should execute "LoanNoticesSection" with passed props', () => {
    expect(LoanNoticesSection).toHaveBeenCalledWith({
      policy: mockedPolicy,
      templates: {
        templates: mockedTemplates,
        categoryIds: [patronNoticeCategoryIds.LOAN],
      },
    }, {});
  });

  it('should execute "RequestNoticesSection" with passed props', () => {
    expect(RequestNoticesSection).toHaveBeenCalledWith({
      policy: mockedPolicy,
      templates: {
        templates: mockedTemplates,
        categoryIds: [patronNoticeCategoryIds.REQUEST],
      },
    }, {});
  });

  it('should execute "FeeFineNoticesSection" with passed props', () => {
    expect(FeeFineNoticesSection).toHaveBeenCalledWith({
      policy: mockedPolicy,
      templates: {
        templates: mockedTemplates,
        categoryIds: [
          patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
          patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        ],
      },
    }, {});
  });

  describe('if values for policy are present', () => {
    it('should render correcty pane title', () => {
      expect(screen.getByText(mockedPolicy.name)).toBeInTheDocument();
    });
  });

  describe('if values for policy are absent', () => {
    beforeEach(() => {
      render(
        <NoticePolicyForm
          {...defaultProps}
          form={{
            getState: jest.fn(() => ({})),
          }}
        />
      );
    });

    it('should render correctly pane title', () => {
      expect(screen.getByText(labelIds.createEntryLabel)).toBeInTheDocument();
    });
  });
});
