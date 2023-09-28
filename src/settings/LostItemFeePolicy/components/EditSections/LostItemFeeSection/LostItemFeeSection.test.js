import {
  render,
  screen,
  within,
} from '@folio/jest-config-stripes/testing-library/react';

import { Field } from 'react-final-form';
import {
  Select,
  Label,
  RadioButton,
  TextField,
  Accordion,
} from '@folio/stripes/components';
import {
  intervalPeriodsLower,
} from '../../../../../constants';
import RadioGroup from '../RadioGroup/RadioGroup';
import Period from '../../../../components/Period';
import LostItemFeeSection, {
  formatNumber,
} from './LostItemFeeSection';

jest.mock('../../../../utils/options-generator', () => jest.fn((
  formatMessage,
  periods,
  label,
) => ({
  periods,
  label,
})));
jest.mock('../RadioGroup/RadioGroup', () => jest.fn(() => null));
jest.mock('../../../../components/Period', () => jest.fn(() => null));

describe('LostItemFeeSection', () => {
  const testIds = {
    chargeAmountItemPatronColumn: 'chargeAmountItemPatronColumn',
    chargeAmountItemSystemColumn: 'chargeAmountItemSystemColumn',
    returnedLostItemProcessingFeeColumn: 'returnedLostItemProcessingFeeColumn',
    lostItemReturnedColumn: 'lostItemReturnedColumn',
    replacementAllowedColumn: 'replacementAllowedColumn',
    replacedLostItemProcessingFeeColumn: 'replacedLostItemProcessingFeeColumn',
  };
  const labelIds = {
    lostItemSection: 'ui-circulation.settings.lostItemFee.lostItemSection',
    selectInterval: 'ui-circulation.settings.lostItemFee.selectInterval',
    itemeAgedLostOverdue: 'ui-circulation.settings.lostItemFee.itemeAgedLostOverdue',
    patronBilledAfterAgedLost: 'ui-circulation.settings.lostItemFee.patronBilledAfterAgedLost',
    itemRecalledAgedLostOverdue: 'ui-circulation.settings.lostItemFee.itemRecalledAgedLostOverdue',
    patronBilledAfterRecalledAgedLost: 'ui-circulation.settings.lostItemFee.patronBilledAfterRecalledAgedLost',
    lostItemNotChargeFeesFine: 'ui-circulation.settings.lostItemFee.lostItemNotChargeFeesFine',
    feesFinesShallRefunded: 'ui-circulation.settings.lostItemFee.feesFinesShallRefunded',
    late: 'ui-circulation.settings.lostItemFee.late',
    lostItemProcessingFee: 'ui-circulation.settings.lostItemFee.lostItemProcessingFee',
    yes: 'ui-circulation.settings.lostItemFee.yes',
    no: 'ui-circulation.settings.lostItemFee.no',
    chargeAmountItem: 'ui-circulation.settings.lostItemFee.chargeAmountItem',
    chargeAmountSystem: 'ui-circulation.settings.lostItemFee.chargeAmount.system',
    returned: 'ui-circulation.settings.lostItemFee.returned',
    lostItemChargeOverdueBased: 'ui-circulation.settings.lostItemFee.lostItemChargeOverdueBased',
    lostItemRemoveOverdueFines: 'ui-circulation.settings.lostItemFee.lostItemRemoveOverdueFines',
    replacementAllowed: 'ui-circulation.settings.lostItemFee.replacementAllowed',
    replacedLostItemProcessingFee: 'ui-circulation.settings.lostItemFee.replacedLostItemProcessingFee',
    replacementProcessFee: 'ui-circulation.settings.lostItemFee.replacementProcessFee',
    chargeAmountItemPatron: 'ui-circulation.settings.lostItemFee.chargeAmountItemPatron',
    chargeAmountItemSystem: 'ui-circulation.settings.lostItemFee.chargeAmountItemSystem',
    returnedLostItemProcessingFee: 'ui-circulation.settings.lostItemFee.returnedLostItemProcessingFee',
    lostItemReturned: 'ui-circulation.settings.lostItemFee.lostItemReturned',
  };
  const changeMock = jest.fn();
  const defaultTestProps = {
    lostItemFeeSectionOpen: false,
    change: changeMock,
  };
  const intervarPeriodsExpectedValue = {
    periods: intervalPeriodsLower,
    label: labelIds.selectInterval,
  };
  const periodCallOrderByPlace = {
    itemeAgedLostOverdue: 1,
    patronBilledAfterAgedLost: 2,
    itemRecalledAgedLostOverdue: 3,
    patronBilledAfterRecalledAgedLost: 4,
    lostItemNotChargeFeesFine: 5,
    feesFinesShallRefunded: 6,
  };
  const labelCallOrderByPlace = {
    chargeAmountItemPatron: 1,
    chargeAmountItemSystem: 2,
    returnedLostItemProcessingFee: 3,
    lostItemReturned: 4,
    replacementAllowed: 5,
    replacedLostItemProcessingFee: 6,
  };
  const fieldCallOrderByPlace = {
    lostItemProcessingFee: 1,
    chargeAmountItem: 2,
    chargeAmountSystem: 3,
    returnedLostItemProcessingFee: 4,
    lostItemReturned: 5,
    lostItemRemoveOverdueFines: 6,
    replacementAllowed: 7,
    replacedLostItemProcessingFee: 8,
    replacementProcessFee: 9,
  };
  const periodCommonExpectedProps = {
    intervalPeriods: intervarPeriodsExpectedValue,
    changeFormValue: changeMock,
  };
  const expectedDataOptions = [
    { value: 'true', label: labelIds.yes },
    { value: 'false', label: labelIds.no },
  ];
  const getById = (id) => within(screen.getByTestId(id));

  afterEach(() => {
    Accordion.mockClear();
    Period.mockClear();
    Field.mockClear();
    Select.mockClear();
    RadioButton.mockClear();
    TextField.mockClear();
    RadioGroup.mockClear();
    Label.mockClear();
  });

  describe('with default props', () => {
    beforeEach(() => {
      render(<LostItemFeeSection {...defaultTestProps} />);
    });

    it('should render "iteme aged lost overdue" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.itemeAgedLostOverdue,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.itemeAgedLostOverdue,
          inputValuePath: 'itemAgedLostOverdue.duration',
          selectValuePath: 'itemAgedLostOverdue.intervalId',
        }, {}
      );
    });

    it('should render "patron billed after aged lost" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.patronBilledAfterAgedLost,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.patronBilledAfterAgedLost,
          inputValuePath: 'patronBilledAfterAgedLost.duration',
          selectValuePath: 'patronBilledAfterAgedLost.intervalId',
        }, {}
      );
    });

    it('should render "item recalled aged lost overdue" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.itemRecalledAgedLostOverdue,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.itemRecalledAgedLostOverdue,
          inputValuePath: 'recalledItemAgedLostOverdue.duration',
          selectValuePath: 'recalledItemAgedLostOverdue.intervalId',
        }, {}
      );
    });

    it('should render "patron billed after recalled aged lost" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.patronBilledAfterRecalledAgedLost,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.patronBilledAfterRecalledAgedLost,
          inputValuePath: 'patronBilledAfterRecalledItemAgedLost.duration',
          selectValuePath: 'patronBilledAfterRecalledItemAgedLost.intervalId',
        }, {}
      );
    });

    it('should render "lost item not charge fees fine" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.lostItemNotChargeFeesFine,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.lostItemNotChargeFeesFine,
          inputValuePath: 'lostItemChargeFeeFine.duration',
          selectValuePath: 'lostItemChargeFeeFine.intervalId',
        }, {}
      );
    });

    it('should render "fees fines shall fefunded" period', () => {
      expect(Period).toHaveBeenNthCalledWith(
        periodCallOrderByPlace.feesFinesShallRefunded,
        {
          ...periodCommonExpectedProps,
          fieldLabel: labelIds.feesFinesShallRefunded,
          inputValuePath: 'feesFinesShallRefunded.duration',
          selectValuePath: 'feesFinesShallRefunded.intervalId',
          intervalPeriods: intervarPeriodsExpectedValue,
          intervalPeriodsSuffix: labelIds.late,
        }, {}
      );
    });

    it('should render "lost item processing fee" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.lostItemProcessingFee,
        expect.objectContaining({
          'aria-label': labelIds.lostItemProcessingFee,
          label: labelIds.lostItemProcessingFee,
          name: 'lostItemProcessingFee',
          id: 'lost-item-processing-fee',
          component: TextField,
          type: 'number',
          formatOnBlur: true,
        }), {}
      );
    });

    it('should render "charge amount item" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.chargeAmountItem,
        {
          'aria-label': labelIds.chargeAmountItem,
          name: 'chargeAmountItemPatron',
          id: 'charge-amount-item-patron',
          component: Select,
          dataOptions: expectedDataOptions,
        }, {}
      );
    });

    it('should render "charge amount system" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.chargeAmountSystem,
        {
          'aria-label': labelIds.chargeAmountSystem,
          name: 'chargeAmountItemSystem',
          id: 'charge-amount-item-system',
          component: Select,
          dataOptions: expectedDataOptions,
        }, {}
      );
    });

    it('should render "returned lost item processing fee" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.returnedLostItemProcessingFee,
        {
          'aria-label': labelIds.lostItemProcessingFee,
          name: 'returnedLostItemProcessingFee',
          id: 'returnedLostItemProcessingFee',
          component: Select,
          dataOptions: expectedDataOptions,
        }, {}
      );
    });

    it('should render "lost item returned" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.lostItemReturned,
        {
          'aria-label': labelIds.returned,
          label: labelIds.lostItemChargeOverdueBased,
          name: 'lostItemReturned',
          component: RadioButton,
          id: 'Charge',
          value: 'Charge',
          type: 'radio',
        }, {}
      );
    });

    it('should render "lost item remove overdue fines" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.lostItemRemoveOverdueFines,
        {
          label: labelIds.lostItemRemoveOverdueFines,
          name: 'lostItemReturned',
          id: 'Remove',
          component: RadioButton,
          value: 'Remove',
          type: 'radio',
        }, {}
      );
    });

    it('should render "replacement allowed" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.replacementAllowed,
        {
          'aria-label': labelIds.replacementAllowed,
          name: 'replacementAllowed',
          id: 'replacementAllowed',
          component: Select,
          dataOptions: expectedDataOptions,
        }, {}
      );
    });

    it('should render "replaced lost item processing fee" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.replacedLostItemProcessingFee,
        {
          'aria-label': labelIds.replacedLostItemProcessingFee,
          name: 'replacedLostItemProcessingFee',
          id: 'replacedLostItemProcessingFee',
          component: Select,
          dataOptions: expectedDataOptions,
        }, {}
      );
    });

    it('should render "replacement process fee" field', () => {
      expect(Field).toHaveBeenNthCalledWith(
        fieldCallOrderByPlace.replacementProcessFee,
        expect.objectContaining({
          'aria-label': labelIds.replacementProcessFee,
          label: labelIds.replacementProcessFee,
          name: 'replacementProcessingFee',
          id: 'replacement-processing-fee',
          component: TextField,
          type: 'number',
          formatOnBlur: true,
        }), {}
      );
    });

    it('should render "charge amount item patron" label', () => {
      expect(Label).toHaveBeenNthCalledWith(
        labelCallOrderByPlace.chargeAmountItemPatron,
        expect.objectContaining({
          htmlFor: 'charge-amount-item-patron',
          id: 'charge-amount-item-patron-label',
        }), {}
      );
    });

    it('should render "charge amount item system" label', () => {
      expect(Label).toHaveBeenNthCalledWith(
        labelCallOrderByPlace.chargeAmountItemSystem,
        expect.objectContaining({
          htmlFor: 'charge-amount-item-system',
          id: 'charge-amount-item-system-label',
        }), {}
      );
    });

    it('should render "returned lost item processing fee" label', () => {
      expect(Label).toHaveBeenNthCalledWith(
        labelCallOrderByPlace.returnedLostItemProcessingFee,
        expect.objectContaining({
          htmlFor: 'returnedLostItemProcessingFee',
          id: 'returnedLostItemProcessingFee-label',
        }), {}
      );
    });

    it('should render "lost item returned" label', () => {
      expect(Label).toHaveBeenNthCalledWith(
        labelCallOrderByPlace.lostItemReturned,
        expect.objectContaining({
          htmlFor: 'Charge',
          id: 'Charge-label',
        }), {}
      );
    });

    it('should render "replacement allowed" label', () => {
      expect(Label).toHaveBeenNthCalledWith(
        labelCallOrderByPlace.replacementAllowed,
        expect.objectContaining({
          htmlFor: 'replacementAllowed',
          id: 'replacementAllowed-label',
        }), {}
      );
    });

    it('should render "replaced lost item processing fee" label', () => {
      expect(Label).toHaveBeenNthCalledWith(
        labelCallOrderByPlace.replacedLostItemProcessingFee,
        expect.objectContaining({
          htmlFor: 'replacedLostItemProcessingFee',
          id: 'replacedLostItemProcessingFee-label',
        }), {}
      );
    });

    it('should render radio group', () => {
      expect(RadioGroup).toHaveBeenCalled();
    });

    it('should render "chargeAmountItemPatron" text', () => {
      expect(
        getById(testIds.chargeAmountItemPatronColumn).getByText(`${labelIds.chargeAmountItemPatron}?`)
      ).toBeVisible();
    });

    it('should render "chargeAmountItemSystem" text', () => {
      expect(
        getById(testIds.chargeAmountItemSystemColumn).getByText(`${labelIds.chargeAmountItemSystem}?`)
      ).toBeVisible();
    });

    it('should render "returnedLostItemProcessing" text', () => {
      expect(
        getById(testIds.returnedLostItemProcessingFeeColumn).getByText(labelIds.returnedLostItemProcessingFee)
      ).toBeVisible();
    });

    it('should render "lostItemReturned" text', () => {
      expect(
        getById(testIds.lostItemReturnedColumn).getByText(labelIds.lostItemReturned)
      ).toBeVisible();
    });

    it('should render "replacementAllowed" text', () => {
      expect(
        getById(testIds.replacementAllowedColumn).getByText(labelIds.replacementAllowed)
      ).toBeVisible();
    });

    it('should render "replacedLostItemProcessingFee" text', () => {
      expect(
        getById(testIds.replacedLostItemProcessingFeeColumn).getByText(labelIds.replacedLostItemProcessingFee)
      ).toBeVisible();
    });
  });

  describe('"edit lost item fee" accordion', () => {
    [
      false,
      true,
    ].forEach((lostItemFeeSectionOpen) => {
      describe(`when "lostItemFeeSectionOpen" prop is ${lostItemFeeSectionOpen}`, () => {
        it('should render accordion', () => {
          render(
            <LostItemFeeSection
              {...defaultTestProps}
              lostItemFeeSectionOpen={lostItemFeeSectionOpen}
            />
          );

          expect(Accordion).toHaveBeenLastCalledWith(
            expect.objectContaining({
              id: 'editLostItemFeeSection',
              label: labelIds.lostItemSection,
              open: lostItemFeeSectionOpen,
            }), {}
          );
        });
      });
    });
  });

  describe('formatNumber function', () => {
    it('should return default formatted number when value is not passed', () => {
      expect(formatNumber()).toBe('0.00');
    });

    it('should return formatted number when string contains valid number', () => {
      expect(formatNumber('1.12345')).toBe('1.12');
    });

    it('should return NaN when string contains invalid number', () => {
      expect(formatNumber('test')).toBe('NaN');
    });
  });
});
