import normalize, { isZeroOrBlank } from './normalize';

const dataWithValuesForRemove = {
  overdueFine: {
    quantity: '0',
  },
  overdueRecallFine: {
    quantity: {},
  },
};

const dataWithoutValuesForRemove = {
  overdueFine: {
    quantity: 'test',
  },
  overdueRecallFine: {
    quantity: 'test',
  },
};

describe('FinePolicy utils', () => {
  describe('isZeroOrBlank function', () => {
    it('should return false if period is undefined', () => {
      expect(isZeroOrBlank(undefined)).toBe(false);
    });

    it('should return true if period have "quantity" equal "0"', () => {
      expect(isZeroOrBlank({ quantity: '0' })).toBe(true);
    });

    it('should return true if period have empty "quantity"', () => {
      expect(isZeroOrBlank({ quantity: '' })).toBe(true);
    });
  });

  describe('normalize function', () => {
    it('should remove incorrect data', () => {
      const result = normalize(dataWithValuesForRemove);

      expect(result).toEqual({});
    });

    it('should not change incoming data', () => {
      const result = normalize(dataWithoutValuesForRemove);

      expect(result).toEqual(dataWithoutValuesForRemove);
    });
  });
});
