import {
  NOT_SELECTED,
  TITLE_LEVEL_REQUESTS,
} from '../../../constants';
import normalizeData from './normalizeData';

describe('normalizeData', () => {
  it('should return normalized data', () => {
    const values = {
      [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: NOT_SELECTED,
      [TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE]: 'id',
      [TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE]: 'id_2',
    };
    const expectedResult = {
      [TITLE_LEVEL_REQUESTS.CONFIRMATION_TEMPLATE]: null,
      [TITLE_LEVEL_REQUESTS.CANCELLATION_TEMPLATE]: 'id',
      [TITLE_LEVEL_REQUESTS.EXPIRATION_TEMPLATE]: 'id_2',
    };

    expect(normalizeData(values)).toEqual(expectedResult);
  });
});
