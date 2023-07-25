import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react';

import '../../../test/jest/__mock__';

import {
  AccordionSet,
  ExpandAllButton,
  Pane,
} from '@folio/stripes/components';

import RequestPolicyForm from './RequestPolicyForm';
import { GeneralSection } from './components';
import {
  CancelButton,
  FooterPane,
} from '../components';
import RequestPolicy from '../Models/RequestPolicy';

jest.mock('./components', () => ({
  GeneralSection: jest.fn(() => null),
}));
jest.mock('../components', () => ({
  CancelButton: jest.fn(() => null),
  FooterPane: jest.fn(() => null),
}));

ExpandAllButton.mockImplementation(({ onToggle }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div onClick={() => onToggle({ generalRequestPolicyForm: false })}>
    ExpandAllButton
  </div>
));
AccordionSet.mockImplementation(({
  children,
  onToggle,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid="accordionSet"
    onClick={() => onToggle({ id: 'generalRequestPolicyForm' })}
  >
    {children}
  </div>
));

describe('RequestPolicyForm', () => {
  const labelIds = {
    createEntryLabel: 'ui-circulation.settings.requestPolicy.createEntryLabel',
    nameExists: 'ui-circulation.settings.requestPolicy.errors.nameExists',
    expandAllButton: 'ExpandAllButton',
  };
  const testIds = {
    form: 'form',
    accordionSet: 'accordionSet',
  };
  const okapi = {
    url: 'url',
    tenant: 'tenant',
    token: 'token',
  };
  const stripes = {
    connect: jest.fn(),
  };
  const onCancel = jest.fn();
  const handleSubmit = jest.fn();
  const defaultProps = {
    okapi,
    pristine: true,
    stripes,
    submitting: false,
    onCancel,
    handleSubmit,
    location: {
      search: '',
    },
    parentResources: {
      requestPolicies: {
        records: [
          {
            id: 'policyId',
            allowedServicePoints: {
              Page: ['servicePointId'],
            },
          }
        ],
        isPending: false,
      },
      servicePoints: {
        records: [],
        isPending: false,
      },
    },
  };

  afterEach(() => {
    Pane.mockClear();
    CancelButton.mockClear();
    FooterPane.mockClear();
    GeneralSection.mockClear();
    ExpandAllButton.mockClear();
    AccordionSet.mockClear();
  });

  describe('with default props', () => {
    const form = {
      getState: jest.fn(() => ({})),
      change: jest.fn(),
    };

    beforeEach(() => {
      render(
        <RequestPolicyForm
          {...defaultProps}
          form={form}
        />
      );
    });

    it('on form submit correct method should be executed', () => {
      expect(handleSubmit).not.toHaveBeenCalled();

      fireEvent.submit(screen.getByTestId(testIds.form));

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('"Pane" component should have correct title', () => {
      expect(Pane).toHaveBeenCalledWith(expect.objectContaining({
        paneTitle: labelIds.createEntryLabel,
      }), {});
    });

    it('"CancelButton" should be executed with correct props', () => {
      expect(CancelButton).toHaveBeenCalledWith({
        onCancel,
      }, {});
    });

    it('"FooterPane" should be executed with correct props', () => {
      expect(FooterPane).toHaveBeenCalledWith({
        pristine: true,
        submitting: false,
        onCancel,
      }, {});
    });

    it('should have "ExpandAllButton" in the document', () => {
      expect(screen.getByText(labelIds.expandAllButton)).toBeInTheDocument();
    });

    it('should correctly change sections status on "ExpandAllButton" click', () => {
      expect(GeneralSection).toHaveBeenCalledWith(expect.objectContaining({
        isOpen: true,
      }), {});

      fireEvent.click(screen.getByText(labelIds.expandAllButton));

      expect(GeneralSection).toHaveBeenCalledWith(expect.objectContaining({
        isOpen: false,
      }), {});
    });

    it('should correctly change sections status on "AccordionSet" toggle', () => {
      expect(GeneralSection).toHaveBeenCalledWith(expect.objectContaining({
        isOpen: true,
      }), {});

      fireEvent.click(screen.getByTestId(testIds.accordionSet));

      expect(GeneralSection).toHaveBeenCalledWith(expect.objectContaining({
        isOpen: false,
      }), {});
    });

    it('"GeneralSection" should be executed with correct props', () => {
      expect(GeneralSection).toHaveBeenCalledWith(expect.objectContaining({
        metadata: {},
        connect: stripes.connect,
      }), {});
    });
  });

  describe('when data for policy is passed in initialValues', () => {
    const name = 'policyName';
    const initialValues = {
      id: 'policyId',
      name,
      metadata: {
        createdByUserId: 'createUserId',
        createdDate: 'createDate',
        updatedByUserId: 'updateUserId',
        updatedDate: 'updateDate',
      },
    };
    const form = {
      getState: jest.fn(() => ({ values: initialValues })),
      change: jest.fn(),
    };

    const testPolicy = new RequestPolicy(initialValues);

    beforeEach(() => {
      render(
        <RequestPolicyForm
          {...defaultProps}
          initialValues={initialValues}
          form={form}
          location={{
            search: 'edit',
          }}
        />
      );
    });

    it('"Pane" component should have correct title', () => {
      expect(Pane).toHaveBeenCalledWith(expect.objectContaining({
        paneTitle: testPolicy.name,
      }), {});
    });

    it('"GeneralSection" should be executed with correct metadata prop', () => {
      expect(GeneralSection).toHaveBeenCalledWith(expect.objectContaining({
        metadata: testPolicy.metadata,
      }), {});
    });

    describe('validation check', () => {
      const catchFunction = jest.fn();

      beforeAll(() => {
        GeneralSection.mockImplementation(({ validateName }) => {
          const dummyMethod = async () => {
            catchFunction(await validateName(name));
          };

          dummyMethod();

          return null;
        });
      });

      afterAll(() => {
        global.fetch.mockRestore();
      });

      describe('when policy with passed name is already exists', () => {
        beforeAll(() => {
          global.fetch = jest.fn(() => {
            return Promise.resolve({
              json: () => Promise.resolve({
                requestPolicies: [
                  {
                    name: testPolicy.name,
                    id: 'someTestId',
                  },
                ],
              }),
            });
          });
        });

        afterEach(() => {
          catchFunction.mockClear();
        });

        it('should execute "fetch" with correct props', () => {
          expect(fetch).toBeCalledWith(`${okapi.url}/request-policy-storage/request-policies?query=(name=="${name}")`, {
            headers: {
              'X-Okapi-Tenant': okapi.tenant,
              'X-Okapi-Token': okapi.token,
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
        });

        it('the corresponding error should appear', () => {
          expect(catchFunction.mock.calls[0][0]).toEqual(expect.objectContaining({
            props: {
              id: labelIds.nameExists,
            },
          }));
        });
      });

      describe('when trying to edit existing policy', () => {
        beforeAll(() => {
          global.fetch = jest.fn(() => {
            return Promise.resolve({
              json: () => Promise.resolve({
                requestPolicies: [
                  {
                    name: testPolicy.name,
                    id: testPolicy.id,
                  },
                ],
              }),
            });
          });
        });

        it('should not be any errors', () => {
          expect(catchFunction).toHaveBeenCalledWith(undefined);
        });
      });

      describe('when trying to create new policy', () => {
        beforeAll(() => {
          global.fetch = jest.fn(() => {
            return Promise.resolve({
              json: () => Promise.resolve({}),
            });
          });
        });

        it('should not be any errors', () => {
          expect(catchFunction).toHaveBeenCalledWith(undefined);
        });
      });
    });
  });

  describe('Edit layer without data', () => {
    const form = {
      getState: jest.fn(() => ({})),
      change: jest.fn(),
    };
    const props = {
      ...defaultProps,
      location: {
        search: 'edit',
      },
    };

    beforeEach(() => {
      render(<RequestPolicyForm {...props} form={form} />);
    });

    it('should not return view', () => {
      expect(screen.queryByTestId(testIds.form)).not.toBeInTheDocument();
    });
  });
});
