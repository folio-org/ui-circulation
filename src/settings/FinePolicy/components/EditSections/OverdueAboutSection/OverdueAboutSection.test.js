import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import OverdueAboutSection from './OverdueAboutSection';

const labelIds = {
  labelIdForNameField: 'ui-circulation.settings.finePolicy.overdueFinePolicyName',
  labelIdForDescriptionField: 'ui-circulation.settings.finePolicy.description',
};
const testIds = {
  overdueAboutSection: 'overdueAboutSection',
  nameTestId: 'nameTestId',
  descriptionTestId: 'descriptionTestId',
};

describe('OverdueAboutSection', () => {
  beforeEach(() => {
    render(<OverdueAboutSection />);
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(screen.getByTestId(testIds.overdueAboutSection)).toBeTruthy();
  });

  it('should render "name" field with the correct props', () => {
    expect(screen.getByTestId(testIds.nameTestId)).toHaveAttribute('id', 'input-policy-name');
    expect(screen.getByTestId(testIds.nameTestId)).toHaveAttribute('name', 'name');
    expect(screen.getByTestId(testIds.nameTestId)).toHaveAttribute('required');
    expect(getItemByTestId(testIds.nameTestId).getByRole('textbox')).toBeTruthy();
    expect(getItemByTestId(testIds.nameTestId).getByText(labelIds.labelIdForNameField)).toBeTruthy();
  });

  it('should render "description" field with the correct props', () => {
    expect(screen.getByTestId(testIds.descriptionTestId)).toHaveAttribute('id', 'description');
    expect(screen.getByTestId(testIds.descriptionTestId)).toHaveAttribute('name', 'description');
    expect(getItemByTestId(testIds.descriptionTestId).getByRole('textbox')).toBeTruthy();
    expect(getItemByTestId(testIds.descriptionTestId).getByText(labelIds.labelIdForDescriptionField)).toBeTruthy();
  });
});
