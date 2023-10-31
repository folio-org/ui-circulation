/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import RequestManagementSection from './RequestManagementSection';

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

  const accordionTest = (accordionType) => {
    const labelId = `ui-circulation.settings.requestManagement.${accordionType}`;

    it(`should render "${accordionType}" accordion label`, () => {
      expect(getById(`${accordionType}AccordionTestId`).getByText(labelId)).toBeVisible();
    });
  };

  describe('when prop "isVisible" is true', () => {
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
