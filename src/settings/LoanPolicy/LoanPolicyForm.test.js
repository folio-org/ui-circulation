import {
  render,
  screen,
  within,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Accordion,
  ExpandAllButton,
  Pane,
} from '@folio/stripes/components';

import LoanPolicyForm from './LoanPolicyForm';
import {
  AboutSection,
  LoansSection,
  RenewalsSection,
  RequestManagementSection,
} from './components/EditSections';
import {
  CancelButton,
  FooterPane,
  Metadata,
} from '../components';
import LoanPolicy from '../Models/LoanPolicy';

jest.mock('./components/EditSections', () => ({
  AboutSection: jest.fn(() => null),
  LoansSection: jest.fn(({
    'data-testid': testId,
    schedules,
  }) => (
    <div data-testid={testId}>
      {schedules}
    </div>
  )),
  RenewalsSection: jest.fn(({
    'data-testid': testId,
    schedules,
  }) => (
    <div data-testid={testId}>
      {schedules}
    </div>
  )),
  RequestManagementSection: jest.fn(({
    'data-testid': testId,
    accordionOnToggle,
  }) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      data-testid={testId}
      onClick={() => accordionOnToggle({ id: 'recallsSection' })}
    />
  )),
}));
jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
  Metadata: jest.fn(() => null),
}));

Accordion.mockImplementation(jest.fn(({
  'data-testid': testId,
  children,
  onToggle,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={testId}
    onClick={() => onToggle({ id: 'generalLoanPolicyForm' })}
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

describe('LoanPolicyForm', () => {
  const testIds = {
    loanPolicyForm: 'loanPolicyForm',
    mainAccordion: 'mainAccordion',
    loanSection: 'loanSection',
    renewalsSection: 'renewalsSection',
    requestManagementSection: 'requestManagementSection',
  };
  const labelIds = {
    selectSchedule: 'ui-circulation.settings.loanPolicy.selectSchedule',
    createEntryLabel: 'ui-circulation.settings.loanPolicy.createEntryLabel',
    generalInformation: 'ui-circulation.settings.loanPolicy.generalInformation',
    expandAllButton: 'Expand all button',
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
  const mockedForm = {
    change: jest.fn(),
    getState: jest.fn(() => ({ values: mockedInitialValues })),
  };
  const mockedStripes = {
    connect: jest.fn(),
  };
  const mockedParentResources = {
    fixedDueDateSchedules: {
      records:[
        {
          id: 'secondTestId',
          name: 'secondTestName',
        },
        {
          id: 'firstTestId',
          name: 'firstTestName',
        },
      ],
    },
  };
  const mockedHandleSubmit = jest.fn();
  const mockedOnSave = jest.fn();
  const mockedOnCancel = jest.fn();
  const defaultProps = {
    form: mockedForm,
    stripes: mockedStripes,
    pristine: true,
    submitting: false,
    parentResources: mockedParentResources,
    initialValues: mockedInitialValues,
    handleSubmit: mockedHandleSubmit,
    onSave: mockedOnSave,
    onCancel: mockedOnCancel,
  };
  const policyForTest = new LoanPolicy(mockedInitialValues);

  beforeEach(() => {
    render(
      <LoanPolicyForm
        {...defaultProps}
      />
    );
  });

  afterEach(() => {
    Accordion.mockClear();
    ExpandAllButton.mockClear();
    Pane.mockClear();
    AboutSection.mockClear();
    LoansSection.mockClear();
    RenewalsSection.mockClear();
    RequestManagementSection.mockClear();
    CancelButton.mockClear();
    FooterPane.mockClear();
    Metadata.mockClear();
  });

  it('should call "handleSubmit" on form submit', () => {
    expect(mockedHandleSubmit).not.toHaveBeenCalled();

    fireEvent.submit(screen.getByTestId(testIds.loanPolicyForm));

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
    expect(RequestManagementSection).toHaveBeenCalledWith(expect.objectContaining({
      holdsSectionOpen: true,
      recallsSectionOpen: true,
    }), {});

    fireEvent.click(screen.getByText(labelIds.expandAllButton));

    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      open: false,
    }), {});
    expect(RequestManagementSection).toHaveBeenCalledWith(expect.objectContaining({
      holdsSectionOpen: false,
      recallsSectionOpen: false,
    }), {});
  });

  it('"Accordion" should have correct label', () => {
    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      label: labelIds.generalInformation,
    }), {});
  });

  it('"Accordion" should correctly handle section status toggle', () => {
    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      open: true,
    }), {});

    fireEvent.click(screen.getByTestId(testIds.mainAccordion));

    expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
      open: false,
    }), {});
  });

  it('should execute "Metadata" with passed props', () => {
    expect(Metadata).toHaveBeenCalledWith({
      connect: mockedStripes.connect,
      metadata: policyForTest.metadata,
    }, {});
  });

  it('should execute "AboutSection"', () => {
    expect(AboutSection).toHaveBeenCalled();
  });

  it('should execute "LoansSection" with passed props', () => {
    expect(LoansSection).toHaveBeenCalledWith(expect.objectContaining({
      policy: policyForTest,
      change: mockedForm.change,
    }), {});
  });

  it('should execute "RenewalsSection" with passed props', () => {
    expect(RenewalsSection).toHaveBeenCalledWith(expect.objectContaining({
      policy: policyForTest,
      change: mockedForm.change,
    }), {});
  });

  it('should correctly handle section toggle in "RequestManagementSection" component', () => {
    expect(RequestManagementSection).toHaveBeenCalledWith(expect.objectContaining({
      recallsSectionOpen: true,
    }), {});

    fireEvent.click(screen.getByTestId(testIds.requestManagementSection));

    expect(RequestManagementSection).toHaveBeenCalledWith(expect.objectContaining({
      recallsSectionOpen: false,
    }), {});
  });

  it('should execute "RequestManagementSection" with passed props', () => {
    expect(RequestManagementSection).toHaveBeenCalledWith(expect.objectContaining({
      policy: policyForTest,
      holdsSectionOpen: true,
      change: mockedForm.change,
      recallsSectionOpen: true,
    }), {});
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
        <LoanPolicyForm
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

  describe('schedules', () => {
    const expectedOptionsResult = [
      {
        value: '',
        name: labelIds.selectSchedule,
      },
      {
        value: 'firstTestId',
        name: 'firstTestName',
      },
      {
        value: 'secondTestId',
        name: 'secondTestName',
      },
    ];
    const schedulesTest = (testId) => {
      const options = within(screen.getByTestId(testId)).getAllByRole('option');

      options.forEach((option, index) => {
        expect(option).toHaveAttribute('value', expectedOptionsResult[index].value);
        expect(within(option).getByText(expectedOptionsResult[index].name)).toBeInTheDocument();
      });
    };

    it('should correctly sort and pass schedules in "LoansSection" component', () => {
      schedulesTest(testIds.loanSection);
    });

    it('should correctly sort and pass schedules in "RenewalsSection" component', () => {
      schedulesTest(testIds.renewalsSection);
    });
  });
});
