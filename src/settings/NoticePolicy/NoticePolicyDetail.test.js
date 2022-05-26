import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  ExpandAllButton,
  AccordionSet,
} from '@folio/stripes/components';

import NoticePolicyDetail from './NoticePolicyDetail';
import {
  GeneralSection,
  LoanNoticesSection,
  RequestNoticesSection,
  FeeFineNoticesSection,
} from './components/DetailSections';
import { NoticePolicy } from '../Models/NoticePolicy';
import { patronNoticeCategoryIds } from '../../constants';

jest.mock('./components/DetailSections', () => ({
  GeneralSection: jest.fn(() => null),
  LoanNoticesSection: jest.fn(() => null),
  RequestNoticesSection: jest.fn(() => null),
  FeeFineNoticesSection: jest.fn(() => null),
}));
jest.mock('./utils/get-templates', () => jest.fn((templates, categoryIds) => (
  {
    templates,
    categoryIds,
  }
)));

ExpandAllButton.mockImplementation(jest.fn(({
  onToggle,
  'data-testid': testId,
}) => {
  const sections = {
    generalNoticePolicy: false,
    viewLoanNotices: false,
    viewRequestNotices: false,
    viewFeeFineNotices: false,
  };
  return (
    <button
      data-testid={testId}
      onClick={() => onToggle(sections)}
      type="button"
    >
      Toggle accordion state
    </button>
  );
}));
AccordionSet.mockImplementation(jest.fn(({
  children,
  onToggle,
  'data-testid': testId,
}) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      data-testid={testId}
      onClick={() => onToggle({ id: 'generalNoticePolicy' })}
    >
      {children}
    </div>
  );
}));

describe('NoticePolicyDetail', () => {
  const testIds = {
    expandAllButton: 'expandAllButton',
    accordionSet: 'accordionSet',
  };
  const mockedInitialValues = {
    active: 'testPolicyActive',
    name: 'testPolicyName',
    description: 'testPolicyDescription',
    metadata: 'testPolicyMetadata',
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
  const mockedPolicy = new NoticePolicy(mockedInitialValues);

  beforeEach(() => {
    render(
      <NoticePolicyDetail
        initialValues={mockedInitialValues}
        stripes={mockedStripes}
        parentResources={mockedParentResources}
      />
    );
  });

  afterEach(() => {
    GeneralSection.mockClear();
    LoanNoticesSection.mockClear();
    RequestNoticesSection.mockClear();
    FeeFineNoticesSection.mockClear();
  });

  it('should have "ExpandAllButton"', () => {
    expect(screen.getByTestId(testIds.expandAllButton)).toBeInTheDocument();
  });

  it('"ExpandAllButton" should correctly change state of accordion sections', () => {
    fireEvent.click(screen.getByTestId(testIds.expandAllButton));

    expect(GeneralSection).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }), {});
    expect(LoanNoticesSection).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }), {});
    expect(RequestNoticesSection).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }), {});
    expect(FeeFineNoticesSection).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }), {});
  });

  it('"AccordionSet" should correctly handle section toggle', () => {
    const accordionSet = screen.getByTestId(testIds.accordionSet);

    fireEvent.click(accordionSet);

    expect(GeneralSection).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: false }), {});

    fireEvent.click(accordionSet);

    expect(GeneralSection).toHaveBeenLastCalledWith(expect.objectContaining({ isOpen: true }), {});
  });

  it('should execute "GeneralSection" with passed props', () => {
    const expectedResult = {
      isOpen: true,
      isPolicyActive: mockedInitialValues.active,
      policyName: mockedInitialValues.name,
      policyDescription: mockedInitialValues.description,
      metadata: mockedInitialValues.metadata,
      connect: mockedStripes.connect,
    };

    expect(GeneralSection).toHaveBeenCalledWith(expectedResult, {});
  });

  it('should execute "LoanNoticesSection" with passed props', () => {
    const expectedResult = {
      isOpen: true,
      policy: mockedPolicy,
      templates: {
        templates: mockedTemplates,
        categoryIds: patronNoticeCategoryIds.LOAN,
      },
    };

    expect(LoanNoticesSection).toHaveBeenCalledWith(expectedResult, {});
  });

  it('should execute "RequestNoticesSection" with passed props', () => {
    const expectedResult = {
      isOpen: true,
      policy: mockedPolicy,
      templates: {
        templates: mockedTemplates,
        categoryIds: patronNoticeCategoryIds.REQUEST,
      },
    };

    expect(RequestNoticesSection).toHaveBeenCalledWith(expectedResult, {});
  });

  it('should execute "FeeFineNoticesSection" with passed props', () => {
    const expectedResult = {
      isOpen: true,
      policy: mockedPolicy,
      templates: {
        templates: mockedTemplates,
        categoryIds: [
          patronNoticeCategoryIds.AUTOMATED_FEE_FINE_CHARGE,
          patronNoticeCategoryIds.AUTOMATED_FEE_FINE_ADJUSTMENT,
        ],
      },
    };

    expect(FeeFineNoticesSection).toHaveBeenCalledWith(expectedResult, {});
  });
});
