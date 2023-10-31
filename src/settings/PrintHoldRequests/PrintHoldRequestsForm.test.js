import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Field,
} from 'react-final-form';

import PrintHoldRequestsForm from './PrintHoldRequestsForm';

const testIds = {
  printHoldRequestsFormSubmit: 'printHoldRequestsFormSubmit',
  printHoldRequestsCheckbox: 'printHoldRequestsCheckbox',
};
const labelIds = {
  printHoldRequestsCheckboxLabel: 'ui-circulation.settings.PrintHoldRequests.allow',
};

describe('PrintHoldRequestsForm', () => {
  const mockedHandleSubmit = jest.fn();
  const label = 'pane title label';
  const defaultProps = {
    handleSubmit: mockedHandleSubmit,
    label,
    pristine: true,
    submitting: false,
  };

  beforeEach(() => {
    render(
      <PrintHoldRequestsForm {...defaultProps} />
    );
  });

  it('should render pane title', () => {
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render print hold requests checkbox', () => {
    expect(screen.getByTestId(testIds.printHoldRequestsCheckbox)).toBeInTheDocument();
  });

  it('should execute "Field" with correct props', () => {
    expect(Field).toHaveBeenCalledWith(expect.objectContaining({
      'data-testid': testIds.printHoldRequestsCheckbox,
      label: labelIds.printHoldRequestsCheckboxLabel,
      name: 'printHoldRequestsEnabled',
      type: 'checkbox'
    }), {});
  });

  it('should call "handleSubmit" on form submit', () => {
    expect(mockedHandleSubmit).not.toHaveBeenCalled();

    fireEvent.submit(screen.getByTestId(testIds.printHoldRequestsFormSubmit));

    expect(mockedHandleSubmit).toHaveBeenCalled();
  });
});
