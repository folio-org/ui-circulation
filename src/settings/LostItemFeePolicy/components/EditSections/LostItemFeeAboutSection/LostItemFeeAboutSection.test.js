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

const testIds = {
  textAreaTestId: 'textAreaTestId',
  textFieldTestId: 'textextFieldTestIdtAreaTestId',
  nameTestId: 'nameTestId',
  descriptionTestId: 'descriptionTestId',
  lostItemFeeAboutSectionTestId: 'lostItemFeeAboutSectionTestId',
};
const labelIds = {
  labelIdForNameField: 'ui-circulation.settings.lostItemFee.lostItemFeePolicyName',
  labelIdForDescriptionField: 'ui-circulation.settings.lostItemFee.description',
};

TextArea.mockImplementation(jest.fn((props) => <textarea {...props} data-testid={testIds.textAreaTestId} />));
TextField.mockImplementation(jest.fn((props) => <input {...props} data-testid={testIds.textFieldTestId} />));

describe('LostItemFeeAboutSection', () => {
  beforeEach(() => {
    render(<LostItemFeeAboutSection />);
  });

  const getItemByTestId = (id) => within(screen.getByTestId(id));

  it('should render component', () => {
    expect(screen.getByTestId(testIds.lostItemFeeAboutSectionTestId)).toBeTruthy();
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
