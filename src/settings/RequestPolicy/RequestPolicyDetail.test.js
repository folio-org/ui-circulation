import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  AccordionSet,
  List,
} from '@folio/stripes/components';

import buildStripes from '../../../test/jest/__mock__/stripes.mock';
import RequestPolicyDetail, {
  requestTypeFormater,
} from './RequestPolicyDetail';
import { Metadata } from '../components';

jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));

const mockedStripes = buildStripes();

describe('RequestPolicyDetail', () => {
  const mockedCreatedDate = Date.now();
  const labelIds = {
    general: 'ui-circulation.settings.requestPolicy.generalInformation',
    name: 'ui-circulation.settings.requestPolicy.policyName',
    description: 'ui-circulation.settings.requestPolicy.policyDescription',
    types: 'ui-circulation.settings.requestPolicy.policyTypes',
  };
  const testIds = {
    accordionSet: 'accordionSet',
    generalInformation: 'generalInformation',
    expandAllButton: 'expandAllButton',
    itemsList: 'itemsList',
  };
  const mockedInitialValues = {
    name: 'testName',
    description: 'testDescription',
    metadata: {
      createdDate: mockedCreatedDate,
    },
    requestTypes: ['testRequestTypes'],
  };

  afterEach(() => {
    AccordionSet.mockClear();
    Metadata.mockClear();
    List.mockClear();
  });

  describe('with fully passed "initialValues"', () => {
    beforeEach(() => {
      render(
        <RequestPolicyDetail
          initialValues={mockedInitialValues}
          stripes={mockedStripes}
        />
      );
    });

    it('should render "Expand all" button', () => {
      expect(screen.getByText('Toggle accordion state')).toBeVisible();
    });

    it('should render "AccordionSet"', () => {
      expect(screen.getByTestId(testIds.accordionSet)).toBeVisible();
    });

    describe('general information "Accordion"', () => {
      it('should be rendered', () => {
        const element = screen.getByTestId(testIds.generalInformation);

        expect(element).toBeVisible();
        expect(within(element).getByText(labelIds.general)).toBeVisible();
      });

      it('should render "Metadata" with passed props', () => {
        const expectedResult = {
          connect: mockedStripes.connect,
          metadata: mockedInitialValues.metadata,
        };

        expect(Metadata).toHaveBeenLastCalledWith(expectedResult, {});
      });

      it('should contain "name" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalInformation);

        expect(within(element).getByText(labelIds.name)).toBeVisible();
        expect(within(element).getByText(mockedInitialValues.name)).toBeVisible();
      });

      it('should contain "description" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalInformation);

        expect(within(element).getByText(labelIds.description)).toBeVisible();
        expect(within(element).getByText(mockedInitialValues.description)).toBeVisible();
      });

      it('should contain "policy types" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalInformation);

        expect(within(element).getByText(labelIds.types)).toBeVisible();
      });

      it('should execute "List" with passed props', () => {
        const expectedResult = {
          items: mockedInitialValues.requestTypes,
          itemFormatter: requestTypeFormater,
        };

        expect(List).toHaveBeenLastCalledWith(expectedResult, {});
      });
    });
  });

  describe('with empty "initialValues"', () => {
    beforeEach(() => {
      render(
        <RequestPolicyDetail
          stripes={mockedStripes}
        />
      );
    });

    describe('general detail "Accordion"', () => {
      it('should contain "description" section with correct values', () => {
        const element = screen.getByTestId(testIds.generalInformation);

        expect(within(element).getByText(labelIds.description)).toBeVisible();
        expect(within(element).getByText('-')).toBeVisible();
      });
    });
  });

  describe('requestTypeFormater', () => {
    it('should render element with passed props', () => {
      render(requestTypeFormater(mockedInitialValues.requestTypes[0]));

      expect(screen.getByText(mockedInitialValues.requestTypes[0])).toBeVisible();
    });
  });
});
