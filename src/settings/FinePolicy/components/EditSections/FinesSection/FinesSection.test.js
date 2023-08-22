import React from 'react';
import {
  render,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../../../../test/jest/__mock__';

import {
  Accordion,
} from '@folio/stripes/components';
import OverdueFinesSection from '../RangeSection/OverdueFinesSection';
import OverdueFinesSectionColumn from '../RangeSection/OverdueFinesSectionColumn';
import FinesSection from './FinesSection';
import {
  intervalPeriods,
} from '../../../../../intervals';

jest.mock('../RangeSection/OverdueFinesSection', () => jest.fn(() => null));
jest.mock('../RangeSection/OverdueFinesSectionColumn', () => jest.fn(() => null));
jest.mock('../../../../utils/options-generator', () => jest.fn((
  formatMessage,
  periods,
  label,
) => ({
  periods,
  label,
})));

describe('FinesSection', () => {
  const overdueFinesSectionCallOrderByPlace = {
    overdueFineSection: 1,
    overdueRecallFineSection: 2,
  };

  const overdueFinesSectionColumnCallOrderByPlace = {
    countClosedDHMSection: 1,
    maximumOverdueFineSection: 2,
    forgiveOverdueFineSection: 3,
    ignoreGracePeriodsRecallsSection: 4,
    maximumRecallOverdueFineSection: 5,
  };

  const labelIds = {
    accordion: 'ui-circulation.settings.finePolicy.overdueFine',
    overdueFineSection: 'ui-circulation.settings.finePolicy.overdueFine',
    countClosedDHMColumn: 'ui-circulation.settings.finePolicy.countClosedDHM',
    maximumOverdueFineColumn: 'ui-circulation.settings.finePolicy.maximumOverdueFine',
    forgiveOverdueFineColumn: 'ui-circulation.settings.finePolicy.forgiveOverdueFine',
    overdueRecallFineSection: 'ui-circulation.settings.finePolicy.overdueRecallFine',
    ignoreGracePeriodsRecallsColumn: 'ui-circulation.settings.finePolicy.ignoreGracePeriodsRecalls',
    maximumRecallOverdueFineColumn: 'ui-circulation.settings.finePolicy.maximumRecallOverdueFine',
    selectInterval: 'ui-circulation.settings.finePolicy.selectInterval',
  };

  const intervarPeriodsExpectedValue = {
    periods: intervalPeriods,
    label: labelIds.selectInterval,
  };

  describe('when "fineSectionOpen" prop is true', () => {
    beforeEach(() => {
      render(<FinesSection fineSectionOpen />);
    });

    afterEach(() => {
      Accordion.mockClear();
      OverdueFinesSection.mockClear();
      OverdueFinesSectionColumn.mockClear();
    });

    it('should render "Accordion" component with passed props', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        id: 'editFineSection',
        open: true,
        label: labelIds.accordion,
      }), {});
    });

    it('should render "overdue fine" section', () => {
      expect(OverdueFinesSection).toHaveBeenNthCalledWith(
        overdueFinesSectionCallOrderByPlace.overdueFineSection,
        expect.objectContaining({
          name: 'overdueFine.quantity',
          period: 'overdueFine.intervalId',
          data: 'overdue-fine-quantity',
          label: labelIds.overdueFineSection,
          intervalPeriods: intervarPeriodsExpectedValue,
        }), {}
      );
    });

    it('should render "count closed DHM" section', () => {
      expect(OverdueFinesSectionColumn).toHaveBeenNthCalledWith(
        overdueFinesSectionColumnCallOrderByPlace.countClosedDHMSection,
        expect.objectContaining({
          name: 'countClosed',
          label: labelIds.countClosedDHMColumn,
        }), {}
      );
    });

    it('should render "maximum overdue fine" section', () => {
      expect(OverdueFinesSectionColumn).toHaveBeenNthCalledWith(
        overdueFinesSectionColumnCallOrderByPlace.maximumOverdueFineSection,
        expect.objectContaining({
          name: 'maxOverdueFine',
          component: 'TextField',
          label: labelIds.maximumOverdueFineColumn,
        }), {}
      );
    });

    it('should render "forgive overdue fine" section', () => {
      expect(OverdueFinesSectionColumn).toHaveBeenNthCalledWith(
        overdueFinesSectionColumnCallOrderByPlace.forgiveOverdueFineSection,
        expect.objectContaining({
          name: 'forgiveOverdueFine',
          label: labelIds.forgiveOverdueFineColumn,
        }), {}
      );
    });

    it('should render "overdue recall fine" section', () => {
      expect(OverdueFinesSection).toHaveBeenNthCalledWith(
        overdueFinesSectionCallOrderByPlace.overdueRecallFineSection,
        expect.objectContaining({
          name: 'overdueRecallFine.quantity',
          period: 'overdueRecallFine.intervalId',
          data: 'overdue-recall-fine-quantity',
          label: labelIds.overdueRecallFineSection,
          intervalPeriods: intervarPeriodsExpectedValue,
        }), {}
      );
    });

    it('should render "ignore grace periods recalls" section', () => {
      expect(OverdueFinesSectionColumn).toHaveBeenNthCalledWith(
        overdueFinesSectionColumnCallOrderByPlace.ignoreGracePeriodsRecallsSection,
        expect.objectContaining({
          name: 'gracePeriodRecall',
          label: labelIds.ignoreGracePeriodsRecallsColumn,
        }), {}
      );
    });

    it('should render "maximum recall overdue fine" section', () => {
      expect(OverdueFinesSectionColumn).toHaveBeenNthCalledWith(
        overdueFinesSectionColumnCallOrderByPlace.maximumRecallOverdueFineSection,
        expect.objectContaining({
          name: 'maxOverdueRecallFine',
          component: 'TextField',
          label: labelIds.maximumRecallOverdueFineColumn,
        }), {}
      );
    });
  });

  describe('when "fineSectionOpen" prop is false', () => {
    beforeEach(() => {
      render(<FinesSection fineSectionOpen={false} />);
    });

    it('should render "Accordion" component with passed props', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        id: 'editFineSection',
        open: false,
      }), {});
    });
  });
});
