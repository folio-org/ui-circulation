import {
  render,
  screen,
  fireEvent,
} from '@folio/jest-config-stripes/testing-library/react';
import { TitleManager } from '@folio/stripes/core';

import {
  CirculationRules,
  editorDefaultProps,
} from './CirculationRules';
import { MAX_UNPAGED_RESOURCE_COUNT } from '../constants';
import RulesForm from './lib/RuleEditor/RulesForm';

const basicProps = {
  intl: {
    formatMessage: jest.fn(({ id }) => id),
  },
  mutator: {
    circulationRules: {
      PUT: jest.fn(),
    },
  },
  resources: {
    loanTypes: {
      hasLoaded: true,
      records: [
        {
          name: 'loanName',
        }
      ],
    },
    circulationRules: {
      records: [
        {
          rulesAsText: 'circulation rules',
          metadata: 'metadata',
        }
      ],
    },
    patronGroups: {
      records: [
        {
          group: 'group',
        }
      ],
    },
    materialTypes: {
      records: [
        {
          name: 'materialTypesName',
        }
      ],
    },
    loanPolicies: {
      records: [
        {
          name: 'loanPolicyName',
        }
      ],
    },
    requestPolicies: {
      records: [
        {
          name: 'requestPolicyName',
        }
      ],
    },
    noticePolicies: {
      records: [
        {
          name: 'noticePolicyName',
        }
      ],
    },
    overdueFinePolicies: {
      records: [
        {
          name: 'overdueFinePolicyName',
        }
      ],
    },
    lostItemFeePolicies: {
      records: [
        {
          name: 'lostItemFeePolicyName',
        }
      ],
    },
    institutions: {
      records: [
        {
          id: 'institutionId',
          code: 'institutionCode',
        }
      ],
    },
    campuses: {
      records: [
        {
          id: 'campusId',
          code: 'campusCode',
          displayCode: 'campusDisplayCode',
          institutionId: 'campusInstitutionId',
        }
      ],
    },
    libraries: {
      records: [
        {
          id: 'libraryId',
          code: 'libraryCode',
          displayCode: 'libraryDisplayCode',
          campusId: 'libraryCampusId',
        }
      ],
    },
    locations: {
      records: [
        {
          id: 'locationId',
          code: 'locationCode',
          displayCode: 'locationDisplayCode',
          libraryId: 'locationLibraryId',
        }
      ],
    },
  },
};
const labelIds = {
  paneTitle: 'ui-circulation.settings.circulationRules.paneTitle',
  generalTitle: 'ui-circulation.settings.title.general',
  circulationRulesTitle: 'ui-circulation.settings.title.circulationRules',
};
const testIds = {
  circulationRulesForm: 'circulationRulesForm',
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  kebabCase: string => string,
}));
jest.mock('./lib/RuleEditor/RulesForm', () => jest.fn(({
  onSubmit,
}) => {
  const values = {
    rules: {
      replace: jest.fn(),
    },
  };
  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <form
      data-testId={testIds.circulationRulesForm}
      onSubmit={handleSubmit}
    />
  );
}));
jest.mock('./utils/rules-string-convertors', () => ({
  convertIdsToNames: jest.fn(ids => ids),
  convertNamesToIds: jest.fn(names => names),
}));
jest.mock('./utils/location-code-formatters', () => ({
  formatCampusCode: jest.fn(institution => institution.code),
  formatLibraryCode: jest.fn(institution => institution.code),
  formatLocationCode: jest.fn(institution => institution.code),
  formatCampusDisplayCode: jest.fn(institution => institution.displayCode),
  formatLibraryDisplayCode: jest.fn(institution => institution.displayCode),
  formatLocationDisplayCode: jest.fn(institution => institution.displayCode),
}));
jest.mock('./utils/with-dash-replacer', () => jest.fn(code => code));

