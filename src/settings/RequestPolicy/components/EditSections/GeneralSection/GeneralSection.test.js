import React from 'react';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { FieldArray } from 'react-final-form-arrays';
import { Field } from 'react-final-form';

import {
  TextArea,
  TextField,
  Checkbox,
} from '@folio/stripes/components';
import { Metadata } from '../../../../components';
import GeneralSection, {
  renderTypes,
  getDataOptions,
} from './GeneralSection';
import {
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
        label: name,
        name: `requestTypes[${index}]`,
      };

      it(`should render ${name} policy with correct props`, () => {
        expect(Field).toHaveBeenCalledWith(expectedResult, {});
      });
    };

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

    requestPolicyTypes.forEach(polycyTypeTest);
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
});
