import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

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

jest.mock('@folio/stripes/final-form', () => jest.fn(() => (Component) => Component));
jest.mock('./components/EditSections', () => ({
  FinesSection: jest.fn(() => null),
  OverdueAboutSection: jest.fn(() => null),
}));
jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
  Metadata: jest.fn(() => null),
}));

AccordionSet.mockImplementation(jest.fn(({
  children,
  onToggle,
  'data-testid': testId,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={testId}
    onClick={() => onToggle({ id: 'overdueGeneralSection' })}
  >
    {children}
  </div>
)));
ExpandAllButton.mockImplementation(jest.fn(({
  accordionStatus,
  onToggle,
}) => {
  const sectionKeys = Object.keys(accordionStatus);
  const sectionStatus = {};

  sectionKeys.forEach(key => {
    sectionStatus[key] = !accordionStatus[key];
  });

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={() => onToggle(sectionStatus)}
    >
      Expand all button
    </div>
  );
}));
Pane.mockImplementation(jest.fn(({
  children,
  firstMenu,
  footer,
}) => (
  <div>
    {firstMenu}
    {children}
    {footer}
  </div>
)));

describe('FinePolicyForm', () => {
  const testIds = {
    finePolicyForm: 'finePolicyForm',
    generalSectionSet: 'generalSectionSet',
  };
  const labelIds = {
    createEntryLabel: 'ui-circulation.settings.finePolicy.createEntryLabel',
    generalInformation: 'ui-circulation.settings.finePolicy.generalInformation',
    expandAllButton: 'Expand all button',
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
      pristine: true,
      submitting: false,
      onCancel: mockedOnCancel,
    }, {});
  });

  it('should have "ExpandAllButton" in the document', () => {
    expect(screen.getByText(labelIds.expandAllButton)).toBeInTheDocument();
  });

  it('should correctly toggle sections status on "ExpandAllButton" click', () => {
    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      open: true,
    }), {});
    expect(FinesSection).toHaveBeenCalledWith(expect.objectContaining({
      fineSectionOpen: true,
    }), {});

    fireEvent.click(screen.getByText(labelIds.expandAllButton));

    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      open: false,
    }), {});
    expect(FinesSection).toHaveBeenCalledWith(expect.objectContaining({
      fineSectionOpen: false,
    }), {});
  });

  it('"AccordionSet" should correctly handle section status toggle', () => {
    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      open: true,
    }), {});

    fireEvent.click(screen.getByTestId(testIds.generalSectionSet));

    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      open: false,
    }), {});
  });

  it('should execute "Accordion" with passed props', () => {
    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      label: labelIds.generalInformation,
      open: true,
    }), {});
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
      fineSectionOpen: true,
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
