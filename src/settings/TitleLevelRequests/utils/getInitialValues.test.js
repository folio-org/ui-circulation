import getInitialValues from './getInitialValues';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
  TITLE_LEVEL_REQUESTS,
} from '../../../constants';

describe('getInitialValues', () => {
  it('should returns default values when input is empty', () => {
    expect(getInitialValues()).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
    expect(getInitialValues([])).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
    expect(getInitialValues({})).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
  });

  it('should merges provided values with defaults', () => {
    const customValues = {
      [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: true,
      anotherField: 'test',
    };
    const expected = {
      ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
      ...customValues,
    };

    expect(getInitialValues(customValues)).toEqual(expected);
  });

  it('should handles array input with value property', () => {
    const testData = [
      {
        value: {
          [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: true,
        },
      },
    ];
    const expected = {
      ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
      [TITLE_LEVEL_REQUESTS.TLR_ENABLED]: true,
    };

    expect(getInitialValues(testData[0].value)).toEqual(expected);
  });
});
