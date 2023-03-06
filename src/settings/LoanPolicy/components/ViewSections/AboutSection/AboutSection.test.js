import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import AboutSection from './AboutSection';

const testIds = {
  aboutSectionTestId: 'aboutSectionTestId',
  nameTestId: 'nameTestId',
  descriptionTestId: 'descriptionTestId',
};
const labelIds = {
  labelIdForHeader: 'ui-circulation.settings.loanPolicy.about',
  labelIdForNameField: 'ui-circulation.settings.loanPolicy.policyName',
  labelIdForDescriptionField: 'ui-circulation.settings.loanPolicy.policyDescription',
};

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
    expect(getItemByTestId(testIds.aboutSectionTestId)).toBeTruthy();
  });

  it('should render component header', () => {
    expect(getItemByTestId(testIds.aboutSectionTestId).getByText(labelIds.labelIdForHeader)).toBeVisible();
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
});
