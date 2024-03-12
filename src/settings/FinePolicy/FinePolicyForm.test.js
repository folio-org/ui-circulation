import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
  Pane,
} from '@folio/stripes/components';

import FinePolicyForm from './FinePolicyForm';
import {
  FinesSection,
  OverdueAboutSection,
} from './components/EditSections';
import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';
import FinePolicy from '../Models/FinePolicy';

jest.mock('./components/EditSections', () => ({
  FinesSection: jest.fn(() => null),
  OverdueAboutSection: jest.fn(() => null),
  ReminderFeesSection: jest.fn(() => null),
}));
jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
  Metadata: jest.fn(() => null),
}));

describe('FinePolicyForm', () => {
  const testIds = {
    finePolicyForm: 'finePolicyForm',
    generalSectionSet: 'generalSectionSet',
  };
  const labelIds = {
    createEntryLabel: 'ui-circulation.settings.finePolicy.createEntryLabel',
    generalInformation: 'ui-circulation.settings.finePolicy.generalInformation',
    expandAllButton: 'Toggle accordion state',
  };
  const mockedStripes = {
    connect: jest.fn(),
  };
  const mockedInitialValues = {
    id: 'testId',
    name: 'testName',
    description: 'testDescription',
    metadata: {
      createdByUserId: 'testUserId',
      createdDate: new Date(),
      updatedByUserId: 'testUserId',
      updatedDate: new Date(),
    },
  };
  const mockedHandleSubmit = jest.fn();
  const mockedOnSave = jest.fn();
  const mockedOnCancel = jest.fn();
  const mockedForm = {
    change: jest.fn(),
    getState: jest.fn(() => ({ values: mockedInitialValues })),
  };
  const policyForTest = new FinePolicy(mockedInitialValues);
  const defaultProps = {
    stripes: mockedStripes,
    pristine: true,
    submitting: false,
    initialValues: mockedInitialValues,
    handleSubmit: mockedHandleSubmit,
    onSave: mockedOnSave,
    onCancel: mockedOnCancel,
    form: mockedForm,
    parentResources: {
      noticeTemplates: { records: [] },
      blockTemplates: { records: [] },
    },
  };

  beforeEach(() => {
    render(
      <FinePolicyForm
        {...defaultProps}
      />
    );
  });

  afterEach(() => {
    Accordion.mockClear();
    AccordionSet.mockClear();
    ExpandAllButton.mockClear();
    Pane.mockClear();
    CancelButton.mockClear();
    FooterPane.mockClear();
    Metadata.mockClear();
    FinesSection.mockClear();
    OverdueAboutSection.mockClear();
  });

  it('should call "handleSubmit" on form submit', () => {
    expect(mockedHandleSubmit).not.toHaveBeenCalled();

    fireEvent.submit(screen.getByTestId(testIds.finePolicyForm));

    expect(mockedHandleSubmit).toHaveBeenCalled();
  });

  it('should execute "CancelButton" with passed props', () => {
    expect(CancelButton).toHaveBeenCalledWith({
      onCancel: mockedOnCancel,
    }, {});
  });

  it('should execute "FooterPane" with passed props', () => {
    expect(FooterPane).toHaveBeenCalledWith({
      isSaveButtonDisabled: true,
      onCancel: mockedOnCancel,
    }, {});
  });

  it('should have "ExpandAllButton" in the document', () => {
    expect(screen.getByText(labelIds.expandAllButton)).toBeInTheDocument();
  });

  it('should execute "Metadata" with passed props', () => {
    expect(Metadata).toHaveBeenCalledWith({
      connect: mockedStripes.connect,
      metadata: policyForTest.metadata,
    }, {});
  });

  it('should execute "OverdueAboutSection"', () => {
    expect(OverdueAboutSection).toHaveBeenCalled();
  });

  it('should execute "FinesSection" with passed props', () => {
    expect(FinesSection).toHaveBeenCalledWith({
      initialValues: mockedInitialValues,
      policy: true,
      change: mockedForm.change,
    }, {});
  });

  describe('when values for policy are passed', () => {
    it('should execute "Pane" with correct title', () => {
      expect(Pane).toHaveBeenCalledWith(expect.objectContaining({
        paneTitle: policyForTest.name,
      }), {});
    });
  });

  describe('when values for policy are not passed', () => {
    beforeEach(() => {
      render(
        <FinePolicyForm
          {...defaultProps}
          form={{
            change: jest.fn(),
            getState: jest.fn(() => ({})),
          }}
        />
      );
    });

    it('should execute "Pane" with correct title', () => {
      expect(Pane).toHaveBeenCalledWith(expect.objectContaining({
        paneTitle: labelIds.createEntryLabel,
      }), {});
    });
  });
});
