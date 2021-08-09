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
    render(<OverdueAboutSection />);
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(screen.getByTestId('OverdueAboutSection')).toBeTruthy();
  });

  it('should render "name" field with the correct props', () => {
    expect(screen.getByTestId('nameTestId')).toHaveAttribute('id', 'input-policy-name');
    expect(screen.getByTestId('nameTestId')).toHaveAttribute('name', 'name');
    expect(screen.getByTestId('nameTestId')).toHaveAttribute('required');
    expect(getItemByTestId('nameTestId').getByRole('textbox')).toBeTruthy();
    expect(getItemByTestId('nameTestId').getByText(labelIdForNameField)).toBeTruthy();
  });

  it('should render "description" field with the correct props', () => {
    expect(screen.getByTestId('descriptionTestId')).toHaveAttribute('id', 'description');
    expect(screen.getByTestId('descriptionTestId')).toHaveAttribute('name', 'description');
    expect(getItemByTestId('descriptionTestId').getByRole('textbox')).toBeTruthy();
    expect(getItemByTestId('descriptionTestId').getByText(labelIdForDescriptionField)).toBeTruthy();
  });
});
