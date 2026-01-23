import getInitialValues from './getInitialValues';
import {
  TLR_PATRON_NOTICES_DEFAULT_VALUES,
  TLR_FIELDS_FOR_RESET,
  NOT_SELECTED,
} from '../../../constants';

describe('getInitialValues', () => {
  it('should returns default values when input is empty', () => {
    expect(getInitialValues()).toEqual(TLR_PATRON_NOTICES_DEFAULT_VALUES);
    expect(getInitialValues([])).toEqual(TLR_PATRON_NOTICES_DEFAULT_VALUES);
  });

  it('should merges provided values with defaults', () => {
    const customValues = { someField: 'custom', ...TLR_PATRON_NOTICES_DEFAULT_VALUES };

    expect(getInitialValues(customValues)).toEqual({
      ...TLR_PATRON_NOTICES_DEFAULT_VALUES,
      ...customValues,
    });
  });

  it('should resets fields in TLR_FIELDS_FOR_RESET to NOT_SELECTED if null', () => {
    const values = {};
    TLR_FIELDS_FOR_RESET.forEach(field => {
      values[field] = null;
    });
    const result = getInitialValues(values);

    TLR_FIELDS_FOR_RESET.forEach(field => {
      expect(result[field]).toBe(NOT_SELECTED);
    });
  });
});
