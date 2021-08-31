import React from 'react';
import { render, screen, within } from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { Metadata } from '../../../../components';
import GeneralSection from './GeneralSection';

jest.mock('../../../../components', () => ({
  Metadata: jest.fn(() => null),
}));

describe('GeneralSection', () => {
  const mockedMetadata = {
    data: 'mockedMetadata',
  };
  const mockedName = 'mockedPolicyName';
  const mockedDescription = 'mockedPolicyDescription';
  const getItemById = (id) => within(screen.getByTestId(id));
  const generalInformationId = 'ui-circulation.settings.loanPolicy.generalInformation';
  const policyNameId = 'ui-circulation.settings.noticePolicy.policyName';
  const activeLabelId = 'ui-circulation.settings.noticePolicy.active';
  const activeStatusId = 'ui-circulation.settings.loanPolicy.yes';
  const inactiveStatusId = 'ui-circulation.settings.loanPolicy.no';
  const policyDescriptionId = 'ui-circulation.settings.loanPolicy.policyDescription';
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
      expect(screen.getByTestId('generalInformationTestId')).toBeVisible();
      expect(getItemById('generalInformationTestId').getByText(generalInformationId)).toBeVisible();
    });

    it('should pass "isOpen" property correctly', () => {
      expect(screen.getByTestId('generalInformationTestId')).toHaveAttribute('open');
    });

    it('should execute "Metadata" with correct props', () => {
      const expectedResult = {
        connect: jest.fn,
        metadata: mockedMetadata,
      };

      expect(Metadata).toHaveBeenLastCalledWith(expectedResult, {});
    });

    sectionTesting('Name', policyNameId, mockedName);

    sectionTesting('Active', activeLabelId, activeStatusId);

    sectionTesting('Description', policyDescriptionId, mockedDescription);
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
      expect(screen.getByTestId('generalInformationTestId')).not.toHaveAttribute('open');
    });

    sectionTesting('Active', activeLabelId, inactiveStatusId);
  });
});
