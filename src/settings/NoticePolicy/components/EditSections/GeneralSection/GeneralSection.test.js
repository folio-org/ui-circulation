import React from 'react';
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import { Field } from 'react-final-form';

import {
  TextArea,
  TextField,
  Checkbox,
} from '@folio/stripes/components';
import { Metadata } from '../../../../components';
import GeneralSection from './GeneralSection';
import styles from './GeneralSection.css';

jest.mock('../../../../components', () => ({
  Metadata: jest.fn(() => null),
}));

describe('GeneralSection', () => {
  const testIds = {
    general: 'general',
    nameField: 'nameField',
    activeField: 'activeField',
    descriptionField: 'descriptionField',
  };
  const labelIds = {
    general: 'ui-circulation.settings.noticePolicy.generalInformation',
    name: 'ui-circulation.settings.noticePolicy.policyName',
    active: 'ui-circulation.settings.noticePolicy.active',
    description: 'ui-circulation.settings.noticePolicy.policyDescription',
  };
  const fieldCallOrderByPlace = {
    name: 1,
    active: 2,
    description: 3,
  };
  const getById = (id) => within(screen.getByTestId(id));
  const mockedMetadata = {
    data: 'testData',
  };
  const mockedConnect = jest.fn();
  const defaultProps = {
    isOpen: true,
    metadata: mockedMetadata,
    connect: mockedConnect,
  };

  afterEach(() => {
    Field.mockClear();
    Metadata.mockClear();
  });

  describe('when "isOpen" prop is true', () => {
    beforeEach(() => {
      render(
        <GeneralSection
          {...defaultProps}
        />
      );
    });

    it('should render main label', () => {
      expect(getById(testIds.general).getByText(labelIds.general)).toBeVisible();
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
        id: 'notice_policy_name',
        name: 'name',
        required: true,
        autoFocus: true,
        component: TextField,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.name, expect.objectContaining(expectedResult), {});
      expect(getById(testIds.nameField).getByText(labelIds.name)).toBeVisible();
    });

    it('should execute "Field" associated with "active" with passed props', () => {
      const expectedResult = {
        id: 'notice_policy_active',
        name: 'active',
        type: 'checkbox',
        className: styles.checkbox,
        component: Checkbox,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.active, expect.objectContaining(expectedResult), {});
      expect(getById(testIds.activeField).getByText(labelIds.active)).toBeVisible();
    });

    it('should execute "Field" associated with "description" with passed props', () => {
      const expectedResult = {
        id: 'notice_policy_description',
        name: 'description',
        component: TextArea,
      };

      expect(Field).toHaveBeenNthCalledWith(fieldCallOrderByPlace.description, expect.objectContaining(expectedResult), {});
      expect(getById(testIds.descriptionField).getByText(labelIds.description)).toBeVisible();
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

    it('should render main label', () => {
      expect(getById(testIds.general).getByText(labelIds.general)).toBeVisible();
    });

    it('should pass "isOpen" prop correctly', () => {
      expect(screen.getByTestId(testIds.general)).not.toHaveAttribute('open');
    });
  });
});
