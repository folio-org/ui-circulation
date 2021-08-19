import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import AboutSection from './AboutSection';

const labelIdForHeader = 'ui-circulation.settings.loanPolicy.about';
const labelIdForNameField = 'ui-circulation.settings.loanPolicy.policyName';
const labelIdForDescriptionField = 'ui-circulation.settings.loanPolicy.policyDescription';

describe('AboutSection', () => {
  beforeEach(() => {
    render(
      <AboutSection
        getValue={jest.fn((value) => value)}
      />,
    );
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(getItemByTestId('aboutSectionTestId')).toBeTruthy();
  });

  it('should render component header', () => {
    expect(getItemByTestId('aboutSectionTestId').getByText(labelIdForHeader)).toBeVisible();
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
});
