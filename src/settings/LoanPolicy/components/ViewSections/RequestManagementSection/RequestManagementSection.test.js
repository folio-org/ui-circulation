/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@testing-library/react';

import '../../../../../../test/jest/__mock__';

import { Accordion } from '@folio/stripes/components';
import RequestManagementSection from './RequestManagementSection';

Accordion.mockImplementation(jest.fn(({
  children,
  label,
  onToggle,
  ...rest
}) => (
  <section
    onClick={onToggle}
    {...rest}
  >
    <div>{label}</div>
    {children}
  </section>
)));

describe('RequestManagementSection', () => {
  const testIds = {
    sectionHeaderTestId: 'sectionHeaderTestId',
  };
  const labelIds = {
    requestManagementLabelId: 'ui-circulation.settings.requestManagement.requestManagement',
  };
  const mockedFunction = jest.fn();
  const defaultProps = {
    isVisible: true,
    isRecallsOpen: true,
    isHoldsOpen: true,
    getPeriodValue: (id) => `${id}-processed`,
    getCheckboxValue: (id) => `${id}-processed`,
    onSectionToggle: mockedFunction,
  };

  const getById = (id) => within(screen.getByTestId(id));

  const sectionTest = (section, type) => {
    const labelId = `ui-circulation.settings.requestManagement.${section}`;
    const valueId = `requestManagement.${type}.${section}-processed`;

    it(`should render "${section}" section correctly`, () => {
      expect(getById(`${section}TestId`).getByText(labelId)).toBeVisible();
      expect(getById(`${section}TestId`).getByText(valueId)).toBeVisible();
    });
  };

  const accordionTest = (accordionType, testType = true) => {
    const labelId = `ui-circulation.settings.requestManagement.${accordionType}`;

    it(`should render "${accordionType}" accordion with passed props`, () => {
      if (testType) {
        expect(screen.getByTestId(`${accordionType}AccordionTestId`)).toHaveAttribute('open');
      } else {
        expect(screen.getByTestId(`${accordionType}AccordionTestId`)).not.toHaveAttribute('open');
      }

      expect(getById(`${accordionType}AccordionTestId`).getByText(labelId)).toBeVisible();
      fireEvent.click((screen.getByTestId(`${accordionType}AccordionTestId`)));
      expect(mockedFunction).toHaveBeenCalledTimes(1);
    });
  };

  describe('when accordions are open', () => {
    beforeEach(() => {
      render(
        <RequestManagementSection
          {...defaultProps}
        />
      );
    });

    afterEach(() => {
      mockedFunction.mockClear();
    });

    it('should render component header', () => {
      expect(getById(testIds.sectionHeaderTestId).getByText(labelIds.requestManagementLabelId)).toBeVisible();
    });

    accordionTest('recalls');

    sectionTest('minimumGuaranteedLoanPeriod', 'recalls');

    sectionTest('allowRecallsToExtendOverdueLoans', 'recalls');

    sectionTest('alternateRecallReturnInterval', 'recalls');

    accordionTest('holds');

    sectionTest('alternateCheckoutLoanPeriod', 'holds');

    sectionTest('renewItemsWithRequest', 'holds');

    sectionTest('alternateRenewalLoanPeriod', 'holds');
  });

  describe('when accordions is not open', () => {
    beforeEach(() => {
      render(
        <RequestManagementSection
          {...defaultProps}
          isRecallsOpen={false}
          isHoldsOpen={false}
        />
      );
    });

    afterEach(() => {
      mockedFunction.mockClear();
    });

    it('should render component header', () => {
      expect(getById(testIds.sectionHeaderTestId).getByText(labelIds.requestManagementLabelId)).toBeVisible();
    });

    accordionTest('recalls', false);

    accordionTest('holds', false);
  });

  describe('when prop "isVisible" is false', () => {
    beforeEach(() => {
      render(
        <RequestManagementSection
          {...defaultProps}
          isVisible={false}
        />
      );
    });

    it('should not render anything', () => {
      expect(screen.queryByTestId(testIds.sectionHeaderTestId)).not.toBeInTheDocument();
    });
  });
});
