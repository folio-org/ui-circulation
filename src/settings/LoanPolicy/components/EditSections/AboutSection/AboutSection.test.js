import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import {
  TextArea,
  TextField,
} from '@folio/stripes/components';
import AboutSection from './AboutSection';

const testIds = {
  textAreaTestId: 'textAreaTestId',
  textFieldTestId: 'textFieldTestId',
  aboutSection: 'aboutSection',
  nameTestId: 'nameTestId',
  descriptionTestId: 'descriptionTestId',
};
const labelIds = {
  labelIdForHeader: 'ui-circulation.settings.loanPolicy.about',
  labelIdForNameField: 'ui-circulation.settings.loanPolicy.policyName',
  labelIdForDescriptionField: 'ui-circulation.settings.loanPolicy.policyDescription',
};

TextArea.mockImplementation(jest.fn((props) => <textarea {...props} data-testid={testIds.textAreaTestId} />));
TextField.mockImplementation(jest.fn((props) => <input {...props} data-testid={testIds.textFieldTestId} />));

describe('AboutSection', () => {
  beforeEach(() => {
    render(<AboutSection />);
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(screen.getByTestId(testIds.aboutSection)).toBeTruthy();
  });

  it('should render component header', () => {
    expect(getItemByTestId(testIds.aboutSection).getByText(labelIds.labelIdForHeader)).toBeVisible();
  });

  it('should render "name" field with the correct props', () => {
    expect(screen.getByTestId(testIds.nameTestId)).toHaveAttribute('name', 'name');
    expect(screen.getByTestId(testIds.nameTestId)).toHaveAttribute('required');
    expect(getItemByTestId(testIds.nameTestId).getByText(labelIds.labelIdForNameField)).toBeVisible();
    expect(getItemByTestId(testIds.nameTestId).getByTestId(testIds.textFieldTestId)).toBeVisible();
  });

  it('should render "description" field with the correct props', () => {
    expect(screen.getByTestId(testIds.descriptionTestId)).toHaveAttribute('name', 'description');
    expect(getItemByTestId(testIds.descriptionTestId).getByText(labelIds.labelIdForDescriptionField)).toBeVisible();
    expect(getItemByTestId(testIds.descriptionTestId).getByTestId(testIds.textAreaTestId)).toBeVisible();
  });
});
