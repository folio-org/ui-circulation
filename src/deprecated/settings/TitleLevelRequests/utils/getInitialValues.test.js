import getInitialValues from './getInitialValues';
import {
  NOT_SELECTED,
  TLR_FIELDS_FOR_RESET,
} from '../../../../constants';
import {
  TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
} from '../constants';

describe('deprecated getInitialValues', () => {
  it('should returns default values when settings is empty', () => {
    expect(getInitialValues()).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
    expect(getInitialValues([])).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
    expect(getInitialValues({})).toEqual(TITLE_LEVEL_REQUESTS_DEFAULT_VALUES);
  });

  it('should merges settings with defaults', () => {
    const settings = {
      someField: 'value',
    };

    expect(getInitialValues(settings)).toEqual({
      ...TITLE_LEVEL_REQUESTS_DEFAULT_VALUES,
      someField: 'value',
    });
  });

  it('should replaces null fields in TLR_FIELDS_FOR_RESET with NOT_SELECTED', () => {
    const settings = {};
    TLR_FIELDS_FOR_RESET.forEach(field => {
      settings[field] = null;
    });
    const result = getInitialValues(settings);

    TLR_FIELDS_FOR_RESET.forEach(field => {
      expect(result[field]).toBe(NOT_SELECTED);
    });
  });

  it('should does not replace non-null fields in TLR_FIELDS_FOR_RESET', () => {
    const settings = {};
    TLR_FIELDS_FOR_RESET.forEach(field => {
      settings[field] = 'customValue';
    });
    const result = getInitialValues(settings);

    TLR_FIELDS_FOR_RESET.forEach(field => {
      expect(result[field]).toBe('customValue');
    });
  });
});
