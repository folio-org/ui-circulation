import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import StaffSlipAboutSection from './StaffSlipAboutSection';

describe('StaffSlipAboutSectionEdit', () => {
  const testStaffSlip = {
    name: 'testNameValue',
    description: 'testDescriptionValue',
  };

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  const labelIds = {
    staffSlipsName: 'ui-circulation.settings.staffSlips.name',
    staffSlipsDescription: 'ui-circulation.settings.staffSlips.description',
  };

  beforeEach(() => {
    render(
      <StaffSlipAboutSection
        initialValues={testStaffSlip}
        disabled={false}
      />,
    );
  });

  it('should render component', () => {
    expect(getItemByTestId('StaffSlipAboutSectionEditTestId')).toBeTruthy();
  });

  it('should render label of "name" field', () => {
    expect(getItemByTestId('nameTestId').getByText(labelIds.staffSlipsName)).toBeVisible();
  });

  it('should render value of "name" field', () => {
    expect(getItemByTestId('nameTestId').getByText('testNameValue')).toBeVisible();
  });

  it('should render label of "description" field', () => {
    expect(getItemByTestId('descriptionTestId').getByText(labelIds.staffSlipsDescription)).toBeVisible();
  });
});
