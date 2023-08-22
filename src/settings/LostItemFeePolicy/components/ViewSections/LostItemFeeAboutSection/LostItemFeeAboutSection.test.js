import React from 'react';
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import LostItemFeeAboutSection from './LostItemFeeAboutSection';

const testIds = {
  lostItemFeeAboutSectionTestId: 'lostItemFeeAboutSectionTestId',
  nameTestId: 'nameTestId',
  descriptionTestId: 'descriptionTestId',
};
const labelIds = {
  labelIdForNameField: 'ui-circulation.settings.lostItemFee.lostItemFeePolicyName',
  labelIdForDescriptionField: 'ui-circulation.settings.lostItemFee.description',
};

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
    expect(getItemByTestId(testIds.lostItemFeeAboutSectionTestId)).toBeTruthy();
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
      <LostItemFeeAboutSection
        getValue={jest.fn(() => false)}
      />,
    );

    expect(screen.getByText('-')).toBeVisible();
  });
});
