import React from 'react';
import {
  render,
  screen,
  fireEvent,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import '../../../test/jest/__mock__';

import {
  Accordion,
  AccordionSet,
  ExpandAllButton,
} from '@folio/stripes/components';

import LostItemFeePolicyDetail from './LostItemFeePolicyDetail';
import {
  LostItemFeeAboutSection,
  LostItemFeeSection,
} from './components/ViewSections';
import { Metadata } from '../components';
import LostItemFee from '../Models/LostItemFeePolicy';
import {
  intervalIdsMap,
  intervalPeriodsLower,
} from '../../constants';

const testPath = 'itemAgedLostOverdue';

jest.mock('./components/ViewSections', () => ({
  LostItemFeeAboutSection: jest.fn(() => null),
  LostItemFeeSection: jest.fn(({ getPeriodValue }) => (
    <div data-testid="lostItemFeeSection">
      {getPeriodValue(testPath)}
    </div>
  )),
}));
jest.mock('../components', () => ({
  Metadata: jest.fn(() => null),
}));

AccordionSet.mockImplementation(({
  children,
  'data-testid': testId,
  onToggle,
}) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div
    data-testid={testId}
    onClick={() => onToggle({ id: 'LostItemFeeGeneralInformation' })}
  >
    {children}
  </div>
));
ExpandAllButton.mockImplementation(({
  onToggle,
}) => {
  const newStatuses = {
    LostItemFeeGeneralInformation: false,
    viewLostItemFeeSection: false,
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={() => onToggle(newStatuses)}>
      Expand all button
    </div>
  );
});

describe('LostItemFeePolicyDetail', () => {
  const getById = (id) => within(screen.getByTestId(id));
  const testIds = {
    accordionSet: 'accordionSet',
    lostItemFeeSection: 'lostItemFeeSection',
  };
  const labelIds = {
    generalInformation: 'ui-circulation.settings.lostItemFee.generalInformation',
    expandAllButton: 'Expand all button',
  };
  const mockedStripes = {
    connect: jest.fn(),
  };
  const mockedInitialValues = {
    id: 'policyTestId',
    description: 'policyTestDescription',
    metadata: {
      createdByUserId: new Date(),
      createdDate: new Date(),
      updatedByUserId: new Date(),
      updatedDate: new Date(),
    },
    [testPath]: {
      duration: 99,
      intervalId: intervalIdsMap.DAYS,
    },
  };
  const defaultProps = {
    stripes: mockedStripes,
    initialValues: mockedInitialValues,
  };
  const policyForTest = new LostItemFee(mockedInitialValues);

  afterEach(() => {
    Accordion.mockClear();
    Metadata.mockClear();
    LostItemFeeAboutSection.mockClear();
    LostItemFeeSection.mockClear();
  });

  describe('main structure', () => {
    beforeEach(() => {
      render(
        <LostItemFeePolicyDetail
          {...defaultProps}
        />
      );
    });

    it('should render "ExpandAllButton"', () => {
      expect(screen.getByText(labelIds.expandAllButton)).toBeInTheDocument();
    });

    describe('section statuses on "ExpandAllButton" click', () => {
      it('should render sections with correct initial accordion open statuses', () => {
        expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({ open: true }), {});
        expect(LostItemFeeSection).toHaveBeenCalledWith(expect.objectContaining({ viewLostItemFeeSection: true }), {});
      });

      it('should correctly change sections accrodeon statuses on "ExpandAllButton" click', () => {
        fireEvent.click(screen.getByText(labelIds.expandAllButton));

        expect(Accordion).toHaveBeenLastCalledWith(expect.objectContaining({ open: false }), {});
        expect(LostItemFeeSection).toHaveBeenLastCalledWith(expect.objectContaining({ viewLostItemFeeSection: false }), {});
      });
    });

    describe('"Accordion" statuses on "AccordionSet" click', () => {
      it('should render with correct initial "open" state', () => {
        expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({ open: true }), {});
      });

      it('should correctly change "open" status on "AccordionSet" click', () => {
        fireEvent.click(screen.getByTestId(testIds.accordionSet));

        expect(Accordion).toHaveBeenLastCalledWith(expect.objectContaining({ open: false }), {});
      });
    });

    it('should render "Accordion" with passed props', () => {
      expect(Accordion).toHaveBeenCalledWith(expect.objectContaining({
        label: labelIds.generalInformation,
        open: true,
      }), {});
    });

    it('should render "Metadata" with passed props', () => {
      expect(Metadata).toHaveBeenCalledWith({
        connect: mockedStripes.connect,
        metadata: policyForTest.metadata,
      }, {});
    });

    it('should render "LostItemFeeAboutSection"', () => {
      expect(LostItemFeeAboutSection).toHaveBeenCalled();
    });

    it('should render "LostItemFeeSection" with passed props', () => {
      expect(LostItemFeeSection).toHaveBeenCalledWith(expect.objectContaining({
        policy: policyForTest,
        viewLostItemFeeSection: true,
      }), {});
    });
  });

  describe('getPeriod', () => {
    it('should process correctly "getPeriod" when period was found', () => {
      const currentInterval = intervalPeriodsLower.find(interval => interval.value === mockedInitialValues[testPath].intervalId);
      const expectedResult = `${mockedInitialValues[testPath].duration} ${currentInterval.label}`;

      render(
        <LostItemFeePolicyDetail
          {...defaultProps}
        />
      );

      expect(getById(testIds.lostItemFeeSection).getByText(expectedResult)).toBeInTheDocument();
    });

    it('should process correctly "getPeriod" when period was not found', () => {
      LostItemFeeSection.mockImplementationOnce(({ getPeriodValue }) => (
        <div data-testid="lostItemFeeSection">
          {getPeriodValue('unexistedPath')}
        </div>
      ));

      render(
        <LostItemFeePolicyDetail
          {...defaultProps}
        />
      );

      expect(getById(testIds.lostItemFeeSection).getByText('-')).toBeInTheDocument();
    });
  });
});
