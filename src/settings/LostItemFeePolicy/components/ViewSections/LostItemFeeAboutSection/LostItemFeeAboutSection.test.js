import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import LostItemFeeAboutSection from './LostItemFeeAboutSection';

const labelIdForNameField = 'ui-circulation.settings.lostItemFee.lostItemFeePolicyName';
const labelIdForDescriptionField = 'ui-circulation.settings.lostItemFee.description';

describe('LostItemFeeAboutSection', () => {
  beforeEach(() => {
    render(
      <LostItemFeeAboutSection
        getValue={jest.fn((value) => value)}
      />,
    );
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(getItemByTestId('lostItemFeeAboutSectionTestId')).toBeTruthy();
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
      <LostItemFeeAboutSection
        getValue={jest.fn(() => false)}
      />,
    );

    expect(screen.getByText('-')).toBeVisible();
  });
});
