import normalize, {
  convertToBoolean,
  checkInvalid,
  transformModelBooleans,
} from './normalize';

const mockedDataWithIncorrectValues = {
  itemAgedLostOverdue: {
    duration: 2,
  },
  patronBilledAfterAgedLost: {
    duration: 0,
    intervalId: 'Weeks',
  },
  recalledItemAgedLostOverdue: {
    intervalId: 'Days',
  },
  patronBilledAfterRecalledItemAgedLost: {
    duration: '2',
    intervalId: 'Weeks',
  },
  lostItemChargeFeeFine: {
    duration: '',
    intervalId: 0,
  },
  feesFinesShallRefunded: {
    duration: '',
  },
  testData: 'test',
};

const mockedDataWithCorrectValues = {
  itemAgedLostOverdue: {
    duration: 2,
    intervalId: 'Weeks',
  },
  patronBilledAfterAgedLost: {
    duration: 2,
    intervalId: 'Weeks',
  },
  recalledItemAgedLostOverdue: {
    duration: 1,
    intervalId: 'Days',
  },
  patronBilledAfterRecalledItemAgedLost: {
    duration: 2,
    intervalId: 'Weeks',
  },
  lostItemChargeFeeFine: {
    duration: 3,
    intervalId: 'Weeks',
  },
  feesFinesShallRefunded: {
    duration: 1,
    intervalId: 'Days',
  },
  testData: 'test',
};

const mockedDataForTransform = {
  chargeAmountItemPatron: true,
  chargeAmountItemSystem: 'true',
  replacedLostItemProcessingFee: false,
  replacementAllowed: 'false',
  returnedLostItemProcessingFee: 123,
};

const resultForDataAfterTransformation = {
  chargeAmountItemPatron: true,
  chargeAmountItemSystem: true,
  replacedLostItemProcessingFee: false,
  replacementAllowed: false,
  returnedLostItemProcessingFee: false,
};

describe('LostItemFeePolicy utils', () => {
  describe('convertToBoolean function', () => {
    it('should convert true into true', () => {
      expect(convertToBoolean(true)).toBe(true);
    });

    it('should convert "true" into true', () => {
      expect(convertToBoolean('true')).toBe(true);
    });

    it('should convert false into false', () => {
      expect(convertToBoolean(false)).toBe(false);
    });

    it('should convert number into false', () => {
      expect(convertToBoolean(123)).toBe(false);
    });

    it('should convert string into false', () => {
      expect(convertToBoolean('123')).toBe(false);
    });
  });

  describe('checkInvalid function', () => {
    it('should remove invalid data', () => {
      expect(checkInvalid(mockedDataWithIncorrectValues)).toEqual({ testData: 'test' });
    });

    it('should not change incoming data', () => {
      expect(checkInvalid(mockedDataWithCorrectValues)).toEqual(mockedDataWithCorrectValues);
    });
  });

  describe('transformModelBooleans function', () => {
    it('should transform data correctly', () => {
      expect(transformModelBooleans(mockedDataForTransform)).toEqual(resultForDataAfterTransformation);
    });
  });

  describe('normalize function', () => {
    it('should process data correctly', () => {
      const result = normalize({ ...mockedDataWithIncorrectValues, ...mockedDataForTransform });

      expect(result).toEqual({ ...resultForDataAfterTransformation, testData: 'test' });
    });
  });
});
