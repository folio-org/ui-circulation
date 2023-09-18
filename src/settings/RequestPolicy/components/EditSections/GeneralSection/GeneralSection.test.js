import React from 'react';
import {
  render,
  screen,
  within,
  cleanup,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';

import {
  TextArea,
  TextField,
  Checkbox,
  RadioButton,
  MultiSelection,
} from '@folio/stripes/components';
import { Metadata } from '../../../../components';
import GeneralSection, {
  renderTypes,
  getDataOptions,
  validateServicePointsList,
  getRequestPolicyLabel,
} from './GeneralSection';
import {
  REQUEST_POLICY_TYPES,
  REQUEST_TYPE_RULES,
  requestPolicyTypes,
} from '../../../../../constants';

jest.mock('../../../../components', () => ({
  Metadata: jest.fn(() => null),
}));

describe('GeneralSection', () => {
  const testIds = {
    policyTypes: 'policyTypes',
    general: 'generalRequestPolicyForm',
    name: 'requestPolicyName',
    description: 'requestPolicyDescription',
  };
  const labelIds = {
    accordion: 'ui-circulation.settings.requestPolicy.generalInformation',
    name: 'ui-circulation.settings.requestPolicy.policyName',
    description: 'ui-circulation.settings.requestPolicy.policyDescription',
    allowAllServicePoints: 'ui-circulation.settings.requestPolicy.requestTypes.allowAll',
    allowSomeServicePoints: 'ui-circulation.settings.requestPolicy.requestTypes.allowSome',
  };
  const fieldCallOrderByPlace = {
    name: 1,
    description: 2,
  };
  const mockedMetadata = {
    data: 'testData',
  };
  const mockedConnect = jest.fn();
  const mockedValidateName = jest.fn();
  const getById = (id) => within(screen.getByTestId(id));
  const renderTypesProps = {
    handleChangeRequestTypesRules: jest.fn(),
    requestTypesRules: {
      Hold: REQUEST_TYPE_RULES.ALLOW_ALL,
    },
    servicePoints: [
      {
        id: 'id',
        name: 'name',
      }
    ],
    isLoading: false,
  };
  const defaultProps = {
    isOpen: true,
    metadata: mockedMetadata,
    connect: mockedConnect,
    validateName: mockedValidateName,
    ...renderTypesProps,
  };

  afterEach(() => {
    Metadata.mockClear();
    Field.mockClear();
    FieldArray.mockClear();
    cleanup();
  });

  describe('when "isOpen" prop is true', () => {
    beforeEach(() => {
      render(
        <GeneralSection
          {...defaultProps}
        />
      );
    });

    it('should render accordion label', () => {
      expect(getById(testIds.general).getByText(labelIds.accordion)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId(testIds.general)).toHaveAttribute('open');
    });

    it('should execute "Metadata" with passed props', () => {
      const expectedResult = {
        connect: mockedConnect,
        metadata: mockedMetadata,
      };

      expect(Metadata).toHaveBeenLastCalledWith(expectedResult, {});
    });

    it('should execute "Field" associated with "name" with passed props', () => {
      const expectedResult = {
        id: 'request_policy_name',
        name: 'name',
        required: true,
        autoFocus: true,
        component: TextField,
        validate: mockedValidateName,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.name, expect.objectContaining(expectedResult), {});
      expect(getById(testIds.name).getByText(labelIds.name)).toBeVisible();
    });

    it('should execute "Field" associated with "description" with passed props', () => {
      const expectedResult = {
        id: 'request_policy_description',
        name: 'description',
        component: TextArea,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.description, expect.objectContaining(expectedResult), {});
      expect(getById(testIds.description).getByText(labelIds.description)).toBeVisible();
    });

    it('should execute "FieldArray" with passed props', () => {
      const expectedResult = {
        name: 'requestTypes',
        component: renderTypes,
        ...renderTypesProps,
      };

      expect(FieldArray).toHaveBeenLastCalledWith(expectedResult, {});
    });
  });

  describe('when "isOpen" prop is false', () => {
    beforeEach(() => {
      render(
        <GeneralSection
          {...defaultProps}
          isOpen={false}
        />
      );
    });

    it('should render accordion label', () => {
      expect(getById(testIds.general).getByText(labelIds.accordion)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId(testIds.general)).not.toHaveAttribute('open');
    });
  });

  describe('renderTypes', () => {
    const policyTypesLabelId = 'ui-circulation.settings.requestPolicy.policyTypes';
    const polycyTypeTest = (name, index) => {
      const expectedResult = {
        component: Checkbox,
        type: 'checkbox',
        id: `${name.toLowerCase()}-checkbox`,
        name: `requestTypes[${index}]`,
      };

      it(`should render ${name} policy with correct props`, () => {
        expect(Field).toHaveBeenCalledWith(expect.objectContaining(expectedResult), {});
      });
    };

    describe('when all service points allowed', () => {
      beforeEach(() => {
        render(
          renderTypes({
            ...renderTypesProps,
            fields: {
              value: [true],
            },
          })
        );
      });

      it('should render main label', () => {
        expect(getById(testIds.policyTypes).getByText(policyTypesLabelId)).toBeVisible();
      });

      it('should render allow all service points label', () => {
        const allowAllServicePointsLabel = screen.getByText(labelIds.allowAllServicePoints);

        expect(allowAllServicePointsLabel).toBeInTheDocument();
      });

      it('should render allow some service points label', () => {
        const allowSomeServicePointsLabel = screen.getByText(labelIds.allowSomeServicePoints);

        expect(allowSomeServicePointsLabel).toBeInTheDocument();
      });

      it('should trigger allow all service points Field with correct props', () => {
        const expectedProps = {
          type: 'radio',
          name: `requestTypesRules.${requestPolicyTypes[0]}`,
          id: `${requestPolicyTypes[0]}AllowAllRadioButton`,
          component: RadioButton,
          value: REQUEST_TYPE_RULES.ALLOW_ALL,
          onChange: expect.any(Function),
          disabled: false,
        };

        expect(Field).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
      });

      it('should trigger allow some service points Field with correct props', () => {
        const expectedProps = {
          type: 'radio',
          name: `requestTypesRules.${requestPolicyTypes[0]}`,
          id: `${requestPolicyTypes[0]}AllowSomeRadioButton`,
          component: RadioButton,
          value: REQUEST_TYPE_RULES.ALLOW_SOME,
          onChange: expect.any(Function),
          disabled: false,
        };

        expect(Field).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
      });

      requestPolicyTypes.forEach(polycyTypeTest);
    });

    describe('when some service points allowed', () => {
      beforeEach(() => {
        render(
          renderTypes({
            ...renderTypesProps,
            requestTypesRules: {
              Hold: REQUEST_TYPE_RULES.ALLOW_SOME,
            },
            fields: {
              value: [true],
            },
          })
        );
      });

      it('should trigger Field with correct props', () => {
        const expectedProps = {
          component: MultiSelection,
          name: `allowedServicePoints.${requestPolicyTypes[0]}`,
          id: `${requestPolicyTypes[0]}MultiSelect`,
          validate: validateServicePointsList,
          disabled: false,
        };

        expect(Field).toHaveBeenCalledWith(expect.objectContaining(expectedProps), {});
      });
    });
  });

  describe('getDataOptions', () => {
    it('should correctly modify service points', () => {
      const name = 'name';
      const id = 'id';
      const servicePoints = [
        {
          name,
          id,
          test: 'test',
        }
      ];
      const expectedResult = [
        {
          label: name,
          value: id,
        }
      ];

      expect(getDataOptions(servicePoints)).toEqual(expectedResult);
    });

    it('should return empty array', () => {
      expect(getDataOptions()).toEqual([]);
    });
  });

  describe('validateServicePointsList', () => {
    it('should return undefined', () => {
      const servicePoints = [{}];

      expect(validateServicePointsList(servicePoints)).toBeUndefined();
    });

    it('should return an error', () => {
      const servicePoints = [];

      expect(validateServicePointsList(servicePoints)).toBeTruthy();
    });
  });

  describe('getRequestPolicyLabel', () => {
    it(`should return ${REQUEST_POLICY_TYPES.HOLD}`, () => {
      expect(getRequestPolicyLabel(REQUEST_POLICY_TYPES.HOLD).props.children[0]).toEqual(REQUEST_POLICY_TYPES.HOLD);
    });

    it(`should return ${REQUEST_POLICY_TYPES.PAGE}`, () => {
      expect(getRequestPolicyLabel(REQUEST_POLICY_TYPES.PAGE)).toEqual(REQUEST_POLICY_TYPES.PAGE);
    });

    it(`should return ${REQUEST_POLICY_TYPES.RECALL}`, () => {
      expect(getRequestPolicyLabel(REQUEST_POLICY_TYPES.RECALL)).toEqual(REQUEST_POLICY_TYPES.RECALL);
    });
  });
});
