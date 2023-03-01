import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import OverdueAboutSection from './OverdueAboutSection';

const testIds = {
  nameTestId: 'nameTestId',
  descriptionTestId: 'descriptionTestId',
  overdueAboutSectionTestId: 'overdueAboutSectionTestId',
};
const labelIds = {
  labelIdForNameField: 'ui-circulation.settings.finePolicy.overdueFinePolicyName',
  labelIdForDescriptionField: 'ui-circulation.settings.finePolicy.description',
};

describe('OverdueAboutSection', () => {
  beforeEach(() => {
    render(
      <OverdueAboutSection
        getValue={jest.fn((value) => value)}
      />,
    );
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(screen.getByTestId(testIds.overdueAboutSectionTestId)).toBeTruthy();
  });

  it('should render label of "name" field', () => {
    expect(getItemByTestId(testIds.nameTestId).getByText(labelIds.labelIdForNameField)).toBeVisible();
  });

  it('should render value of "name" field', () => {
    expect(getItemByTestId(testIds.nameTestId).getByText('name')).toBeVisible();
  });

  it('should render label of "description" field', () => {
    expect(getItemByTestId(testIds.descriptionTestId).getByText(labelIds.labelIdForDescriptionField)).toBeVisible();
  });

  it('should render value of "description" field', () => {
    expect(getItemByTestId(testIds.descriptionTestId).getByText('description')).toBeVisible();
  });

  it('should render dash if description has not found', () => {
    render(
      <OverdueAboutSection
        getValue={jest.fn(() => false)}
      />,
    );

    expect(screen.getByText('-')).toBeVisible();
  });
});
