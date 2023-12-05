import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';

import {
  Button,
  IconButton,
  TextArea,
  TextField,
} from '@folio/stripes/components';
import { ViewMetaData } from '@folio/stripes/smart-components';
import { Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import FixedDueDateScheduleForm from './FixedDueDateScheduleForm';
import SchedulesList from './components/EditSections/components/SchedulesList';

const name = 'test-name';
const testIds = {
  accordionSet: 'accordionSet',
  closeIcon: 'closeIcon',
  expandAllButton: 'expandAllButton',
  form: 'fixedDueDateScheduleForm',
};
const labelIds = {
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
  location: {
    search: '',
  },
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
    const buttonCallOrder = {
      cancel: 1,
      save: 2,
    };

    beforeEach(() => {
      container = render(
        <FixedDueDateScheduleForm {...defaultProps} />
      );
    });

    it('"IconButton" should be rendered with correct props', () => {
      const expectedProps = {
        'aria-label': [labelIds.closeLabel],
        icon: 'times',
        iconClassName: 'closeIcon',
        onClick: defaultProps.onCancel,
      };

      expect(IconButton).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('"onCancel" should be called after clicking on close icon', () => {
      fireEvent.click(container.getByTestId(testIds.closeIcon));

      expect(defaultProps.onCancel).toBeCalled();
    });

    it('"Pane" component should have correct title', () => {
      expect(container.getByText(labelIds.newFixDDSchedule)).toBeInTheDocument();
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
      expect(container.getByText(labelIds.name)).toBeInTheDocument();
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
      expect(container.getByText(labelIds.description)).toBeInTheDocument();
    });

    it('"FieldArray" should be called with correct props', () => {
      const expectedProps = {
        timezone: stripes.timezone,
        component: SchedulesList,
        name: 'schedules',
      };

      expect(FieldArray).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('Label of "General" accordion should be rendered', () => {
      expect(container.getByText(labelIds.about)).toBeInTheDocument();
    });

    it('Label of "Schedule" accordion should be rendered', () => {
      expect(container.getByText(labelIds.schedule)).toBeInTheDocument();
    });

    it('Footer should contain "Cancel" button with appropriate props', () => {
      const expectedProps = {
        id: 'clickable-cancel-fixedDueDateSchedule',
        onClick: defaultProps.onCancel,
      };

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.cancel, expect.objectContaining(expectedProps), {});
    });

    it('Name of "Cancel" button should be rendered', () => {
      expect(container.getByText(labelIds.cancel)).toBeInTheDocument();
    });

    it('Footer should contain "Save and close" button with appropriate props', () => {
      const expectedProps = {
        id: 'clickable-save-fixedDueDateSchedule',
        disabled: defaultProps.pristine,
      };

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.save, expect.objectContaining(expectedProps), {});
    });

    it('Name of "Save and close" button should be rendered', () => {
      expect(container.getByText(labelIds.saveAndClose)).toBeInTheDocument();
    });
  });

  describe('Render of edit form', () => {
    let container;
    const buttonCallOrder = {
      save: 2,
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
      location: {
        search: 'edit',
      },
    };

    beforeEach(() => {
      container = render(
        <FixedDueDateScheduleForm {...props} />
      );
    });

    it('"Pane" component should have correct title', () => {
      expect(container.getByText(labelIds.editLabel)).toBeInTheDocument();
    });

    it('Footer should contain "Save and close" button with appropriate props', () => {
      const expectedProps = {
        id: 'clickable-save-fixedDueDateSchedule',
        disabled: defaultProps.submitting,
      };

      expect(Button).toHaveBeenNthCalledWith(buttonCallOrder.save, expect.objectContaining(expectedProps), {});
    });

    it('Name of "Save and close" button should be rendered', () => {
      expect(container.getByText(labelIds.saveAndClose)).toBeInTheDocument();
    });

    it('"ViewMetaData" should be called with correct props', () => {
      const expectedProps = {
        metadata: initialValues.metadata,
      };

      expect(ViewMetaData).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
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
            credentials: 'include',
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
        waitFor(() => expect(labelIds.uniqueName).toBeInTheDocument());
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

  describe('Edit layer without data', () => {
    const props = {
      ...defaultProps,
      location: {
        search: 'edit',
      },
    };

    beforeEach(() => {
      render(<FixedDueDateScheduleForm {...props} />);
    });

    it('should not return view', () => {
      expect(screen.queryByTestId(testIds.form)).not.toBeInTheDocument();
    });
  });
});
