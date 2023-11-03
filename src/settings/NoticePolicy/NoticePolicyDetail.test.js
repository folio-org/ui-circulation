import {
  render,
  screen,
} from '@folio/jest-config-stripes/testing-library/react';

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

  it('should execute "GeneralSection" with passed props', () => {
    const expectedResult = {
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
