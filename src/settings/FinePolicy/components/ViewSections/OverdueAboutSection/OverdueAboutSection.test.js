import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import OverdueAboutSection from './OverdueAboutSection';

const labelIdForNameField = 'ui-circulation.settings.finePolicy.overdueFinePolicyName';
const labelIdForDescriptionField = 'ui-circulation.settings.finePolicy.description';

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
    expect(screen.getByTestId('overdueAboutSectionTestId')).toBeTruthy();
  });

  it('should render label of "name" field', () => {
    expect(getItemByTestId('nameTestId').getByText(labelIdForNameField)).toBeVisible();
  });

  it('should render value of "name" field', () => {
    expect(getItemByTestId('nameTestId').getByText('name')).toBeVisible();
  });

  it('should render label of "description" field', () => {
    expect(getItemByTestId('descriptionTestId').getByText(labelIdForDescriptionField)).toBeVisible();
  });

  it('should render value of "description" field', () => {
    expect(getItemByTestId('descriptionTestId').getByText('description')).toBeVisible();
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
