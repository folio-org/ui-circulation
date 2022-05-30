import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  Accordion,
  AccordionSet,
  Button,
  ConfirmationModal,
  ExpandAllButton,
  IconButton,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';
import SchedulesList from './components/EditSections/components/SchedulesList';

ExpandAllButton.mockImplementation(({ onToggle, ...rest }) => (
  <button
    type="button"
    onClick={() => onToggle({ generalFixedDueDate: false, schedule: false })}
    {...rest}
  >
    ExpandAllButton
  </button>
));

AccordionSet.mockImplementation(({
  children,
  onToggle,
  ...rest
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid="accordionSet"
    onClick={() => onToggle({ id: 'generalFixedDueDate' })}
    {...rest}
  >
    {children}
  </div>
));

const name = 'test-name';

const messageIds = {
  about: 'ui-circulation.settings.fDDSform.about',
  editLabel: 'ui-circulation.settings.fDDS.editLabel',
  newFixDDSchedule: 'ui-circulation.settings.fDDSform.newFixDDSchedule',
  uniqueName: 'ui-circulation.settings.fDDS.validate.uniqueName',
  closeLabel: 'ui-circulation.settings.fDDSform.closeLabel',
  cancel: 'ui-circulation.settings.fDDSform.cancel',
  delete: 'stripes-core.button.delete',
  saveAndClose: 'ui-circulation.settings.common.saveAndClose',
  schedule: 'ui-circulation.settings.fDDSform.schedule',
  name: 'ui-circulation.settings.fDDSform.name',
  description: 'ui-circulation.settings.fDDSform.description',
  deleteLabel: 'ui-circulation.settings.fDDSform.delete',
  deleteHeader: 'ui-circulation.settings.fDDSform.deleteHeader',
  deleteMessage: 'ui-circulation.settings.fDDSform.deleteMessage',
};

const defaultState = {
  confirmDelete: false,
  sections: {
    generalFixedDueDate: true,
    schedule: true,
  },
};

const okapi = {
  url: 'test-okapi-url',
  tenant: 'test-okapi-tenant',
  token: 'test-okapi-token',
};

const stripes = {
  connect: jest.fn(data => data),
  timezone: 'timezone',
};

const defaultProps = {
  initialValues: {},
  pristine: true,
  submitting: true,
  onCancel: jest.fn(),
  onRemove: jest.fn(),
  handleSubmit: jest.fn(),
  stripes,
  okapi,
};

describe('FixedDueDateScheduleForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial render with default props', () => {
    let container;
    const fieldCallOrder = {
      name: 1,
      description: 2,
    };
    const accordionCallOrder = {
      general: 1,
      schedule: 2,
    };
    const expandAllButtonCallOrder = {
      render: 1,
      update: 2,
    };
    const buttonCallOrder = {
      cancel: 1,
      save: 2,
    };
    const accordionSetCallOrder = {
      render: 1,
      update: 2,
    };

    beforeEach(() => {
      container = render(
        <FixedDueDateScheduleForm {...defaultProps} />
      );
    });

    it('"IconButton" should be rendered with correct props', () => {
      const expectedProps = {
        'aria-label': [messageIds.closeLabel],
        icon: 'times',
        iconClassName: 'closeIcon',
        onClick: defaultProps.onCancel,
      };

      expect(IconButton).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('"onCancel" should be called after clicking on close icon', () => {
      fireEvent.click(container.getByTestId('close-icon'));

      expect(defaultProps.onCancel).toBeCalled();
    });

    it('"Pane" component should have correct title', () => {
      expect(container.getByText(messageIds.newFixDDSchedule)).toBeInTheDocument();
    });

    it('"Field" for name should be called with correct props', () => {
      const expectedProps = {
        id: 'input_schedule_name',
        component: TextField,
        name: 'name',
        required: true,
        autoFocus: true,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrder.name, expect.objectContaining(expectedProps), {});
    });

    it('Label of name "Field" should be rendered', () => {
      expect(container.getByText(messageIds.name)).toBeInTheDocument();
    });

    it('"Field" for description should be called with correct props', () => {
      const expectedProps = {
        component: TextArea,
        name: 'description',
        fullWidth: true,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrder.description, expect.objectContaining(expectedProps), {});
    });

    it('"Label of description "Field" should be rendered', () => {
      expect(container.getByText(messageIds.description)).toBeInTheDocument();
    });

    it('"FieldArray" should be called with correct props', () => {
      const expectedProps = {
        timezone: stripes.timezone,
        component: SchedulesList,
        name: 'schedules',
      };

      expect(FieldArray).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('"General" accordion should be rendered with correct props', () => {
      const expectedProps = {
        open: defaultState.sections.generalFixedDueDate,
        id: 'generalFixedDueDate',
      };
      expect(Accordion)
        .toHaveBeenNthCalledWith(accordionCallOrder.general, expect.objectContaining(expectedProps), {});
    });

    it('Label of "General" accordion should be rendered', () => {
      expect(container.getByText(messageIds.about)).toBeInTheDocument();
    });

    it('"Schedule" accordion should be rendered with correct props', () => {
      const expectedProps = {
        open: defaultState.sections.generalFixedDueDate,
        id: 'schedule',
      };
      expect(Accordion)
        .toHaveBeenNthCalledWith(accordionCallOrder.schedule, expect.objectContaining(expectedProps), {});
    });

    it('Label of "Schedule" accordion should be rendered', () => {
      expect(container.getByText(messageIds.schedule)).toBeInTheDocument();
    });

    it('"ExpandAllButton" should be rendered with correct props', () => {
      const expectedProps = {
        accordionStatus: {
          generalFixedDueDate: defaultState.sections.generalFixedDueDate,
          schedule: defaultState.sections.schedule,
        },
      };

      expect(ExpandAllButton).toHaveBeenNthCalledWith(expandAllButtonCallOrder.render, expect.objectContaining(expectedProps), {});
    });

    it('"ExpandAllButton" should be updated after clicking on it', () => {
      const expectedProps = {
        accordionStatus: {
          generalFixedDueDate: !defaultState.sections.generalFixedDueDate,
          schedule: !defaultState.sections.schedule,
        },
      };

      fireEvent.click(container.getByTestId('expand-all-button'));

      expect(ExpandAllButton).toHaveBeenNthCalledWith(expandAllButtonCallOrder.update, expect.objectContaining(expectedProps), {});
    });

    it('Footer should contain "Cancel" button with appropriate props', () => {
      const expectedProps = {
        id: 'clickable-cancel-fixedDueDateSchedule',
        onClick: defaultProps.onCancel,
      };

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.cancel, expect.objectContaining(expectedProps), {});
    });

    it('Name of "Cancel" button should be rendered', () => {
      expect(container.getByText(messageIds.cancel)).toBeInTheDocument();
    });

    it('Footer should contain "Save and close" button with appropriate props', () => {
      const expectedProps = {
        id: 'clickable-save-fixedDueDateSchedule',
        disabled: defaultProps.pristine,
      };

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.save, expect.objectContaining(expectedProps), {});
    });

    it('Name of "Save and close" button should be rendered', () => {
      expect(container.getByText(messageIds.saveAndClose)).toBeInTheDocument();
    });

    it('"AccordionSet" should be called with correct props', () => {
      const expectedProps = {
        accordionStatus: defaultState.sections,
        onToggle: expect.any(Function),
      };

      expect(AccordionSet).toHaveBeenNthCalledWith(accordionSetCallOrder.render, expect.objectContaining(expectedProps), {});
    });

    it('"AccordionSet" should be called with updated props after clicking on toggle button', () => {
      const expectedProps = {
        accordionStatus: {
          generalFixedDueDate: !defaultState.sections.generalFixedDueDate,
          schedule: defaultState.sections.schedule,
        },
        onToggle: expect.any(Function),
      };

      fireEvent.click(container.getByTestId('accordionSet'));

      expect(AccordionSet).toHaveBeenNthCalledWith(accordionSetCallOrder.update, expect.objectContaining(expectedProps), {});
    });
  });

  describe('Render of edit form', () => {
    let container;
    const buttonCallOrder = {
      delete: 2,
      save: 3,
      updatedDelete: 5,
    };

    const initialValues = {
      id: 'test-id',
      name: 'test-name',
      metadata: {
        createdDate: 'test-date',
      },
    };

    const props = {
      ...defaultProps,
      pristine: false,
      initialValues,
    };

    beforeEach(() => {
      container = render(
        <FixedDueDateScheduleForm {...props} />
      );
    });

    it('"Pane" component should have correct title', () => {
      expect(container.getByText(messageIds.editLabel)).toBeInTheDocument();
    });

    it('Footer should contain "Delete" button with appropriate props', () => {
      const expectedProps = {
        id: 'clickable-delete-item',
        disabled: defaultState.confirmDelete,
      };

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.delete, expect.objectContaining(expectedProps), {});
    });

    it('Name of "Delete" button should be rendered', () => {
      expect(container.getByText(messageIds.delete)).toBeInTheDocument();
    });

    it('Footer should contain "Save and close" button with appropriate props', () => {
      const expectedProps = {
        id: 'clickable-save-fixedDueDateSchedule',
        disabled: defaultProps.submitting,
      };

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.save, expect.objectContaining(expectedProps), {});
    });

    it('Name of "Save and close" button should be rendered', () => {
      expect(container.getByText(messageIds.saveAndClose)).toBeInTheDocument();
    });

    it('"Button" component should be called with updated state after clicking on delete button', () => {
      const deleteButton = container.getByText(messageIds.delete);
      const expectedProps = {
        id: 'clickable-delete-item',
        disabled: !defaultState.confirmDelete,
      };

      fireEvent.click(deleteButton);

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.updatedDelete, expect.objectContaining(expectedProps), {});
    });

    it('"ViewMetaData" should be called with correct props', () => {
      const expectedProps = {
        metadata: initialValues.metadata,
      };

      expect(ViewMetaData).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    describe('ConfirmationModal', () => {
      const modalCallOrder = {
        render: 1,
        update: 3,
      };

      it('"ConfirmationModal" should be called with correct props', () => {
        const expectedProps = {
          id: 'deletefixedduedateschedule-confirmation',
          open: defaultState.confirmDelete,
          onCancel: expect.any(Function),
          onConfirm: expect.any(Function),
        };

        expect(ConfirmationModal).toHaveBeenNthCalledWith(modalCallOrder.render, expect.objectContaining(expectedProps), {});
      });

      it('"ConfirmationModal" should have correct header', () => {
        expect(container.getByText(messageIds.deleteHeader)).toBeInTheDocument();
      });

      it('"ConfirmationModal" should have correct message', () => {
        expect(container.getByText(messageIds.deleteMessage)).toBeInTheDocument();
      });

      it('"ConfirmationModal" should have correct label of confirm button', () => {
        expect(container.getByText(messageIds.deleteLabel)).toBeInTheDocument();
      });

      it('"onRemove" prop should be triggered after clicking on confirm button', () => {
        fireEvent.click(container.getByText(messageIds.deleteLabel));

        expect(defaultProps.onRemove).toBeCalledWith(initialValues);
      });

      it('"ConfirmationModal" should be called with correct props after clicking on "Cancel" button', () => {
        fireEvent.click(container.getByText(messageIds.delete));
        fireEvent.click(container.getByText('Cancel'));

        expect(ConfirmationModal).toHaveBeenNthCalledWith(modalCallOrder.update, expect.objectContaining({ open: false }), {});
      });
    });
  });

  describe('Validation check', () => {
    const initialValues = {
      id: 'test-id',
      name: 'test-name',
    };

    const props = {
      ...defaultProps,
      initialValues,
    };

    beforeEach(() => {
      render(
        <FixedDueDateScheduleForm {...props} />
      );
    });

    describe('With provided name and without response data', () => {
      beforeAll(() => {
        Field.mockImplementationOnce(({ validate }) => {
          if (validate) {
            const validateName = async () => {
              await validate(name);
            };

            validateName();
          }

          return null;
        });

        global.fetch = jest.fn(() => {
          return Promise.resolve({
            json: () => Promise.resolve({}),
          });
        });
      });

      it('"fetch" should be called with correct props if "name" provided', () => {
        expect(fetch).toBeCalledWith(`${okapi.url}/fixed-due-date-schedule-storage/fixed-due-date-schedules?query=(name=="${name}")`,
          {
            headers: {
              'X-Okapi-Tenant': okapi.tenant,
              'X-Okapi-Token': okapi.token,
              'Content-Type': 'application/json',
            },
          });
      });
    });

    describe('With provided name and with response data', () => {
      beforeAll(() => {
        Field.mockImplementation(({ validate }) => {
          if (validate) {
            let result;
            const validateName = async () => {
              result = await validate(name);
            };

            validateName();

            return <div data-testid="validation-result">{result}</div>;
          }

          return null;
        });

        global.fetch = jest.fn(() => {
          return Promise.resolve({
            json: () => Promise.resolve({
              fixedDueDateSchedules: [{
                id: 'test',
                name,
              }],
            }),
          });
        });
      });

      it('"uniqueName" error message should be rendered', () => {
        waitFor(() => expect(messageIds.uniqueName).toBeInTheDocument());
      });
    });

    describe('Without provided name', () => {
      beforeAll(() => {
        Field.mockImplementation(({ validate }) => {
          if (validate) {
            const validateName = async () => {
              await validate();
            };

            validateName();
          }

          return null;
        });

        global.fetch = jest.fn();
      });

      it('"fetch" should not be called if "name" is not provided', () => {
        expect(fetch).not.toBeCalledWith();
      });
    });
  });
});
