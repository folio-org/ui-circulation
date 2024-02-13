import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';

import TLRPatronNoticesForm from './TLRPatronNoticesForm';
import NoticeTemplates from './NoticeTemplates';

jest.mock('./NoticeTemplates', () => jest.fn(() => <div />));

const basicProps = {
  handleSubmit: jest.fn(),
  label: 'testLabel',
  pristine: false,
  submitting: false,
  resources: {
    templates: {
      records: [
        {
          id: 'recordId',
        }
      ],
    }
  },
};
const testIds = {
  form: 'tlrPatronNoticesForm',
};
const labelIds = {
  saveButton: 'stripes-core.button.save',
};

describe('TLRPatronNoticesForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When templates exist', () => {
    beforeEach(() => {
      render(
        <TLRPatronNoticesForm
          {...basicProps}
        />
      );
    });

    it('should trigger NoticeTemplates with correct props', () => {
      const expectedProps = {
        templates: basicProps.resources.templates.records,
      };

      expect(NoticeTemplates).toHaveBeenCalledWith(expectedProps, {});
    });

    it('should render Pane label', () => {
      const paneLabel = screen.getByText(basicProps.label);

      expect(paneLabel).toBeInTheDocument();
    });

    it('should render Save button label', () => {
      const saveButton = screen.getByText(labelIds.saveButton);

      expect(saveButton).toBeInTheDocument();
    });

    it('should handle form submit', () => {
      const form = screen.getByTestId(testIds.form);

      fireEvent.submit(form);

      expect(basicProps.handleSubmit).toHaveBeenCalled();
    });
  });

  describe('When templates do not exist', () => {
    const props = {
      ...basicProps,
      resources: {
        templates: {}
      },
    };

    beforeEach(() => {
      render(
        <TLRPatronNoticesForm
          {...props}
        />
      );
    });

    it('should trigger NoticeTemplates with correct props', () => {
      const expectedProps = {
        templates: [],
      };

      expect(NoticeTemplates).toHaveBeenCalledWith(expectedProps, {});
    });
  });
});
