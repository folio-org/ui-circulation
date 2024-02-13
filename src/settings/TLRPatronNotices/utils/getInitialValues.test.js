import getInitialValues from './getInitialValues';
import {
  TITLE_LEVEL_REQUESTS,
  TLR_PATRON_NOTICES_DEFAULT_VALUES,
} from '../../../constants';

describe('getInitialValues', () => {
  describe('When data is provided', () => {
    it('should return correct data object', () => {
      const values = [
        {
          value: {
            ...TLR_PATRON_NOTICES_DEFAULT_VALUES,
            [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: 'id',
          }
        }
      ];

      expect(getInitialValues(values)).toEqual(values[0].value);
    });
  });

  describe('When data is not provided', () => {
    it('should return correct data object', () => {
      const values = [];

      expect(getInitialValues(values)).toEqual(TLR_PATRON_NOTICES_DEFAULT_VALUES);
    });
  });
});
