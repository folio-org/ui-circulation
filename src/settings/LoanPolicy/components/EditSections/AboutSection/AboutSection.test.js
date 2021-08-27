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

TextArea.mockImplementation(jest.fn((props) => <textarea {...props} data-testid="textAreaTestId" />));
TextField.mockImplementation(jest.fn((props) => <input {...props} data-testid="textFieldTestId" />));

describe('AboutSection', () => {
  const labelIdForHeader = 'ui-circulation.settings.loanPolicy.about';
  const labelIdForNameField = 'ui-circulation.settings.loanPolicy.policyName';
  const labelIdForDescriptionField = 'ui-circulation.settings.loanPolicy.policyDescription';

  beforeEach(() => {
    render(<AboutSection />);
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(screen.getByTestId('aboutSection')).toBeTruthy();
  });

  it('should render component header', () => {
    expect(getItemByTestId('aboutSection').getByText(labelIdForHeader)).toBeVisible();
  });

  it('should render "name" field with the correct props', () => {
    expect(screen.getByTestId('nameTestId')).toHaveAttribute('name', 'name');
    expect(screen.getByTestId('nameTestId')).toHaveAttribute('required');
    expect(getItemByTestId('nameTestId').getByText(labelIdForNameField)).toBeVisible();
    expect(getItemByTestId('nameTestId').getByTestId('textFieldTestId')).toBeVisible();
  });

  it('should render "description" field with the correct props', () => {
    expect(screen.getByTestId('descriptionTestId')).toHaveAttribute('name', 'description');
    expect(getItemByTestId('descriptionTestId').getByText(labelIdForDescriptionField)).toBeVisible();
    expect(getItemByTestId('descriptionTestId').getByTestId('textAreaTestId')).toBeVisible();
  });
});
