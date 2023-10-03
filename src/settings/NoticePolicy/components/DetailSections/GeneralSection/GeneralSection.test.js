import { render, screen, within } from '@folio/jest-config-stripes/testing-library/react';

import { Metadata } from '../../../../components';
import GeneralSection from './GeneralSection';

jest.mock('../../../../components', () => ({
  Metadata: jest.fn(() => null),
}));

describe('GeneralSection', () => {
  const testIds = {
    generalInformationTestId: 'generalInformationTestId',
  };
  const labelIds = {
    generalInformationId: 'ui-circulation.settings.loanPolicy.generalInformation',
    policyNameId: 'ui-circulation.settings.noticePolicy.policyName',
    activeLabelId: 'ui-circulation.settings.noticePolicy.active',
    activeStatusId: 'ui-circulation.settings.loanPolicy.yes',
    inactiveStatusId: 'ui-circulation.settings.loanPolicy.no',
    policyDescriptionId: 'ui-circulation.settings.loanPolicy.policyDescription',
  };
  const mockedMetadata = {
    data: 'mockedMetadata',
  };
  const mockedName = 'mockedPolicyName';
  const mockedDescription = 'mockedPolicyDescription';
  const getItemById = (id) => within(screen.getByTestId(id));
  const sectionTesting = (policy, labelId, contentValue) => {
    it(`should render "policy ${policy}" section correctly`, () => {
      expect(screen.getByTestId(`policy${policy}TestId`)).toBeVisible();
      expect(getItemById(`policy${policy}TestId`).getByText(labelId)).toBeVisible();
      expect(getItemById(`policy${policy}TestId`).getByText(contentValue)).toBeVisible();
    });
  };

  describe('with positive props', () => {
    beforeEach(() => {
      render(
        <GeneralSection
          isOpen
          isPolicyActive
          policyName={mockedName}
          policyDescription={mockedDescription}
          connect={jest.fn}
          metadata={mockedMetadata}
        />
      );
    });

    it('should render general information section correctly', () => {
      expect(screen.getByTestId(testIds.generalInformationTestId)).toBeVisible();
      expect(getItemById(testIds.generalInformationTestId).getByText(labelIds.generalInformationId)).toBeVisible();
    });

    it('should pass "isOpen" property correctly', () => {
      expect(screen.getByTestId(testIds.generalInformationTestId)).toHaveAttribute('open');
    });

    it('should execute "Metadata" with correct props', () => {
      const expectedResult = {
        connect: jest.fn,
        metadata: mockedMetadata,
      };

      expect(Metadata).toHaveBeenLastCalledWith(expectedResult, {});
    });

    sectionTesting('Name', labelIds.policyNameId, mockedName);

    sectionTesting('Active', labelIds.activeLabelId, labelIds.activeStatusId);

    sectionTesting('Description', labelIds.policyDescriptionId, mockedDescription);
  });

  describe('with negative props', () => {
    beforeEach(() => {
      render(
        <GeneralSection
          isOpen={false}
          policyName={mockedName}
          policyDescription={mockedDescription}
          connect={jest.fn}
          metadata={mockedMetadata}
        />
      );
    });

    it('should pass "isOpen" property correctly', () => {
      expect(screen.getByTestId(testIds.generalInformationTestId)).not.toHaveAttribute('open');
    });

    sectionTesting('Active', labelIds.activeLabelId, labelIds.inactiveStatusId);
  });
});
