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
import LostItemFeeAboutSection from './LostItemFeeAboutSection';

TextArea.mockImplementation(jest.fn((props) => <textarea {...props} data-testid="textAreaTestId" />));
TextField.mockImplementation(jest.fn((props) => <input {...props} data-testid="textFieldTestId" />));

describe('LostItemFeeAboutSection', () => {
  const labelIdForNameField = 'ui-circulation.settings.lostItemFee.lostItemFeePolicyName';
  const labelIdForDescriptionField = 'ui-circulation.settings.lostItemFee.description';

  beforeEach(() => {
    render(<LostItemFeeAboutSection />);
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(screen.getByTestId('lostItemFeeAboutSectionTestId')).toBeTruthy();
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