describe('CirculationRules', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When loan types are loaded', () => {
    beforeEach(() => {
      render(
        <CirculationRules
          {...basicProps}
        />
      );
    });

    it('should render pane title', () => {
      const paneTitle = screen.getByText(labelIds.paneTitle);

      expect(paneTitle).toBeInTheDocument();
    });

    it('should trigger TitleManager with correct props', () => {
      const expectedProps = {
        page: labelIds.generalTitle,
        record: labelIds.circulationRulesTitle,
      };

      expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('should trigger RulesForm with correct props', () => {
      const expectedProps = {
        onSubmit: expect.any(Function),
        initialValues: {
          rules: basicProps.resources.circulationRules.records[0].rulesAsText,
        },
        editorProps: {
          ...editorDefaultProps,
          completionLists: {
            patronGroups: [basicProps.resources.patronGroups.records[0].group],
            materialTypes: [basicProps.resources.materialTypes.records[0].name],
            loanTypes: [basicProps.resources.loanTypes.records[0].name],
            institutions: [
              {
                id: basicProps.resources.institutions.records[0].id,
                code: basicProps.resources.institutions.records[0].code,
                displayCode: basicProps.resources.institutions.records[0].code,
              }
            ],
            campuses: [
              {
                id: basicProps.resources.campuses.records[0].id,
                code: basicProps.resources.campuses.records[0].code,
                displayCode: basicProps.resources.campuses.records[0].displayCode,
                parentId: basicProps.resources.campuses.records[0].institutionId,
              }
            ],
            libraries: [
              {
                id: basicProps.resources.libraries.records[0].id,
                code: basicProps.resources.libraries.records[0].code,
                displayCode: basicProps.resources.libraries.records[0].displayCode,
                parentId: basicProps.resources.libraries.records[0].campusId,
              }
            ],
            locations: [
              {
                id: basicProps.resources.locations.records[0].id,
                code: basicProps.resources.locations.records[0].code,
                displayCode: basicProps.resources.locations.records[0].displayCode,
                parentId: basicProps.resources.locations.records[0].libraryId,
              }
            ],
            loanPolicies: [basicProps.resources.loanPolicies.records[0].name],
            requestPolicies: [basicProps.resources.requestPolicies.records[0].name],
            noticePolicies: [basicProps.resources.noticePolicies.records[0].name],
            overdueFinePolicies: [basicProps.resources.overdueFinePolicies.records[0].name],
            lostItemFeePolicies: [basicProps.resources.lostItemFeePolicies.records[0].name],
          },
        },
        metadata: basicProps.resources.circulationRules.records[0].metadata,
      };

      expect(RulesForm).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });
  });

  describe('When loan types are not loaded', () => {
    const props = {
      ...basicProps,
      resources: {
        ...basicProps.resources,
        loanTypes: {
          records: [],
          hasLoaded: false,
        },
      },
    };
    let wrapper;

    beforeEach(() => {
      wrapper = render(
        <CirculationRules
          {...props}
        />
      );
    });

    it('should not render pane title', () => {
      const paneTitle = screen.queryByText(labelIds.paneTitle);

      expect(paneTitle).not.toBeInTheDocument();
    });

    it('should trigger TitleManager with correct props', () => {
      const expectedProps = {
        page: labelIds.generalTitle,
        record: labelIds.circulationRulesTitle,
      };

      expect(TitleManager).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });

    it('should render pane title', () => {
      const newProps = {
        ...basicProps,
        resources: {
          ...basicProps.resources,
          loanTypes: {
            records: [],
            hasLoaded: true,
            isPending: false,
          },
          patronGroups: {
            records: [],
            isPending: false,
          },
          materialTypes: {
            records: [],
            isPending: false,
          },
          loanPolicies: {
            records: [],
            isPending: false,
          },
          requestPolicies: {
            records: [],
            isPending: false,
          },
          noticePolicies: {
            records: [],
            isPending: false,
          },
          overdueFinePolicies: {
            records: [],
            isPending: false,
          },
          lostItemFeePolicies: {
            records: [],
            isPending: false,
          },
          locations: {
            records: [],
            isPending: false,
          },
          institutions: {
            records: [],
            isPending: false,
          },
          campuses: {
            records: [],
            isPending: false,
          },
          libraries: {
            records: [],
            isPending: false,
          },
        },
      };

      wrapper.rerender(
        <CirculationRules
          {...newProps}
        />
      );

      const paneTitle = screen.queryByText(labelIds.paneTitle);

      expect(paneTitle).toBeInTheDocument();
    });
  });

  describe('When circulation rules are not provided', () => {
    const props = {
      ...basicProps,
      resources: {
        ...basicProps.resources,
        circulationRules: {
          records: [],
        },
      },
    };

    beforeEach(() => {
      render(
        <CirculationRules
          {...props}
        />
      );
    });

    it('should trigger RulesForm with correct initialValues prop', () => {
      const expectedProps = {
        initialValues: {
          rules: '',
        },
      };

      expect(RulesForm).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
    });
  });

  describe('Data submitting', () => {
    describe('Successful submitting', () => {
      beforeEach(() => {
        basicProps.mutator.circulationRules.PUT.mockResolvedValueOnce({
          status: 200,
        });

        render(
          <CirculationRules
            {...basicProps}
          />
        );

        const circulationRulesForm = screen.getByTestId(testIds.circulationRulesForm);

        fireEvent.submit(circulationRulesForm);
      });

      it('should save circulation rules', () => {
        expect(basicProps.mutator.circulationRules.PUT).toHaveBeenCalled();
      });
    });

    describe('Unsuccessful submitting with 500 status code', () => {
      const json = jest.fn().mockResolvedValue({});

      beforeEach(() => {
        basicProps.mutator.circulationRules.PUT.mockRejectedValueOnce({
          status: 500,
          json,
        });

        render(
          <CirculationRules
            {...basicProps}
          />
        );

        const circulationRulesForm = screen.getByTestId(testIds.circulationRulesForm);

        fireEvent.submit(circulationRulesForm);
      });

      it('should send request to save circulation rules', () => {
        expect(basicProps.mutator.circulationRules.PUT).toHaveBeenCalled();
      });

      it('should handle response error', () => {
        expect(json).toHaveBeenCalled();
      });
    });

    describe('Unsuccessful submitting with 400 status code', () => {
      const json = jest.fn();

      beforeEach(() => {
        basicProps.mutator.circulationRules.PUT.mockRejectedValueOnce({
          status: 400,
          json,
        });

        render(
          <CirculationRules
            {...basicProps}
          />
        );

        const circulationRulesForm = screen.getByTestId(testIds.circulationRulesForm);

        fireEvent.submit(circulationRulesForm);
      });

      it('should send request to save circulation rules', () => {
        expect(basicProps.mutator.circulationRules.PUT).toHaveBeenCalled();
      });

      it('should not handle response error', () => {
        expect(json).not.toHaveBeenCalled();
      });
    });
  });

  describe('Manifest', () => {
    const manifestParams = [
      'patronGroups',
      'materialTypes',
      'loanTypes',
      'loanPolicies',
      'requestPolicies',
      'noticePolicies',
      'overdueFinePolicies',
      'lostItemFeePolicies',
      'locations',
      'institutions',
      'campuses',
      'libraries',
    ];

    describe('When maxUnpagedResourceCount is provided', () => {
      const maxUnpagedResourceCount = '10';
      const props = {
        stripes: {
          config: {
            maxUnpagedResourceCount,
          },
        },
      };

      manifestParams.forEach(param => {
        it(`should get limits for ${param}`, () => {
          const limit = CirculationRules.manifest[param].params.limit(null, null, null, null, props);

          expect(limit).toBe(maxUnpagedResourceCount);
        });
      });
    });

    describe('When maxUnpagedResourceCount is not provided', () => {
      const props = {
        stripes: {
          config: {},
        },
      };

      manifestParams.forEach(param => {
        it(`should get limits for ${param}`, () => {
          const limit = CirculationRules.manifest[param].params.limit(null, null, null, null, props);

          expect(limit).toBe(MAX_UNPAGED_RESOURCE_COUNT);
        });
      });
    });
  });
});
